"use client";

import Image from "next/image";
import SideBarDashboard from "@/app/components/sidebar/sidebar";
import TopNavBar from "@/app/components/topnav";
import Carousel1PNG from "../../public/img/carousel/1.png";
import ArrowDownSVG from "../../public/svg/chevron-down.svg";
import {overviewData} from "@/app/data/overview-data";
import OverviewDiv from "@/app/components/overview";
import CaretUpSVG from "../../public/svg/CaretDown.svg";
import NigeriaFlagSVG from "../../public/svg/nigeria-flag.svg";
import TimerSVG from "../../public/svg/timer.svg";
import {useState} from "react";
import GrowthChart from "../components/chart";

export default function DashboardPage() {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <div className="grid grid-cols-12 gap-2 min-h-screen p-2 bg-dashboard">
            {/* Sidebar */}
            <div className="col-span-2 p-7.5 border-r border-neutral-200 bg-white">
                <SideBarDashboard />
            </div>

            {/* Main content */}
            <div className="col-span-10 gap-2">
                {/* Header */}
                <div>
                    <TopNavBar />
                    <Image src={Carousel1PNG} alt={"1"} />
                    <div className={"flex justify-center items-center space-x-3 mt-2.5"}>
                        <div className={"rounded-full bg-carousel-dot p-2"}></div>
                        <div className={"rounded-full bg-primary-dark2 p-2"}></div>
                        <div className={"rounded-full bg-carousel-dot p-2"}></div>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="grid gap-2">
                    <div>
                        <div className={"space-y-6"}>
                            <div className={"flex justify-between items-center"}>
                                <h1 className={"text-p1 leading-none text-[24px] font-medium"}>Overview</h1>
                                <button className={"flex justify-center items-center hover:cursor-pointer text-[#737373] text-[14px] font-medium py-2 px-3 rounded-lg border border-[#E5E5E5]"}>This Month <span><Image src={ArrowDownSVG} alt={"arrow-down"} /></span></button>
                            </div>
                            <div className={"grid grid-cols-5 gap-6"}>
                                <div className={"col-span-2 rounded-lg bg-primary p-6"}>
                                    <p className={"text-white text-[12px] font-light"}>Your Balance</p>
                                    <h2 className={"pb-6 tracking-[2px] font-black text-white text-[24px]"}>N3,000,000.28</h2>
                                    <button className={"bg-white rounded-lg hover:cursor-pointer text-primary px-4 py-2 font-medium text-[12px]"}>Fund Wallet</button>
                                </div>
                                <div className={"col-span-3"}>
                                    <div className={"grid grid-cols-3 gap-6"}>
                                        {overviewData.map((list, index) => (
                                            <OverviewDiv
                                                key={index}
                                                image1={list.image1}
                                                altText1={list.altText1}
                                                text1={list.text1}
                                                image2={list.image2}
                                                altText2={list.altText2}
                                                text2={list.text2}
                                                text3={list.text3}
                                                text4={list.text4}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"mt-10"}>
                        <div className={"flex justify-between items-center"}>
                            <h1 className={"text-p1 leading-none text-[24px] font-medium"}>Recent Shipment</h1>
                            <button className={"flex justify-center items-center hover:cursor-pointer text-[#737373] text-[14px] font-medium py-2 px-3 rounded-lg border border-[#E5E5E5]"}>See All</button>
                        </div>
                        <GrowthChart />
                    </div>
                    <div className={"space-y-2"}>
                        <div className={"bg-white border border-[#DBD7D7] rounded-[10px] p-6 space-y-6"}>
                            <div className={"flex justify-between border-b border-b-[#DBD7D780]/50 pb-4"}>
                                <div className={"pb-4.5 grid grid-cols-3 gap-12.5"}>
                                    <div className={"space-y-2"}>
                                        <p className={"text-[#808080] text-[12px]"}>Tracking ID</p>
                                        <p className={"text-primary text-[16px] leading-none"}>MAF-100-234-291</p>
                                    </div>
                                    <div className={"space-y-2"}>
                                        <p className={"text-[#808080] text-[12px]"}>Sender</p>
                                        <p className={"text-[16px] leading-none"}>Bunmi Tanny</p>
                                    </div>
                                    <div className={"space-y-2"}>
                                        <p className={"text-[#808080] text-[12px]"}>Receiver</p>
                                        <p className={"text-[16px] leading-none"}>Mercy</p>
                                    </div>
                                </div>
                                <button className={"hover:cursor-pointer"} onClick={() => setIsVisible(!isVisible)}>
                                    <Image src={CaretUpSVG} alt={"caret-up"} />
                                </button>
                            </div>
                            {isVisible && (
                                <div className={"flex justify-between border-b border-b-[#DBD7D780]/50 pb-4"}>
                                    <div className={"space-y-2"}>
                                        <p className={"text-[#808080] text-[12px]"}>Pick Up From</p>
                                        <div className={"flex space-x-2"}>
                                            <span><Image src={NigeriaFlagSVG} alt={"nigeria-flag-svg"} /></span>
                                            <p className={"text-[16px] leading-none"}>Oyo Nigeria</p>
                                        </div>
                                    </div>
                                    <div className={"space-y-2"}>
                                        <p className={"text-[#808080] text-[12px]"}>Delivery To</p>
                                        <div className={"flex space-x-2"}>
                                            <span><Image src={NigeriaFlagSVG} alt={"nigeria-flag-svg"} /></span>
                                            <p className={"text-[16px] leading-none"}>Oyo Nigeria</p>
                                        </div>
                                    </div>
                                    <div className={"space-y-2"}>
                                        <p className={"text-[#808080] text-[12px]"}>Amount</p>
                                        <p className={"text-[16px] leading-none"}>N3000</p>
                                    </div>
                                    <div className={"space-y-2"}>
                                        <p className={"text-[#808080] text-[12px]"}>Status</p>
                                        <div className={"bg-[#FFEAD9] rounded-lg text-[#CB854B] py-2 p-2.25"}>In-Transit</div>
                                    </div>
                                </div>
                            )}
                            {isVisible && (
                                <div className={"flex justify-between"}>
                                    <div>
                                        <div className={"space-y-2"}>
                                            <p className={"text-[#808080] text-[12px]"}>Processing time</p>
                                            <div className={"flex space-x-2"}>
                                                <span><Image src={TimerSVG} alt={"nigeria-flag-svg"} /></span>
                                                <p className={"text-[16px] leading-none"}>10 hours</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex gap-2 font-semibold text-[12px]"}>
                                        <button className={"border-primary-dark border rounded-lg py-2 px-3.5"}>View More</button>
                                        <button className={"bg-[#EFEDED] rounded-lg py-2 px-7.5 text-[#808080]"} disabled={true}>Paid</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}