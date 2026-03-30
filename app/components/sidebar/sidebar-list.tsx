import Image from "next/image";
import Link from "next/link";
import React from "react";

type SidebarListProps = {
    image: string;
    text: string;
};

const SidebarList: React.FC<SidebarListProps> = ({ image, text }) => {
    return (
        <li>
            <div className="p-4 rounded-lg text-sidebar-text font-normal text-[16px] leading-none flex">
                <div className="flex justify-center items-center gap-2">
                    <Image src={image} alt={text} />
                    <Link href="/dashboard">{text}</Link>
                </div>
            </div>
        </li>
    );
};

export default SidebarList;