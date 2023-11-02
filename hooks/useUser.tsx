import { Subscription, UserDetails } from '@/types';
import { User } from '@supabase/auth-helpers-nextjs'
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react'
import { createContext, useContext, useEffect, useState } from 'react';

// When you create a context with this type, you should provide a value that matches the expected structure defined in UserContextType. This allows other components in your application to consume 
// the user context with confidence that it contains these specific properties.
type UserContextType = {    // Like a model
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
// interface Props: This declares an interface named Props
// [propName: string]: any: This part of the interface is defining an index signature that allows you to have properties with string keys (property names) of any type (any). 
// The propName is a placeholder for the actual property name. This means you can pass any props with string names to the component that implements this interface, and their values can be of any type.
export interface Props {
    [propName: string]: any
}

// Here we extract couple of things from SessionContextProvider(in SuperbaseProvider.tsx), because we wrapped the application with "SupabaseProvider" in layout.tsx file
export const MyUserContextProvider = (props: Props) => {

    // useSessionContext() is a hook that returns an object that likely contains properties related to user sessions, such as session, isLoading, and supabaseClient.

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

    // .from('users') specifies that you want to perform the query on the "users" table in your database.
    // .select('*') specifies that you want to select all columns from the "users" table. You can replace '*' with an array of specific column names if you only want to select certain columns.
    // .single() is used to execute the query and retrieve a single record from the "users" table. If there are multiple records that match the query, .single() will return the first record. If no records match, it will return null.
    const getUserDetails = () => superbase.from('users').select('*').single();

    // .select('*, prices(*, products(*))') This means you want to include related data from the "prices" and "products" tables for each subscription.
    // .in('status', ['trailing', 'active']) specifies a filter condition. It retrieves records where the "status" column matches one of the values in the array ['trailing', 'active'].
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

    // UserContext.Provider: This is a context provider component that allows you to provide a value to the context and make it accessible to any child components that consume this context.
    // value={value}: The value prop is used to provide the value that you want to make available in the context. This value can be any data or functions that you want to share with child components.
    // {...props}: The spread operator is used to pass any additional props that might have been passed to the UserContext.Provider component when it is used. This allows you to pass through any other props that the UserContext.Provider component might accept.
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