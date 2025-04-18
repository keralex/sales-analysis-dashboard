"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateSalesData } from "@/lib/mock-data"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrdersAnalytics() {
    const [period, setPeriod] = useState<"month" | "quarter" | "year">("month")

    // Get current and previous period data
    const currentPeriodData = generateSalesData(period, 0)
    const previousPeriodData = generateSalesData(period, -1)

    // Calculate order metrics
    const totalOrders = currentPeriodData.reduce((sum, item) => sum + item.orders, 0)
    const totalUnits = currentPeriodData.reduce((sum, item) => sum + item.units, 0)
    const totalRevenue = currentPeriodData.reduce((sum, item) => sum + item.sales, 0)

    const prevTotalOrders = previousPeriodData.reduce((sum, item) => sum + item.orders, 0)
    const ordersGrowth = prevTotalOrders ? ((totalOrders - prevTotalOrders) / prevTotalOrders) * 100 : 0

    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0
    const prevAvgOrderValue = prevTotalOrders
        ? previousPeriodData.reduce((sum, item) => sum + item.sales, 0) / prevTotalOrders
        : 0
    const avgOrderValueGrowth = prevAvgOrderValue ? ((avgOrderValue - prevAvgOrderValue) / prevAvgOrderValue) * 100 : 0

    const unitsPerOrder = totalOrders ? totalUnits / totalOrders : 0

    // Aggregate data by date
    const aggregateByDate = (data: any[]) => {
        const aggregated = data.reduce((acc, item) => {
            const date = item.date
            if (!acc[date]) {
                acc[date] = { date, orders: 0, units: 0, sales: 0 }
            }
            acc[date].orders += item.orders
            acc[date].units += item.units
            acc[date].sales += item.sales
            return acc
        }, {})

        return Object.values(aggregated).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    const dateData = aggregateByDate(currentPeriodData)

    // Aggregate data by region
    const aggregateByRegion = (data: any[]) => {
        const aggregated = data.reduce((acc, item) => {
            const region = item.region
            if (!acc[region]) {
                acc[region] = { name: region, orders: 0, value: 0 }
            }
            acc[region].orders += item.orders
            acc[region].value += item.sales
            return acc
        }, {})

        return Object.values(aggregated).sort((a: any, b: any) => b.orders - a.orders)
    }

    const regionData = aggregateByRegion(currentPeriodData)

    // Aggregate data by product
    const aggregateByProduct = (data: any[]) => {
        const aggregated = data.reduce((acc, item) => {
            const product = item.product
            if (!acc[product]) {
                acc[product] = { name: product, orders: 0, units: 0 }
            }
            acc[product].orders += item.orders
            acc[product].units += item.units
            return acc
        }, {})

        return Object.values(aggregated).sort((a: any, b: any) => b.orders - a.orders)
    }

    const productData = aggregateByProduct(currentPeriodData)

    // Colors for the pie chart
    const COLORS = ["#4f46e5", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#84cc16", "#10b981"]

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {ordersGrowth > 0 ? "+" : ""}
                            {ordersGrowth.toFixed(1)}% from previous period
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            {avgOrderValueGrowth > 0 ? "+" : ""}
                            {avgOrderValueGrowth.toFixed(1)}% from previous period
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Units Per Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{unitsPerOrder.toFixed(1)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="trends" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 overflow-x-auto">
                    <TabsTrigger value="trends" onClick={() => setPeriod("month")}>
                        Order Trends
                    </TabsTrigger>
                    <TabsTrigger value="regions" onClick={() => setPeriod("month")}>
                        Regional Distribution
                    </TabsTrigger>
                    <TabsTrigger value="products" onClick={() => setPeriod("month")}>
                        Product Performance
                    </TabsTrigger>
                </TabsList>

                <div className="flex justify-end mb-2">
                    <Select value={period} onValueChange={(value) => setPeriod(value as "month" | "quarter" | "year")}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="month">Last 30 Days</SelectItem>
                            <SelectItem value="quarter">Last Quarter</SelectItem>
                            <SelectItem value="year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <TabsContent value="trends" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Volume Over Time</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] sm:h-[350px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={dateData}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 0,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(date) =>
                                            new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "short" })
                                        }
                                        tick={{ fontSize: 12 }}
                                        minTickGap={15}
                                    />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        formatter={(value) => [Number(value).toLocaleString(), undefined]}
                                        labelFormatter={(date) =>
                                            new Date(date).toLocaleDateString(undefined, {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })
                                        }
                                        contentStyle={{ fontSize: "12px" }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                                    <Line
                                        type="monotone"
                                        dataKey="orders"
                                        name="Orders"
                                        stroke="#4f46e5"
                                        activeDot={{ r: 8 }}
                                        strokeWidth={2}
                                    />
                                    <Line type="monotone" dataKey="units" name="Units Sold" stroke="#f43f5e" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="regions" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders by Region</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] sm:h-[350px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={regionData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="orders"
                                        label={({ name, percent }) => {
                                            // On smaller screens, only show percentage
                                            if (window.innerWidth < 640) {
                                                return `${(percent * 100).toFixed(0)}%`
                                            }
                                            // On larger screens, show name and percentage
                                            return `${name}: ${(percent * 100).toFixed(0)}%`
                                        }}
                                    >
                                        {regionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), "Orders"]} />
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        wrapperStyle={{ fontSize: "12px" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders by Product</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] sm:h-[350px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={productData}
                                    margin={{
                                        top: 20,
                                        right: 10,
                                        left: 0,
                                        bottom: 5,
                                    }}
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={100}
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => {
                                            // Truncate long product names on small screens
                                            if (window.innerWidth < 640 && value.length > 10) {
                                                return value.substring(0, 10) + "..."
                                            }
                                            return value
                                        }}
                                    />
                                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), undefined]} />
                                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                                    <Bar dataKey="orders" name="Orders" fill="#4f46e5" />
                                    <Bar dataKey="units" name="Units Sold" fill="#f43f5e" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
