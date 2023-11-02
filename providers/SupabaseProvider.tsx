"use client";

import { Database } from '@/types_db'
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

interface SupabaseProviderProps {
    children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {

    // createClientComponentClient : To create superbase client

    // superbaseClient is just a variable to hold the SupabaseClient
    // Here we didn't using dispatch method, just holding the state
    const [supabaseClient] = useState(() => createClientComponentClient<Database>())

    return (
        // <SessionContextProvider> : This is a custom or third-party React component, which is used to provide a context for its children. Context in React is a way to share data between components without having to pass props through every level of the component tree.

        // supabaseClient={supabaseClient}: It looks like the SessionContextProvider component is being provided with a supabaseClient prop, which is presumably a Supabase client. Supabase is a service for building applications with PostgreSQL databases. 
        //                                  In this context, it's likely that the Supabase client is being used to manage user sessions and authentication.

        // Important
        // ----------
        // 1. The purpose of this code is to set up a context for its child components to access the supabaseClient or other data and functions related to user sessions and authentication, which can be 
        //    used throughout the component tree without explicitly passing supabaseClient as a prop to each component.

        // 2. To use this code, you would typically include it in your React component hierarchy to provide access to the supabaseClient and related session data to your application's components. It's part 
        //    of the overall state management and data sharing strategy in your application.

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