"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
    image: string,
    name: string,
    href: string,
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {

    const router = useRouter();

    const onClick = () => {
        // Add authetication before push
        router.push(href);
    }

    return (
        // It is the glass container contains image and text(Liked Songs)
        <button onClick={onClick} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            
            {/* 64px * 64 px for image */}
            {/* container size controlled by grid that we specified in div parent of ListItem in page.tsx */}
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image className="object-cover" fill src={image} alt="Image"></Image>
            </div>

            <p className="font-medium truncate py-5">{name}</p>


            <div className="absolute right-5 transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md group-hover:opacity-100 hover:scale-110">
                <FaPlay className="text-black" />
            </div>
        </button>
    );
}

export default ListItem;