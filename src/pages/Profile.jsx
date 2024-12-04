import { Box, Button, Grid2 as Grid, TextField } from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE, RESPONSE_MESSAGES } from '../constants';
import { useContext, useEffect, useState } from 'react';
import { AppContext, env, supabase_client } from '../App';
import { MuiTelInput } from 'mui-tel-input';

export default function Profile() {
  const context = useContext(AppContext);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstNameFlag, setFirstNameFlag] = useState(false);
  const [lastNameFlag, setLastNameFlag] = useState(false);
  const [phoneFlag, setPhoneFlag] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  const updateUserProfile = async () => {
    context.setLoading(true);

    if (validateForm()) {
      const updatedProfile = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      };
      const { data, error } = await supabase_client
        .from('rider_info')
        .update(updatedProfile)
        .eq('user_id', context.session.user.id)
        .select();
      if (data) {
        setEditProfile(false);
        // show successful snackbar
        context.setSnackbarFlag(true);
        context.setSnackbarType('success');
        context.setSnackbarMessage(RESPONSE_MESSAGES.updateProfileSuccess);
      }
      if (env === 'dev') {
        console.log('dev', data);
      }

      if (error) {
        console.log(error);
        // show error snackbar
      }
    }

    context.setLoading(false);
  };

  const validateForm = () => {
    setFirstNameFlag(false);
    setLastNameFlag(false);
    setPhoneFlag(false);
    if (firstName.trim() === '') {
      setFirstNameFlag(true);
      return false;
    }
    if (lastName.trim() === '') {
      setLastNameFlag(true);
      return false;
    }
    if (phone.trim() === '') {
      setPhoneFlag(true);
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (context.userProfile) {
      if (env === 'dev') {
        console.log(context.userProfile);
      }

      setFirstName(context.userProfile.first_name);
      setLastName(context.userProfile.last_name);
      setEmail(context.userProfile.email);
      setPhone(context.userProfile.phone);
    }
  }, [context.userProfile]);

  return (
    <>
      {/* <Box className="mx-2"> */}
      <Grid container>
        <Grid size={{ md: 12, lg: 1 }} />
        <Grid size={{ md: 12, lg: 10 }} className="w-full">
          <Title title={APP_TITLE} />

          <Box className="mt-10 mx-10">
            <Box className="flex justify-center font-bold text-xl">
              Your Profile
            </Box>
            <Box>
              <TextField
                className="w-full"
                label="First Name"
                value={firstName || ''}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!editProfile}
                error={firstNameFlag}
              />
            </Box>

            <Box className="mt-4">
              <TextField
                className="w-full"
                label="Last Name"
                value={lastName || ''}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                disabled={!editProfile}
                error={lastNameFlag}
              />
            </Box>

            <Box className="mt-4">
              <MuiTelInput
                className="w-full"
                defaultCountry="US"
                disableDropdown
                forceCallingCode
                value={phone}
                onChange={(value) => setPhone(value)}
                placeholder="Phone number"
                color={phoneFlag ? 'error' : 'primary'}
                focused={phoneFlag ? true : false}
                inputProps={{ style: { fontSize: '1.4em' } }}
                InputLabelProps={{ style: { fontSize: '1.4em' } }}
                disabled={!editProfile}
                error={phoneFlag}
              />
            </Box>

            <Box className="mt-4">
              <TextField
                className="w-full"
                label="Email"
                value={email || ''}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled
              />
            </Box>

            <Box className="mt-4 flex justify-end">
              {!editProfile && (
                <Button
                  variant="contained"
                  onClick={() => setEditProfile(true)}
                >
                  Edit
                </Button>
              )}

              {editProfile && (
                <>
                  <Button
                    variant="contained"
                    sx={{ marginRight: '1em' }}
                    onClick={() => setEditProfile(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={updateUserProfile}>
                    Update
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid size={{ md: 12, lg: 1 }} />
      </Grid>
    </>
  );
}
