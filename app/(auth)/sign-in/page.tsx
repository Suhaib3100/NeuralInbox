'use client'
import { Button } from '@/components/ui/button'
import { GetAuthUserData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext';

const SignIn = () => {
  const createUser = useMutation(api.users.createUser);
  const {user,setUser} = useContext(AuthContext);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_token', tokenResponse.access_token);
        }
        
        const user = await GetAuthUserData(tokenResponse.access_token);
        if (!user) {
          console.error('Failed to get user data');
          return;
        }

        const result = await createUser({
          name: user?.name,
          email: user?.email,
          picture: user.picture
        });

        console.log('------:', result);
        setUser(setUser);
      } catch (error) {
        console.error('Authentication error:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error:', errorResponse);
    }
  });
  return (
    <div className='flex items-center flex-col justify-center h-screen'>
    <div className=' gap-10 border rounded-2xl p-10 shadow-md flex flex-col items-center'>
        <Image src={'/logo.svg'} alt='Logo' width={100} height={100} />
            <h2 className='text-2xl'>
                Sign in to AI personal Asistant
            </h2>
            <Button onClick={()=>googleLogin()}>
                Sign in with Google
            </Button>


    </div>
    </div>
  )
}

export default SignIn