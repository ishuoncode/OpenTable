import { AuthenticationContext } from '@/app/contex/AuthContexApi';
import axios from 'axios';
import { removeCookies } from 'cookies-next';
import { useContext } from 'react';


const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );
  
///////////// Send POST request to signIN and get data, error, loading state  //////////////
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    close: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        '/api/auth/signin',
        { Email: email, password }
      );
      // console.log('🚀 ~ file: useAuth.ts:7 ~ response ~ response:', response);
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      close();
    } catch (error: any) {
      // console.log("🚀 ~ file: useAuth.ts:34 ~ useAuth ~ error:", error.response.data.errorMessage)

      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  /////////// Send POST request to signUP and get data, error, loading state  /////////////
  const signup = async (
    {
      email,
      password,
      firstname,
      lastname,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
      city: string;
      phone: string;
    },
    close: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const response = await axios.post(
        '/api/auth/signup',
        {
          Email: email,
          password:password,
          firstname: firstname,
          lastname: lastname,
          city:city,
          phone:phone,
        }
      );
      // console.log('🚀 ~ file: useAuth.ts:7 ~ response ~ response:', response);
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      close();
    } catch (error: any) {
      // console.log("🚀 ~ file: useAuth.ts:34 ~ useAuth ~ error:", error.response.data.errorMessage)

      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

   /////////Remove Cookie to signout ////////////////  
  const signout = ()=>{
    removeCookies("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  }

  return { signin, signup,signout };
};

export default useAuth;
