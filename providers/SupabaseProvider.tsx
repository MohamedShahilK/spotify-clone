"use client";

import { Database } from '@/types_db'
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

interface SupabaseProviderProps {
    children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {

    // superbaseClient is just a variable to hold the SupabaseClient
    // Here we didn't using dispatch method, just holding the state
    const [supabaseClient] = useState(() => createClientComponentClient<Database>())

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );
}

export default SupabaseProvider;


// @superbase/auth-helpers-nextjs
// -----------------------------------
// 1. The Next.js Auth Helpers package configures Supabase Auth to store the user's session in a cookie, rather than localStorage. This makes it available across the client and server of the App 
//    Router - Client Components, Server Components, Server Actions, Route Handlers and Middleware. The session is automatically sent along with any requests to Supabase.
// 2. The Next.js Auth Helpers are configured to use the server-side auth flow to sign users into your application. This requires you to setup a Code Exchange route, to exchange an auth code for the 
//    user's session, which is set as a cookie for future requests made to Supabase.

// SessionContextProvider
// -------------------------------
//  1. This seems to be a custom or third-party React component responsible for managing user session context or authentication state. It's being used as a wrapper around other components to provide access 
//     to the session-related data and functionality throughout the application.
//  2. supabaseClient: This is a prop being passed to the SessionContextProvider. It's likely an instance of Supabase client, a library for interacting with the Supabase backend service. This client is 
//     probably used for handling user authentication and other Supabase-related functionality.