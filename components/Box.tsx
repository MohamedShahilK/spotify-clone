import React from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps {
    children: React.ReactNode,
    className?: string,
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        <div className={twMerge(`
            bg-neutral-900
            rounded-lg
            h-fit
            w-full
        `,
            className // for adding addtional classname if needed in future
        )}>
            {children}
        </div>
    );
}

export default Box;

