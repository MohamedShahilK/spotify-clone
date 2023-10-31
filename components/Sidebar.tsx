"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SIdebarItem";
import Library from "./Library";

interface SidebarProps {
    children: React.ReactNode;
}

// type SidebarProps = { children: React.ReactNode };  /* could also use type instead of interface */

const Sidebar: React.FC<SidebarProps> = ({ children }) => {

    // pathname hook from nextjs
    const pathname = usePathname();

    // first - empty array , second - dependency array
    // hook for memoization as caching a value so that it does not need to be recalculated.
    // The useMemo Hook only runs when one of its dependencies update.
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/'
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === 'Search',
            href: '/search'
        }
    ], [pathname])

    return (
        // <div>
        //     {children}
        // </div>

        // 
        <div className="flex h-full">
            <div className="
                hidden
                md:flex
                flex-col                
                gap-y-2 {/* gap b/w rows */}
                bg-black
                h-full
                w-[300px]
                p-2
            ">
                <Box className="
                    flex
                    flex-col
                    gap-y-4
                    px-5
                    p-4
                ">
                    {routes.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                        />
                    ))}


                </Box>

                {/* overflow-y-auto -- Overflow on y direction setting automatic */}
                <Box className="overflow-y-auto h-full">
                    {/* Song Library */}
                    <Library>

                    </Library>
                </Box>
            </div>


            {/* Passing remaining parts */}
            {/* Main Content */}
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
            {/* Main Content */}
            {/* Passing remaining parts */}
        </div>
    );
}

export default Sidebar; 
