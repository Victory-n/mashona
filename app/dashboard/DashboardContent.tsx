"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import SideBarDashboard from "@/app/components/sidebar/sidebar";
import TopNavBar from "@/app/components/topnav";
import Carousel1PNG from "../../public/img/carousel/1.png";
import ArrowDownSVG from "../../public/svg/chevron-down.svg";
import OverviewDiv from "@/app/components/overview";
import CaretUpSVG from "../../public/svg/CaretDown.svg";
import NigeriaFlagSVG from "../../public/svg/nigeria-flag.svg";
import ServicesSVG from "../../public/svg/globe.svg";
import TimerSVG from "../../public/svg/timer.svg";
import TruckSVG from "../../public/svg/truck.svg";
import ArrowSVG from "../../public/svg/arrow-up.svg";
import GreenArrowSVG from "../../public/svg/green-arrow.svg";
import ColorDownArrowSVG from "../../public/svg/color-down-arrow.svg";
import GrowthChart from "@/app/components/chart";
import { getWallet, getShipments, getOverviewStats, formatBalance } from "@/app/lib/data";
import type { Shipment } from "@/app/types";

// ── Status badge styling ──────────────────────────────────────────────────────
function getStatusStyle(status: string): string {
    switch (status) {
        case "Delivered":
            return "bg-[#E6F7E6] text-[#0A7D00]";
        case "Processing":
            return "bg-[#E6F0FF] text-[#3B5BDB]";
        case "Pending":
            return "bg-[#FFF9E6] text-[#CC8800]";
        case "Cancelled":
            return "bg-[#FFE6E6] text-[#CC0000]";
        case "In-Transit":
        default:
            return "bg-[#FFEAD9] text-[#CB854B]";
    }
}

// ── Single shipment card ──────────────────────────────────────────────────────
function ShipmentCard({shipment, expanded, onToggle,}: {
    shipment: Shipment;
    expanded: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            className={
                "bg-white border border-[#DBD7D7] rounded-[10px] p-6 space-y-6"
            }
        >
            {/* Row 1 – tracking, sender, receiver + toggle */}
            <div
                className={"flex justify-between border-b border-b-[#DBD7D780]/50 pb-4"}
            >
                <div className={"pb-4.5 grid grid-cols-3 gap-12.5"}>
                    <div className={"space-y-2"}>
                        <p className={"text-[#808080] text-[12px]"}>Tracking ID</p>
                        <p className={"text-primary text-[16px] leading-none"}>
                            {shipment.trackingId}
                        </p>
                    </div>
                    <div className={"space-y-2"}>
                        <p className={"text-[#808080] text-[12px]"}>Sender</p>
                        <p className={"text-[16px] leading-none"}>{shipment.sender}</p>
                    </div>
                    <div className={"space-y-2"}>
                        <p className={"text-[#808080] text-[12px]"}>Receiver</p>
                        <p className={"text-[16px] leading-none"}>{shipment.receiver}</p>
                    </div>
                </div>
                <button className={"hover:cursor-pointer"} onClick={onToggle}>
                    <Image src={CaretUpSVG} alt={"toggle"} />
                </button>
            </div>

            {/* Row 2 – pickup, delivery, amount, status */}
            {expanded && (
                <div
                    className={
                        "flex justify-between border-b border-b-[#DBD7D780]/50 pb-4"
                    }
                >
                    <div className={"space-y-2"}>
                        <p className={"text-[#808080] text-[12px]"}>Pick Up From</p>
                        <div className={"flex space-x-2"}>
              <span>
                <Image
                    src={shipment.pickupIsNigeria ? NigeriaFlagSVG : ServicesSVG}
                    alt={"pickup-flag"}
                />
              </span>
                            <p className={"text-[16px] leading-none"}>{shipment.pickupFrom}</p>
                        </div>
                    </div>
                    <div className={"space-y-2"}>
                        <p className={"text-[#808080] text-[12px]"}>Delivery To</p>
                        <div className={"flex space-x-2"}>
              <span>
                <Image
                    src={
                        shipment.deliveryIsNigeria ? NigeriaFlagSVG : ServicesSVG
                    }
                    alt={"delivery-flag"}
                />
              </span>
                            <p className={"text-[16px] leading-none"}>{shipment.deliveryTo}</p>
                        </div>
                    </div>
                    <div className={"space-y-2"}>
                        <p className={"text-[#808080] text-[12px]"}>Amount</p>
                        <p className={"text-[16px] leading-none"}>{shipment.amount}</p>
                    </div>
                    <div className={"space-y-2"}>
                        <p className={"text-[#808080] text-[12px]"}>Status</p>
                        <div
                            className={`rounded-lg py-2 p-2.25 text-[12px] ${getStatusStyle(shipment.status)}`}
                        >
                            {shipment.status}
                        </div>
                    </div>
                </div>
            )}

            {/* Row 3 – processing time + action buttons */}
            {expanded && (
                <div className={"flex justify-between"}>
                    <div className={"space-y-2"}>
                        <p className={"text-[#808080] text-[12px]"}>Processing time</p>
                        <div className={"flex space-x-2"}>
              <span>
                <Image src={TimerSVG} alt={"timer"} />
              </span>
                            <p className={"text-[16px] leading-none"}>
                                {shipment.processingTime}
                            </p>
                        </div>
                    </div>
                    <div className={"flex gap-2 font-semibold text-[12px]"}>
                        <button className={"border-primary-dark border rounded-lg py-2 px-3.5"}>
                            View More
                        </button>
                        {shipment.isPaid ? (
                            <button
                                className={"bg-[#EFEDED] rounded-lg py-2 px-7.5 text-[#808080]"}
                                disabled
                            >
                                Paid
                            </button>
                        ) : (
                            <button
                                className={
                                    "bg-primary rounded-lg py-2 px-7.5 text-white hover:bg-primary/90 transition-colors"
                                }
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Main dashboard content ────────────────────────────────────────────────────
export default function DashboardContent() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId") ?? "user_1";

    // Load data from JSON
    const wallet = getWallet(userId);
    const shipments = getShipments(userId);
    const stats = getOverviewStats(userId);

    // Build overview items from JSON stats + static SVG icons
    const overviewItems = stats
        ? [
            {
                image1: TruckSVG,
                altText1: "truck-svg",
                text1: "Total Shipment",
                value: stats.totalShipment.count,
                image2: ArrowSVG,
                altText2: "arrow-up-svg",
                text2: `${stats.totalShipment.percentageChange}%`,
                text3: "Vs last month:",
                text4: String(stats.totalShipment.vsLastMonth),
            },
            {
                image1: GreenArrowSVG,
                altText1: "green-arrow-up-svg",
                text1: "Total Exports",
                value: stats.totalExports.count,
                image2: ArrowSVG,
                altText2: "arrow-up-svg",
                text2: `${stats.totalExports.percentageChange}%`,
                text3: "Vs last month:",
                text4: String(stats.totalExports.vsLastMonth),
            },
            {
                image1: ColorDownArrowSVG,
                altText1: "down-arrow-svg",
                text1: "Total Imports",
                value: stats.totalImports.count,
                image2: ArrowSVG,
                altText2: "arrow-up-svg",
                text2: `${stats.totalImports.percentageChange}%`,
                text3: "Vs last month:",
                text4: String(stats.totalImports.vsLastMonth),
            },
        ]
        : [];

    // Track which shipment cards are expanded (all expanded by default)
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
        () => new Set(shipments.map((s) => s.id))
    );

    const toggleShipment = (id: string) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

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
                    <Image src={Carousel1PNG} alt={"banner"} />
                    <div className={"flex justify-center items-center space-x-3 mt-2.5"}>
                        <div className={"rounded-full bg-carousel-dot p-2"}></div>
                        <div className={"rounded-full bg-primary-dark2 p-2"}></div>
                        <div className={"rounded-full bg-carousel-dot p-2"}></div>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="grid gap-2">
                    {/* Overview */}
                    <div>
                        <div className={"space-y-6"}>
                            <div className={"flex justify-between items-center"}>
                                <h1
                                    className={
                                        "text-p1 leading-none text-[24px] font-medium"
                                    }
                                >
                                    Overview
                                </h1>
                                <button
                                    className={
                                        "flex justify-center items-center hover:cursor-pointer text-[#737373] text-[14px] font-medium py-2 px-3 rounded-lg border border-[#E5E5E5]"
                                    }
                                >
                                    This Month{" "}
                                    <span>
                    <Image src={ArrowDownSVG} alt={"arrow-down"} />
                  </span>
                                </button>
                            </div>

                            <div className={"grid grid-cols-5 gap-6"}>
                                {/* Wallet balance */}
                                <div className={"col-span-2 rounded-lg bg-primary p-6"}>
                                    <p className={"text-white text-[12px] font-light"}>
                                        Your Balance
                                    </p>
                                    <h2
                                        className={
                                            "pb-6 tracking-[2px] font-black text-white text-[24px]"
                                        }
                                    >
                                        N{wallet ? formatBalance(wallet.balance) : "0.00"}
                                    </h2>
                                    <button
                                        className={
                                            "bg-white rounded-lg hover:cursor-pointer text-primary px-4 py-2 font-medium text-[12px]"
                                        }
                                    >
                                        Fund Wallet
                                    </button>
                                </div>

                                {/* Overview stat cards */}
                                <div className={"col-span-3"}>
                                    <div className={"grid grid-cols-3 gap-6"}>
                                        {overviewItems.map((item, index) => (
                                            <OverviewDiv key={index} {...item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart – untouched */}
                    <div className={"mt-10"}>
                        <div className={"flex justify-between items-center"}>
                            <h1 className={"text-p1 leading-none text-[24px] font-medium"}>
                                Recent Shipment
                            </h1>
                            <button
                                className={
                                    "flex justify-center items-center hover:cursor-pointer text-[#737373] text-[14px] font-medium py-2 px-3 rounded-lg border border-[#E5E5E5]"
                                }
                            >
                                See All
                            </button>
                        </div>
                        <GrowthChart />
                    </div>

                    {/* Shipment cards */}
                    <div className={"space-y-4 mt-4"}>
                        {shipments.length === 0 ? (
                            <p className={"text-[#808080] text-[14px] text-center py-8"}>
                                No shipments found.
                            </p>
                        ) : (
                            shipments.map((shipment) => (
                                <ShipmentCard
                                    key={shipment.id}
                                    shipment={shipment}
                                    expanded={expandedIds.has(shipment.id)}
                                    onToggle={() => toggleShipment(shipment.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}