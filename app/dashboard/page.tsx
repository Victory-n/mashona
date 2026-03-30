import { Suspense } from "react";
import DashboardContent from "@/app/dashboard/DashboardContent";

export default function DashboardPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-dashboard flex items-center justify-center">
                    <p className="text-p2 text-[16px]">Loading dashboard...</p>
                </div>
            }
        >
            <DashboardContent />
        </Suspense>
    );
}