'use client';

import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';
import { AuthenticationContext } from '../contex/AuthContexApi';
import { Alert, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [Signin, setIsSignin] = useState(isSignin);

  const [open, setOpen] = useState(false);
  //open Modal window
  const handleOpen = () => setOpen(true);
  //close modal window
  const handleClose = () => setOpen(false);

  const { loading, data, error } = useContext(AuthenticationContext);
  // console.log("🚀 ~ file: AuthModal.tsx:31 ~ AuthModal ~ data:", data)

  const renderContent = (signinContent: string, signupContent: string) => {
    return Signin ? signinContent : signupContent;
  };
  
  return (
    <div>
      <button
        className={`${
          isSignin ? 'bg-blue-400 text-white' : ''
        } border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {isSignin ? 'Sign in' : 'Sign up'}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[400px] flex justify-center">
              {' '}
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2">
              {error ? (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              ) : null}
              <div className="uppercase font-bold text-center pb-2  mb-2">
                <p>{data?.first_name}</p>
                <p className="text-sm">
                  {renderContent('Sign In', 'Create Account')}
                </p>
                
              </div>
              <div className=" m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    'Log Into Your Account',
                    'Create Your OpenTable Account'
                  )}
                </h2>

                <AuthModalInput isSignin={Signin} close={handleClose} />
                <p className="text-sm mb-5">
                  {Signin ? (
                    <div>
                      <span>Create a Account: </span>
                      <button
                        onClick={() => setIsSignin(false)}
                        className="text-sky-500"
                      >
                        SignUP
                      </button>{' '}
                    </div>
                  ) : (
                    <div>
                      <span>Already have an Account? </span>
                      <button
                        onClick={() => setIsSignin(true)}
                        className="text-sky-500"
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                </p>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
