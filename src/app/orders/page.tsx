import OrdersList from "@/components/orders-list"
import OrdersAnalytics from "@/components/orders-analytics"

export default function OrdersPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
            <OrdersAnalytics />
            <div className="mt-6">
                <OrdersList />
            </div>
        </div>
    )
}
