export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
};

export type Wallet = {
    userId: string;
    balance: number;
    currency: string;
};

export type ShipmentStatus =
    | "In-Transit"
    | "Delivered"
    | "Processing"
    | "Pending"
    | "Cancelled";

export type Shipment = {
    id: string;
    userId: string;
    trackingId: string;
    sender: string;
    receiver: string;
    pickupFrom: string;
    pickupIsNigeria: boolean;
    deliveryTo: string;
    deliveryIsNigeria: boolean;
    amount: string;
    status: ShipmentStatus;
    processingTime: string;
    isPaid: boolean;
};

export type StatItem = {
    count: number;
    percentageChange: number;
    trend: "up" | "down";
    vsLastMonth: number;
};

export type OverviewStats = {
    userId: string;
    totalShipment: StatItem;
    totalExports: StatItem;
    totalImports: StatItem;
};