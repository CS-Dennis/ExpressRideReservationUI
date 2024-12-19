import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from '../App';

export default function PriceCalculator({ addPriceButton = false }) {
  const context = useContext(AppContext);
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);

  const [dollorPerMile, setDollorPerMile] = useState('0');
  const [totalMiles, setTotalMiles] = useState('0');
  const [totalPrice, setTotalPrice] = useState('0');

  const [dollorPerMileSelected, setDollorPerMileSelected] = useState(true);
  const [totalMilesSelected, setTotalMilesSelected] = useState(false);

  const switchTextField = () => {
    if (dollorPerMileSelected) {
      setDollorPerMileSelected(false);
      setTotalMilesSelected(true);
    } else {
      setDollorPerMileSelected(true);
      setTotalMilesSelected(false);
    }
  };

  const focuseOnDollorPerMileField = () => {
    setDollorPerMileSelected(true);
    setTotalMilesSelected(false);
  };

  const focuseOnTotalMilesField = () => {
    setDollorPerMileSelected(false);
    setTotalMilesSelected(true);
  };

  const addDigit = (digitString) => {
    console.log(digitString, dollorPerMile + digitString);
    if (dollorPerMileSelected) {
      if (digitString !== '.') {
        if (digitString !== '0') {
          setDollorPerMile(parseFloat(dollorPerMile + digitString).toString());
        } else {
          setDollorPerMile(dollorPerMile + digitString);
        }
      } else {
        if (!dollorPerMile.includes('.')) {
          setDollorPerMile(dollorPerMile + '.');
        }
      }
    } else {
      if (digitString !== '.') {
        if (digitString !== '0') {
          setTotalMiles(parseFloat(totalMiles + digitString).toString());
        } else {
          setTotalMiles(totalMiles + digitString);
        }
      } else {
        if (!totalMiles.includes('.')) {
          setTotalMiles(totalMiles + '.');
        }
      }
    }
  };

  useEffect(() => {
    setTotalPrice(
      (parseFloat(dollorPerMile) * parseFloat(totalMiles))
        .toFixed(2)
        .toString(),
    );
  }, [dollorPerMile, totalMiles]);

  return (
    <>
      <IconButton
        className="w-14 h-14"
        onClick={() => setShowPriceCalculator(true)}
      >
        <img src={`/assets/icons/calculator.png`} />
      </IconButton>

      <Modal open={showPriceCalculator}>
        <Box
          className="absolute m-auto left-0 right-0 top-0 bottom-0 
        w-80 max-w-full h-fit bg-white rounded-lg p-4"
        >
          <Box className="flex justify-end">
            <IconButton
              onClick={() => {
                setShowPriceCalculator(false);
                context.setSuggestedPrice('');
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className="flex justify-center font-bold text-lg mb-2">
            Price Calculator
          </Box>
          <Box className="flex justify-center mb-2">
            <TextField
              label="$ per Mile"
              value={dollorPerMile}
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setDollorPerMile('0')}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              focused={dollorPerMileSelected}
              onClick={focuseOnDollorPerMileField}
            />
          </Box>
          <Box className="flex justify-center mb-2">
            <TextField
              label="Trip Distance"
              value={totalMiles}
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      Miles
                      <IconButton onClick={() => setTotalMiles('0')}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              focused={totalMilesSelected}
              onClick={focuseOnTotalMilesField}
            />
          </Box>
          <Box className="flex justify-center mb-2">
            <TextField
              label="Estimated Price"
              variant="outlined"
              value={totalPrice}
              fullWidth
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000', // Customize font color for disabled input
                  fontWeight: 'bold',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#000', // Customize label color when disabled
                },
              }}
              disabled
            />
          </Box>
          <Box className="flex flex-col items-center">
            <Box className="flex flex-row">
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('1')}
                >
                  1
                </IconButton>
              </Box>
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('2')}
                >
                  2
                </IconButton>
              </Box>
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('3')}
                >
                  3
                </IconButton>
              </Box>
            </Box>
            <Box className="flex flex-row">
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('4')}
                >
                  4
                </IconButton>
              </Box>
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('5')}
                >
                  5
                </IconButton>
              </Box>
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('6')}
                >
                  6
                </IconButton>
              </Box>
            </Box>
            <Box className="flex flex-row">
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('7')}
                >
                  7
                </IconButton>
              </Box>
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('8')}
                >
                  8
                </IconButton>
              </Box>
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('9')}
                >
                  9
                </IconButton>
              </Box>
            </Box>
            <Box className="flex flex-row">
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('0')}
                >
                  0
                </IconButton>
              </Box>
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={() => addDigit('.')}
                >
                  .
                </IconButton>
              </Box>
              <Box className="m-2">
                <IconButton
                  className="w-14 h-14"
                  sx={{ border: '1px solid #c7cacc' }}
                  onClick={switchTextField}
                >
                  Next
                </IconButton>
              </Box>
            </Box>
            {addPriceButton && (
              <Box className="mt-2">
                <Button
                  variant="contained"
                  onClick={() => {
                    context.setSuggestedPrice(totalPrice.toString());
                    setShowPriceCalculator(false);
                  }}
                >
                  Add Price
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
