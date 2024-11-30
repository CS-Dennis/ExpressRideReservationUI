/* eslint-disable react-refresh/only-export-components */
import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RideRequestDetail from './pages/RideRequestDetail';
import { Alert, Snackbar } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import CustomerConfirmation from './pages/CustomerConfirmation';
import CustomerTripReceipt from './pages/CustomerTripReceipt';
import { createClient } from '@supabase/supabase-js';
import LandingPage from './pages/LandingPage';

export const AppContext = createContext();
export const env = import.meta.env.VITE_NODE_ENV;
export const apiKey = import.meta.env.VITE_ANON_KEY;
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabase_client = createClient(supabaseUrl, apiKey);

function App() {
  const [snackbarFlag, setSnackbarFlag] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const authUser = async () => {
    // auth user
    const { data } = await supabase_client.auth.getSession();
    var userProfileTemp = null;
    if (data.session !== null) {
      setSession(data.session);
      userProfileTemp = { ...userProfileTemp, email: data.session.user.email };
    }

    const riderInfo = await supabase_client.from('rider_info').select();
    if (env === 'dev') {
      console.log('dev', riderInfo.data);
    }
    if (riderInfo.data !== null) {
      userProfileTemp = { ...userProfileTemp, ...riderInfo.data[0] };
    }
    setUserProfile({ ...userProfileTemp });

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

  return (
    <>
      <AppContext.Provider
        value={{
          session,
          userProfile,
          snackbarFlag,
          setSnackbarFlag,
          snackbarType,
          setSnackbarType,
          snackbarMessage,
          setSnackbarMessage,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detail" element={<RideRequestDetail />} />
            <Route path="/confirmtrip" element={<CustomerConfirmation />} />
            <Route
              path="/tripstatus/:confirmationCode"
              element={<CustomerTripReceipt />}
            />
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
      </AppContext.Provider>
    </>
  );
}

export default App;
