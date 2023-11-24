"use client";

import Modal from "./Reusable/Modal";

const AuthModal = () => {
    return (
        <Modal title="Welcome back" description="Login to your account" isOpen onChange={() => { }}>
            Auth modal children!
        </Modal>
    );
}

export default AuthModal;