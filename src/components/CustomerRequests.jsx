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
  getAllPendingRequests,
  getAllCompletedRequests,
}) {
  const context = useContext(AppContext);

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false);
  const [seletedRequest, setSeletedRequest] = useState(null);
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [driversNotes, setDriversNotes] = useState(null);

  const showRequestDetail = (request) => {
    setShowRequestDetailModal(true);
    setSeletedRequest(request);
    console.log('asdf');
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

    const { data, error } = await supabase_client
      .from('ride_request')
      .update({
        price: suggestedPrice,
        driver_notes: driversNotes,
        status_id: 2,
      })
      .eq('id', seletedRequest.id)
      .select();

    if (data) {
      if (env === 'dev') {
        console.log(data);
      }
      getAllPendingRequests();
      setShowAcceptModal(false);
      context.setSnackbarFlag(true);
      context.setSnackbarType('success');
      context.setSnackbarMessage(
        'Suggested price has been submitted successfully.',
      );
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      {rideRequests.map((request, i) => (
        <Box
          key={i}
          className="border border-gray-100 py-4 px-2 rounded-md mb-4 bg-slate-100"
        >
          <Box className="flex justify-center">
            <Chip
              label={
                request.status_id === 1
                  ? TRIP_REQUEST_STATUS_CHIP_LABELS[0]
                  : request.status_id === 2
                  ? TRIP_REQUEST_STATUS_CHIP_LABELS[1]
                  : request.status_id === 3
                  ? TRIP_REQUEST_STATUS_CHIP_LABELS[2]
                  : request.status_id === 4 &&
                    TRIP_REQUEST_STATUS_CHIP_LABELS[3]
              }
              sx={() =>
                request.status_id === TRIP_REQUEST_STATUS.tripCompleted
                  ? {
                      backgroundColor: '#19ae47',
                      color: '#fff',
                    }
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

          {request.status_id === 1 && (
            <Box className="flex justify-evenly mt-4">
              <Button
                sx={{ backgroundColor: '#0cb04a' }}
                variant="contained"
                onClick={() => {
                  setSeletedRequest(request);
                  setShowAcceptModal(true);
                }}
              >
                Accept
              </Button>
              <Button variant="contained" color="error">
                Reject
              </Button>
            </Box>
          )}
        </Box>
      ))}

      {/* accept modal */}
      <Modal open={showAcceptModal}>
        <Box className="absolute m-auto top-0 bottom-0 left-0 right-0 w-80 h-fit bg-white p-4 rounded-md border-navyBlue border-t-8">
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
                label="Notes to the customer"
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

      {/* request detail modal */}
      <Modal open={showRequestDetailModal}>
        <Box className="absolute m-auto top-0 bottom-0 left-0 right-0 w-96 h-fit bg-white p-4 rounded-md border-navyBlue border-t-8">
          <Box>
            <TripDetail trip={seletedRequest} />
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
    </>
  );
}
