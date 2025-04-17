import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KpiCardsProps {
  totalSales: number
  salesGrowth: number
  totalOrders: number
  ordersGrowth: number
  totalUnits: number
  unitsGrowth: number
}

export default function KpiCards({
  totalSales,
  salesGrowth,
  totalOrders,
  ordersGrowth,
  totalUnits,
  unitsGrowth,
}: KpiCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
          <div className="flex items-center mt-1">
            {salesGrowth > 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
            )}
            <p className={cn("text-xs", salesGrowth > 0 ? "text-green-500" : "text-red-500")}>
              {Math.abs(salesGrowth).toFixed(1)}% from previous period
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
          <div className="flex items-center mt-1">
            {ordersGrowth > 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
            )}
            <p className={cn("text-xs", ordersGrowth > 0 ? "text-green-500" : "text-red-500")}>
              {Math.abs(ordersGrowth).toFixed(1)}% from previous period
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUnits.toLocaleString()}</div>
          <div className="flex items-center mt-1">
            {unitsGrowth > 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
            )}
            <p className={cn("text-xs", unitsGrowth > 0 ? "text-green-500" : "text-red-500")}>
              {Math.abs(unitsGrowth).toFixed(1)}% from previous period
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
