import walletData from "@/app/data/json/wallet.json";
import shipmentsData from "../data/json/shippments.json";
import overviewData from "@/app/data/json/overview-stats.json";
import type { Wallet, Shipment, OverviewStats } from "@/app/types";

export function getWallet(userId: string): Wallet | null {
    return (walletData as Wallet[]).find((w) => w.userId === userId) ?? null;
}

export function getShipments(userId: string): Shipment[] {
    return (shipmentsData as Shipment[]).filter((s) => s.userId === userId);
}

export function getOverviewStats(userId: string): OverviewStats | null {
    return (overviewData as OverviewStats[]).find((o) => o.userId === userId) ?? null;
}

export function formatBalance(amount: number): string {
    return amount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}