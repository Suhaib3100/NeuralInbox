'use client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AuthContext } from '@/context/AuthContext';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState();
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}>
        <ConvexProvider client={convex}>
        <AuthContext.Provider value={{user,setUser}}> 
    <NextThemesProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
>
        <div>{children}</div>

    </NextThemesProvider>
    </AuthContext.Provider>
    </ConvexProvider>

    </GoogleOAuthProvider>
  )
}

export default Provider