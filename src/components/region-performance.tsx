"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { generateSalesData, regions, products } from "@/lib/mock-data"
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

export default function RegionPerformance() {
    const [selectedRegion, setSelectedRegion] = useState<string>(regions[0])
    const [period, setPeriod] = useState<"month" | "quarter" | "year">("year")

    // Get data for the selected region
    const currentPeriodData = generateSalesData(period, 0).filter((item) => item.region === selectedRegion)
    const previousPeriodData = generateSalesData(period, -1).filter((item) => item.region === selectedRegion)

    // Aggregate data by product for the selected region
    const aggregateByProduct = (data: any[]) => {
        const aggregated = data.reduce(
            (acc, item) => {
                if (!acc[item.product]) {
                    acc[item.product] = { name: item.product, value: 0 }
                }
                acc[item.product].value += item.sales
                return acc
            },
            {} as Record<string, { name: string; value: number }>,
        )

        return Object.values(aggregated).sort((a, b) => b.value - a.value)
    }

    const productData = aggregateByProduct(currentPeriodData)

    // Aggregate data by date for the selected region
    const aggregateByDate = (data: any[]) => {
        const aggregated = data.reduce(
            (acc, item) => {
                const date = item.date
                if (!acc[date]) {
                    acc[date] = { date, sales: 0, orders: 0, units: 0 }
                }
                acc[date].sales += item.sales
                acc[date].orders += item.orders
                acc[date].units += item.units
                return acc
            },
            {} as Record<string, { date: string; sales: number; orders: number; units: number }>,
        )

        return Object.values(aggregated).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    const currentDateData = aggregateByDate(currentPeriodData)
    const previousDateData = aggregateByDate(previousPeriodData)

    // Combine data for trend chart
    const trendData = currentDateData.map((current) => {
        const previous = previousDateData.find((p) => new Date(p.date).getDate() === new Date(current.date).getDate())

        return {
            date: current.date,
            current: current.sales,
            previous: previous ? previous.sales : 0,
        }
    })

    // Calculate KPIs
    const totalSales = currentPeriodData.reduce((sum, item) => sum + item.sales, 0)
    const totalOrders = currentPeriodData.reduce((sum, item) => sum + item.orders, 0)
    const totalUnits = currentPeriodData.reduce((sum, item) => sum + item.units, 0)

    const prevTotalSales = previousPeriodData.reduce((sum, item) => sum + item.sales, 0)
    const salesGrowth = prevTotalSales ? ((totalSales - prevTotalSales) / prevTotalSales) * 100 : 0

    // Colors for the pie chart
    const COLORS = ["#4f46e5", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#84cc16", "#10b981"]

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="region-select">Select Region</Label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger id="region-select" className="w-full md:w-[200px]">
                            <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((region) => (
                                <SelectItem key={region} value={region}>
                                    {region}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="period-select">Time Period</Label>
                    <Select value={period} onValueChange={(value) => setPeriod(value as "month" | "quarter" | "year")}>
                        <SelectTrigger id="period-select" className="w-full md:w-[200px]">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="month">Monthly</SelectItem>
                            <SelectItem value="quarter">Quarterly</SelectItem>
                            <SelectItem value="year">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(totalSales / 1000000).toFixed(2)}M</div>
                        <p className="text-xs text-muted-foreground">
                            {salesGrowth > 0 ? "+" : ""}
                            {salesGrowth.toFixed(1)}% from previous period
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUnits.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="trends" className="space-y-4">
                <TabsList className="w-full overflow-x-auto">
                    <TabsTrigger value="trends">Sales Trends</TabsTrigger>
                    <TabsTrigger value="products">Product Mix</TabsTrigger>
                    <TabsTrigger value="comparison">Regional Comparison</TabsTrigger>
                </TabsList>

                <TabsContent value="trends" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Trend in {selectedRegion}</CardTitle>
                            <CardDescription>Current vs Previous Period</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] sm:h-[350px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={trendData}
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
                                        formatter={(value) => [`${Number(value).toLocaleString()}`, undefined]}
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
                                        dataKey="current"
                                        name="Current Period"
                                        stroke="#4f46e5"
                                        activeDot={{ r: 8 }}
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="previous"
                                        name="Previous Period"
                                        stroke="#94a3b8"
                                        strokeDasharray="5 5"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Mix in {selectedRegion}</CardTitle>
                            <CardDescription>Revenue distribution by product</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] sm:h-[350px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={productData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => {
                                            // On smaller screens, only show percentage
                                            if (window.innerWidth < 640) {
                                                return `${(percent * 100).toFixed(0)}%`
                                            }
                                            // On larger screens, show name and percentage
                                            return `${name}: ${(percent * 100).toFixed(0)}%`
                                        }}
                                    >
                                        {productData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${Number(value).toLocaleString()}`, "Revenue"]} />
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

                <TabsContent value="comparison" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Performance Comparison</CardTitle>
                            <CardDescription>How {selectedRegion} compares to other regions</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] sm:h-[350px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={products.map((product) => {
                                        // Calculate average sales for this product across all regions
                                        const allRegionData = generateSalesData(period, 0).filter((item) => item.product === product)
                                        const regionCount = regions.length
                                        const totalSales = allRegionData.reduce((sum, item) => sum + item.sales, 0)
                                        const avgSales = totalSales / regionCount

                                        // Get sales for this product in the selected region
                                        const regionSales = allRegionData
                                            .filter((item) => item.region === selectedRegion)
                                            .reduce((sum, item) => sum + item.sales, 0)

                                        return {
                                            name: product,
                                            regionSales,
                                            avgSales,
                                        }
                                    })}
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
                                    <Tooltip formatter={(value) => [`${Number(value).toLocaleString()}`, undefined]} />
                                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                                    <Bar dataKey="regionSales" name={`${selectedRegion} Sales`} fill="#4f46e5" />
                                    <Bar dataKey="avgSales" name="Average Across Regions" fill="#94a3b8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
