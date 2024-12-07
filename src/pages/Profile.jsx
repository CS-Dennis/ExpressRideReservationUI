import { Box, Button, Grid2 as Grid, TextField } from '@mui/material';
import Title from '../components/Title';
import { APP_TITLE, RESPONSE_MESSAGES } from '../constants';
import { useContext, useEffect, useState } from 'react';
import { AppContext, env, supabase_client } from '../App';
import { MuiTelInput } from 'mui-tel-input';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(null);
  const [firstNameFlag, setFirstNameFlag] = useState(false);
  const [lastNameFlag, setLastNameFlag] = useState(false);
  const [phoneFlag, setPhoneFlag] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  const goBack = () => {
    navigate('/home');
  };

  const updateUserProfile = async () => {
    context.setLoading(true);

    if (validateForm()) {
      if (context.newUser) {
        const { error } = await supabase_client
          .from('rider_info')
          .insert([
            {
              user_id: context.session.user.id,
              first_name: firstName,
              last_name: lastName,
              phone: phone,
            },
          ])
          .select();
        if (error) {
          console.log(error);
        } else {
          setEditProfile(false);
          context.setNewUser(false);
          // show successful snackbar
          context.setSnackbarFlag(true);
          context.setSnackbarType('success');
          context.setSnackbarMessage(RESPONSE_MESSAGES.updateProfileSuccess);
          goBack();
        }
      } else {
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
          context.getUserProfile(context.session);
          // show successful snackbar
          context.setSnackbarFlag(true);
          context.setSnackbarType('success');
          context.setSnackbarMessage(RESPONSE_MESSAGES.updateProfileSuccess);
        }
        if (error) {
          console.log(error);
          // show error snackbar
        }
        if (env === 'dev') {
          console.log('dev', data);
        }
      }
    }
    context.setLoading(false);
  };

  const validateForm = () => {
    setFirstNameFlag(false);
    setLastNameFlag(false);
    setPhoneFlag(false);
    if (!firstName || firstName.trim() === '') {
      setFirstNameFlag(true);
      return false;
    }
    if (!lastName || lastName.trim() === '') {
      setLastNameFlag(true);
      return false;
    }
    if (!phone || phone.trim() === '') {
      setPhoneFlag(true);
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (context.userProfile) {
      if (env === 'dev') {
        console.log('dev', context.userProfile);
        console.log('context.userProfile?.phone', context.userProfile?.phone);
      }

      setFirstName(context.userProfile?.first_name || '');
      setLastName(context.userProfile?.last_name || '');
      setEmail(context.userProfile.email);
      setPhone(context.userProfile?.phone || '');
    }

    if (context.newUser) {
      setEditProfile(true);
    } else {
      setEditProfile(false);
    }
  }, [context.userProfile, context.newUser]);

  return (
    <>
      {/* <Box className="mx-2"> */}
      <Grid container>
        <Grid size={{ md: 12, lg: 1 }} />
        <Grid size={{ md: 12, lg: 10 }} className="w-full">
          <Title title={APP_TITLE} />

          <Box className="mt-10 mx-10">
            <Box className="flex justify-center font-bold text-xl">
              {context.newUser ? `Create Your New Profile` : `Your Profile`}
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
                <>
                  <Button
                    variant="contained"
                    sx={{ marginRight: '1em' }}
                    onClick={() => goBack()}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setEditProfile(true)}
                  >
                    Edit
                  </Button>
                </>
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
