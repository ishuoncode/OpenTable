'use client';


import { User } from '@prisma/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}
interface AuthState extends State {
  setAuthState: Dispatch<SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
});

export default function AuthContextApi({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    error: null,
    data: null,
  });
  const fetchUser =async ()=>{
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try{
      const jwt = getCookie("jwt");
      if(!jwt){
        return setAuthState({
          data: null,
          error: null,
          loading: false,
        });
      }
      const response = await axios.get(
        'http://localhost:3000/api/auth/me',{
          headers: {Authorization: "Bearer " + jwt},
        })
        setAuthState({
          data: response.data,
          error: null,
          loading: false,
        });
    }catch(error:any){
       setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  }
  
  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
