// Controller for Authentication Modal sheet with zustand state-management for opening and closing modal sheet

import { create } from 'zustand'

interface AuthModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useAuthModal;