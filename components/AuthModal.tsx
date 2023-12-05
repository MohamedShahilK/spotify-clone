"use client";

// Github Login Is pending

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Reusable/Modal";
import { useEffect } from "react";

const AuthModal = () => {
    const superbaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();

    const { onClose, isOpen } = useAuthModal();

    const onChange = (open: boolean) => {
        // is used to close the modal default when not modal is not shown(open == false)
        if (!open) {
            onClose();
        }
    };

    // close authmodal after login successfully or already logged In
    useEffect(() => {
        // if session exists
        if (session) {
            router.refresh(); // Refresh current page
            onClose();
        }
    }, [session, router, onClose])


    return (
        // <Modal title="Welcome back" description="Login to your account" isOpen onChange={() => { }}>
        <Modal title="Welcome back" description="Login to your account" isOpen={isOpen} onChange={onChange}>
            {/* For Getting Whole UI Section of Auth Page */}
            <Auth
                magicLink // Login without password (send a magic link email)
                theme="dark"
                providers={["github"]}
                supabaseClient={superbaseClient}
                appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: '#404040', brandAccent: '#22c55e' } } } }}>
            </Auth>
        </Modal>
    );
}

export default AuthModal;