import { Subscription, UserDetails } from '@/types';
import { User } from '@supabase/auth-helpers-nextjs'
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react'
import { createContext, useContext, useEffect, useState } from 'react';

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(  // UserContextType or undefined
    undefined //By default, we setting its value is undefined
);

// Creating General Props
export interface Props {
    [propName: string]: any
}

// Here we extract couple of things from SessionContextProvider(in SuperbaseProvider.tsx), because we wrapped the application with "SupabaseProvider" in layout.tsx file
export const MyUserContextProvider = (props: Props) => {

    // the items we are going to extract related to userSession
    const {
        session,
        isLoading: isLoadingUser, // remap isLoading in useSessionContext into isLoadingUser
        supabaseClient: superbase, // remap supabaseClient in useSessionContext into superbase
    } = useSessionContext()

    // user
    const user = useSupaUser();

    // access token
    // Here session coming from first one (useSessionContext())
    const accessToken = session?.access_token ?? null;


    const [isLoadingData, setIsLoadingData] = useState(false) //For data loading
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    const getUserDetails = () => superbase.from('users').select('*').single();
    const getSubscription = () => superbase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trailing', 'active']).single();

    // For patch this get informations and assign into corressponding dispatch functions. Also for loading all data if user is logged, otherwise clear all data
    useEffect(() => {

        // if we are loggedIn (user), but currently not loading any data (!isLoadingData) or any userdetails and subscription
        if (user && !isLoadingData && !userDetails && !subscription) {

            // start loading
            setIsLoadingData(true);

            // Promise.allSettled([0, 1, 2, 3, .....])
            // if you need the final result of every promise in the input iterable whether or not any one (promise) is rejects
            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {

                const userDetailsPromise = results[0];
                const subscriptionPromise = results[1];

                if (userDetailsPromise.status === 'fulfilled') {
                    setUserDetails(userDetailsPromise.value.data as UserDetails)
                }

                if (subscriptionPromise.status === 'fulfilled') {
                    setSubscription(subscriptionPromise.value.data as Subscription)
                }

                // end loading
                setIsLoadingData(false);
            });
        } else if (!user && !isLoadingData && !isLoadingUser) {
            setUserDetails(null);
            setSubscription(null);
        }

    }, [user, isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingData || isLoadingUser,
        subscription,
    }

    return <UserContext.Provider value={value} {...props} />
}

// useUser must be used within within a MyUserContextProvider
export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser must be used within within a MyUserContextProvider')
    } else {
        return context;
    }
}