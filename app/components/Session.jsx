"use client"
import React, { useEffect } from 'react';
import useCartStore from '../store/store';
import { getsession } from '@/action';

const Session = () => {
  const getEmail = useCartStore((state) => state.getEmail);
  

  useEffect(() => {
    // Fetch session data and update emailSession
    getsession().then((session) => {
      getEmail(session?.user.email || ''); // Set the email or an empty string
    });
        //   const session= getsession()
        //  getEmail(session?.user?.email || ''); // Set the email or an empty string
  }, []); // Empty dependency array ensures this effect runs only onc

  return (
   <></>
  );
};

export default Session;
