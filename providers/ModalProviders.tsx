// Provider for modals

"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // Hydration is the process of attaching event handlers and making the client-side application interactive while preserving the server-rendered HTML structure. When there is a mismatch between 
    // the server-rendered HTML and the client-side React application, React may throw a hydration error to prevent potential issues.

    // here we are doing a trick which is going to prevent any errors being cause by our models since we are doing server-side rendering 
    // here modals can cause hydration error   
    // so in order to prevent that we never want to render a model if we are in server side rendering.
    // Our trick is below:
    useEffect(() => {

        // first we change isMounted into true Once its loaded
        // So if this useEffect ever loads that means we are already on the client and we can safely show our models 
        setIsMounted(true);
    }, [])

    // Outside of useEffect    
    // useEffect not working in server side, because it is related to client-side React application.

    // Here we ensuring that none of the models can be seen or opened during server-side rendering 
    if (!isMounted) {
        return null;
    }


    return (
        <>
            <Modal />
        </>
    );
}

export default ModalProvider;