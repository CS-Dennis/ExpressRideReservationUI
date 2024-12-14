import { Box, Button, Chip, Modal, TextField } from '@mui/material';
import {
  DATETIME_FORMATS,
  TRIP_REQUEST_STATUS,
  TRIP_REQUEST_STATUS_CHIP_LABELS,
} from '../constants';
import { useContext, useState } from 'react';
import TripDetail from './TripDetail';
import { AppContext, env, supabase_client } from '../App';
import moment from 'moment';

// used on driver's Dashboard screen
export default function CustomerRequests({
  rideRequests,
  selectedYear,
  requestsType,
  getRequests,
}) {
  const context = useContext(AppContext);

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [driversNotes, setDriversNotes] = useState(null);

  const [showCompleteTripModal, setShowCompleteTripModal] = useState(false);

  const showRequestDetail = (request) => {
    setShowRequestDetailModal(true);
    setSelectedRequest(request);
  };

  const closeAcceptModal = () => {
    setShowAcceptModal(false);
    setSuggestedPrice(null);
    setDriversNotes(null);
  };

  const confirmRequest = async () => {
    if (suggestedPrice === null) {
      context.setSnackbarFlag(true);
      context.setSnackbarType('error');
      context.setSnackbarMessage(
        "Please enter a suggested price for the customer's request.",
      );
      return;
    }

    // update status id
    const updateRideRequest = await supabase_client
      .from('ride_request')
      .update({
        status_id: 2,
      })
      .eq('id', selectedRequest.id)
      .select();

    // update price and driver's note
    const insertTripCharge = await supabase_client
      .from('trip_charge')
      .insert({
        user_id: selectedRequest.user_id,
        ride_request_id: selectedRequest.id,
        price: suggestedPrice,
        drivers_note: driversNotes,
      })
      .select();

    const [result1, result2] = await Promise.all([
      updateRideRequest,
      insertTripCharge,
    ]);

    if (result1.data && result2.data) {
      if (env === 'dev') {
        console.log('dev', 'updated rider request', result1.data);
        console.log('dev', 'inserted trip charge', result2.data);
      }
      getRequests(requestsType, selectedYear);
      setShowAcceptModal(false);
      context.setSnackbarFlag(true);
      context.setSnackbarType('success');
      context.setSnackbarMessage(
        'Suggested price has been submitted successfully.',
      );
    }
    if (result1.error || result2.error) {
      console.log(result1.error);
      console.log(result2.error);
    }
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setDriversNotes(null);
  };

  const rejectRequest = async () => {
    const rideRequest = await supabase_client
      .from('ride_request')
      .update({ status_id: 5 })
      .eq('id', selectedRequest.id)
      .select();

    const tripChargeRequest = await supabase_client
      .from('trip_charge')
      .insert({
        user_id: selectedRequest.user_id,
        ride_request_id: selectedRequest.id,
        drivers_note: driversNotes,
      })
      .select();

    const [rideRequestRes, tripChargeRequestRes] = await Promise.all([
      rideRequest,
      tripChargeRequest,
    ]);

    if (rideRequestRes.data && tripChargeRequestRes.data) {
      if (env === 'dev') {
        console.log(
          'dev',
          'rejected request',
          rideRequestRes.data,
          tripChargeRequestRes.data,
        );
      }

      getRequests(requestsType, selectedYear);

      setShowRejectModal(false);
      context.setSnackbarFlag(true);
      context.setSnackbarType('success');
      context.setSnackbarMessage('Ride request rejected successfully.');
    }

    if (rideRequestRes.error || tripChargeRequestRes.error) {
      console.log(rideRequestRes.error);
      console.log(tripChargeRequestRes.error);
    }
  };

  const completeRequest = async () => {
    const { data, error } = await supabase_client
      .from('ride_request')
      .update({ status_id: TRIP_REQUEST_STATUS.tripCompleted })
      .eq('id', selectedRequest.id)
      .select();

    if (data) {
      if (env === 'dev') {
        console.log('dev', data);
      }

      getRequests(requestsType, selectedYear);

      setShowCompleteTripModal(false);
      context.setSnackbarFlag(true);
      context.setSnackbarType('success');
      context.setSnackbarMessage('Trip completed successfully.');
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* individual request cards */}
      {rideRequests.map((request, i) => (
        <Box
          key={i}
          className="border border-gray-100 py-4 px-2 rounded-md mb-4 bg-slate-100"
        >
          <Box className="flex justify-center">
            <Chip
              label={
                request.status_id === 1
                  ? `1. ${TRIP_REQUEST_STATUS_CHIP_LABELS[0]}`
                  : request.status_id === 2
                  ? `2. ${TRIP_REQUEST_STATUS_CHIP_LABELS[1]}`
                  : request.status_id === 3
                  ? `3. ${TRIP_REQUEST_STATUS_CHIP_LABELS[2]}`
                  : request.status_id === 4
                  ? `4. ${TRIP_REQUEST_STATUS_CHIP_LABELS[3]}`
                  : request.status_id === 5
                  ? `${TRIP_REQUEST_STATUS_CHIP_LABELS[4]}`
                  : request.status_id === 6 &&
                    `${TRIP_REQUEST_STATUS_CHIP_LABELS[5]}`
              }
              sx={() =>
                request.status_id === TRIP_REQUEST_STATUS.tripCompleted
                  ? {
                      backgroundColor: '#00beae',
                      color: '#fff',
                    }
                  : request.status_id === TRIP_REQUEST_STATUS.requestRejected
                  ? { backgroundColor: '#e7334a', color: '#fff' }
                  : request.status_id === TRIP_REQUEST_STATUS.priceRejected
                  ? { backgroundColor: '#e77733', color: '#fff' }
                  : {
                      backgroundColor: '#273238',
                      color: '#fff',
                    }
              }
            />
          </Box>

          <Box
            className="mt-1 cursor-pointer p-2 hover:bg-slate-200 hover:rounded-md"
            onClick={() => showRequestDetail(request)}
          >
            <Box>
              <Box className="font-bold">Pick-up datetime:</Box>
              {moment(request.pickup_datetime).format(
                DATETIME_FORMATS.american,
              )}
            </Box>
            <Box className="mt-2">
              <Box className="font-bold">Pick-up location:</Box>
              {`${request.pickup_address}, ${request.pickup_city}, ${request.pickup_state} ${request.pickup_zip} `}
            </Box>
            <Box className="mt-2">
              <Box className="font-bold">Drop-off location:</Box>
              {`${request.dropoff_address}, ${request.dropoff_city}, ${request.dropoff_state} ${request.dropoff_zip} `}
            </Box>
            {request.status_id === 2 && <Box>Price: {`$${request.price}`}</Box>}
          </Box>

          {/* accept the customer's request */}
          {request.status_id === 1 && (
            <Box className="flex justify-evenly mt-4">
              <Button
                sx={{ backgroundColor: '#0cb04a' }}
                variant="contained"
                onClick={() => {
                  setSelectedRequest(request);
                  setShowAcceptModal(true);
                }}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setSelectedRequest(request);
                  setShowRejectModal(true);
                }}
              >
                Reject
              </Button>
            </Box>
          )}

          {/* complete the trip */}
          {request.status_id === 3 && (
            <Box className="flex justify-evenly mt-4">
              <Button
                sx={{ backgroundColor: '#0cb04a' }}
                variant="contained"
                onClick={() => {
                  setSelectedRequest(request);
                  setShowCompleteTripModal(true);
                }}
              >
                Complete Trip
              </Button>
            </Box>
          )}
        </Box>
      ))}

      {/* accept customer's request modal */}
      <Modal open={showAcceptModal}>
        <Box className="absolute m-auto top-0 bottom-0 left-0 right-0 w-80 max-w-full h-fit bg-white p-4 rounded-md border-navyBlue border-t-8">
          <Box className="flex justify-center font-bold text-lg">
            Accept Request
          </Box>
          <Box>
            <Box className="mt-4 flex">
              <Box className="flex self-center mr-2">$</Box>
              <TextField
                label="Suggested Price"
                type="number"
                onChange={(e) => setSuggestedPrice(e.target.value)}
                fullWidth
              />
            </Box>
            <Box className="mt-4">
              <TextField
                label="Note to the customer"
                onChange={(e) => setDriversNotes(e.target.value)}
                fullWidth
                multiline
                rows={4}
              />
            </Box>
          </Box>
          <Box className="mt-4 flex justify-evenly">
            <Button
              sx={{ backgroundColor: '#19ae47' }}
              variant="contained"
              onClick={confirmRequest}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={closeAcceptModal}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* reject customer's request modal */}
      <Modal open={showRejectModal}>
        <Box className="absolute m-auto top-0 bottom-0 left-0 right-0 w-80 max-w-full h-fit bg-white p-4 rounded-md border-navyBlue border-t-8">
          <Box className="flex justify-center font-bold text-lg">
            Confirm to Reject Request
          </Box>
          <Box className="mt-4">
            <TextField
              label="Notes to the customer"
              onChange={(e) => setDriversNotes(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Box>

          <Box className="mt-4 flex justify-evenly">
            <Button
              sx={{ backgroundColor: '#e7334a' }}
              variant="contained"
              onClick={rejectRequest}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={closeRejectModal}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* show request detail modal */}
      <Modal open={showRequestDetailModal}>
        <Box
          className="absolute m-auto top-0 bottom-0 left-0 right-0 
        h-fit max-h-full bg-white p-4 rounded-md border-navyBlue border-t-8 overflow-auto"
          sx={{ width: '600px', maxWidth: '100%' }}
        >
          <Box>
            <TripDetail trip={selectedRequest} />
          </Box>
          <Box className="flex justify-center mt-4">
            <Button
              color="primary"
              variant="contained"
              onClick={() => setShowRequestDetailModal(false)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* complete request modal */}
      <Modal open={showCompleteTripModal}>
        <Box className="absolute m-auto top-0 bottom-0 left-0 right-0 w-96 max-w-full h-fit bg-white p-4 rounded-md border-navyBlue border-t-8">
          <Box className="flex justify-center mt-4 font-bold text-lg">
            Confirm to complete the trip
          </Box>
          <Box className="flex justify-around mt-4">
            <Button
              variant="contained"
              sx={{ backgroundColor: '#19ae47' }}
              onClick={completeRequest}
            >
              Confirm
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setShowCompleteTripModal(false)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
