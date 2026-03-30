"use client";

import DashboardIconSVG from "../../../public/svg/dashboard-icon.svg";
import Link from "next/link";
import Image from "next/image";
import {sidebarData} from "@/app/data/sidebar-data";
import SidebarList from "@/app/components/sidebar/sidebar-list";

export default function SideBarDashboard() {
    return (
        <div className={""}>
            <div className={"mt-9.5"}>
                <ul className={"space-y-2"}>
                    <li className={""}>
                        <div className={"p-4 rounded-lg text-white font-semibold text-[16px] leading-none bg-primary-dark flex justify-center"}>
                            <div className={"flex justify-center items-center gap-2"}>
                                <Image src={DashboardIconSVG} alt={"Dashboard"} />
                                <Link href={"/dashboard"}>Dashboard</Link>
                            </div>
                        </div>
                    </li>
                    {sidebarData.map((list, index) => (
                        <SidebarList
                            key={index}
                            image={list.image}
                            text={list.text}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}