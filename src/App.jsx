/* eslint-disable react-refresh/only-export-components */
import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RideRequestDetail from './pages/RideRequestDetail';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import CustomerConfirmation from './pages/CustomerConfirmation';
import CustomerTripReceipt from './pages/CustomerTripReceipt';
import { createClient } from '@supabase/supabase-js';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import CustomerTrips from './pages/CustomerTrips';

export const AppContext = createContext();
export const env = import.meta.env.VITE_NODE_ENV;
export const apiKey = import.meta.env.VITE_ANON_KEY;
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabase_client = createClient(supabaseUrl, apiKey);

function App() {
  const [snackbarFlag, setSnackbarFlag] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [newUser, setNewUser] = useState(false);

  const authUser = async () => {
    if (env === 'dev') {
      console.log('dev', 'auth user');
    }
    // auth user
    const { data } = await supabase_client.auth.getSession();
    if (data.session !== null) {
      setSession(data.session);
    }

    const {
      data: { subscription },
    } = await supabase_client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  };

  useEffect(() => {
    authUser();
  }, []);

  const getUserProfile = async (session) => {
    var userProfileTemp = {
      ...userProfileTemp,
      email: session.user.email,
    };
    // get user info
    const riderInfo = await supabase_client.from('rider_info').select();
    if (env === 'dev') {
      console.log('dev', riderInfo.data);
    }
    if (riderInfo.data.length !== 0) {
      userProfileTemp = { ...userProfileTemp, ...riderInfo.data[0] };
      setNewUser(false);
    } else {
      setNewUser(true);
    }
    setUserProfile({ ...userProfileTemp });

    // get user role
    var riderRole = await supabase_client
      .from('user_role')
      .select('*, role(*)');
    if (env === 'dev') {
      console.log('dev', riderRole.data);
    }
    if (riderRole.error) {
      console.log('dev', riderRole.error);
    }

    if (riderRole.data.length === 0) {
      // create a user role data
      if (env === 'dev') {
        console.log('env', 'create a new user role');
      }

      riderRole = await supabase_client
        .from('user_role')
        .insert([{ user_id: session.user.id }]);

      if (env === 'dev') {
        console.log(riderRole.data);
      }

      if (riderRole.error) {
        console.log(riderRole.error);
      }
    }
  };

  useEffect(() => {
    if (session || newUser) {
      getUserProfile(session);
    }
  }, [session, newUser]);

  return (
    <>
      <AppContext.Provider
        value={{
          session,
          userProfile,
          newUser,
          setNewUser,
          snackbarFlag,
          setSnackbarFlag,
          snackbarType,
          setSnackbarType,
          snackbarMessage,
          setSnackbarMessage,
          setLoading,
          getUserProfile,
        }}
      >
        <BrowserRouter>
          <Routes>
            {/* login */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/trips" element={<CustomerTrips />} />
            {/* user profile page */}
            <Route path="/profile" element={<Profile />} />
            {/* trip reqeust form */}
            <Route path="/home" element={<Home />} />
            {/* trip request form confirmation */}
            <Route path="/confirmtrip" element={<CustomerConfirmation />} />
            <Route
              path="/tripstatus/:confirmationCode"
              element={<CustomerTripReceipt />}
            />
            {/* dashboard for driver */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* trip detail for driver */}
            <Route path="/detail" element={<RideRequestDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>

        {/* add snackbar with context flag for user notification */}
        <Snackbar
          open={snackbarFlag}
          autoHideDuration={2000}
          onClose={() => setSnackbarFlag(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert variant="filled" severity={snackbarType}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* loading screen */}
        <Backdrop open={loading} sx={{ zIndex: 100 }}>
          <CircularProgress color="secondary" />
        </Backdrop>
      </AppContext.Provider>
    </>
  );
}

export default App;
