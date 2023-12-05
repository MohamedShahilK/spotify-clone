"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import CustomButton from "./Reusable/CustomButton";
import useAuthModal from "@/hooks/useAuthModal";

interface HeaderProps {
    children: React.ReactNode,
    className?: string,
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {

    // hook
    const router = useRouter();

    const handleLogout = () => { }

    const authModel = useAuthModal();

    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className="w-full mb-4 flex items-center justify-between">

                {/* For Devices With or greater than Medium Size*/}
                <div className="hidden md:flex gap-x-2 items-center">

                    <button onClick={() => router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-25 transition">
                        <RxCaretLeft size={35} />
                    </button>

                    <button onClick={() => router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-25 transition">
                        <RxCaretRight size={35} />
                    </button>

                </div>

                {/* For Devices With Medium Size*/}

                {/* For Devices less than Medium Size*/}
                <div className="flex md:hidden gap-x-2 items-center">

                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome className="text-black" size={20} />
                    </button>

                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20} />
                    </button>

                </div>
                {/* For Devices less than Medium Size*/}


                <div className="flex justify-between items-center gap-x-4">

                    <>
                        <div>
                            {/* <CustomButton className="bg-transparent text-neutral-300 font-medium" onClick={() => { }}> */}
                            <CustomButton className="bg-transparent text-neutral-300 font-medium" onClick={authModel.onOpen}>
                                SignUp
                            </CustomButton>
                        </div>

                        <div>
                            <CustomButton className="bg-white px-6 py-2" onClick={authModel.onOpen}>
                                Log in
                            </CustomButton>
                        </div>

                    </>

                </div>

            </div>

            {/* Passing remaining parts */}
            {children}
            {/* Passing remaining parts */}

        </div>
    );
}

export default Header;