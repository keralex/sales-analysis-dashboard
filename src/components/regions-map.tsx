"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { regionMarketStrength } from "@/lib/mock-data"
import { generateSalesData } from "@/lib/mock-data"

export default function RegionsMap() {
    const [mapMetric, setMapMetric] = useState<"sales" | "marketStrength" | "growth">("sales")
    const [mapData, setMapData] = useState<Record<string, { color: string; value: number }>>({})
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640)
        }

        // Initial check
        checkMobile()

        // Add event listener
        window.addEventListener("resize", checkMobile)

        return () => {
            window.removeEventListener("resize", checkMobile)
        }
    }, [])

    useEffect(() => {
        // Get current and previous period sales data
        const currentPeriodData = generateSalesData("year", 0)
        const previousPeriodData = generateSalesData("year", -1)

        // Calculate total sales by region for current period
        const currentRegionSales = Object.keys(regionMarketStrength).reduce(
            (acc, region) => {
                const sales = currentPeriodData
                    .filter((item) => item.region === region)
                    .reduce((sum, item) => sum + item.sales, 0)
                acc[region] = sales
                return acc
            },
            {} as Record<string, number>,
        )

        // Calculate total sales by region for previous period
        const previousRegionSales = Object.keys(regionMarketStrength).reduce(
            (acc, region) => {
                const sales = previousPeriodData
                    .filter((item) => item.region === region)
                    .reduce((sum, item) => sum + item.sales, 0)
                acc[region] = sales
                return acc
            },
            {} as Record<string, number>,
        )

        // Calculate growth rates
        const growthRates = Object.keys(regionMarketStrength).reduce(
            (acc, region) => {
                const currentSales = currentRegionSales[region] || 0
                const previousSales = previousRegionSales[region] || 1 // Avoid division by zero
                const growth = ((currentSales - previousSales) / previousSales) * 100
                acc[region] = growth
                return acc
            },
            {} as Record<string, number>,
        )

        // Prepare map data based on selected metric
        const newMapData: Record<string, { color: string; value: number }> = {}

        Object.keys(regionMarketStrength).forEach((region) => {
            let value: number
            let color: string

            if (mapMetric === "sales") {
                value = currentRegionSales[region] || 0
                // Color based on sales volume (higher is more intense)
                const intensity = Math.min(255, Math.floor((value / 10000000) * 255))
                color = `rgb(79, 70, ${255 - intensity})`
            } else if (mapMetric === "marketStrength") {
                value = regionMarketStrength[region] * 100
                // Color based on market strength (higher is more intense)
                const intensity = Math.floor(value * 2.55)
                color = `rgb(${255 - intensity}, ${intensity}, 100)`
            } else {
                // growth
                value = growthRates[region]
                // Color based on growth (red for negative, green for positive)
                color =
                    value >= 0
                        ? `rgb(0, ${Math.min(255, Math.floor(value * 5))}, 0)`
                        : `rgb(${Math.min(255, Math.floor(Math.abs(value) * 5))}, 0, 0)`
            }

            newMapData[region] = { color, value }
        })

        setMapData(newMapData)
    }, [mapMetric])

    // Format value based on metric type
    const formatValue = (value: number) => {
        if (mapMetric === "sales") {
            return `$${(value / 1000000).toFixed(1)}M`
        } else if (mapMetric === "marketStrength") {
            return `${value.toFixed(0)}%`
        } else {
            return `${value.toFixed(1)}%`
        }
    }

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Regional Overview</CardTitle>
                <CardDescription>Visualize key metrics across different regions</CardDescription>
                <Tabs defaultValue="sales" className="w-full" onValueChange={(value) => setMapMetric(value as any)}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="sales">Sales Revenue</TabsTrigger>
                        <TabsTrigger value="marketStrength">Market Strength</TabsTrigger>
                        <TabsTrigger value="growth">YoY Growth</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] sm:h-[350px] md:h-[400px] w-full relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                    {/* Simple map visualization */}
                    <div className="absolute inset-0 flex flex-wrap p-4">
                        {Object.entries(mapData).map(([region, data], index) => (
                            <div
                                key={region}
                                className="relative m-2 rounded-md overflow-hidden shadow-md transition-all hover:shadow-lg hover:scale-105"
                                style={{
                                    width: `calc(${100 / Math.ceil(Object.keys(mapData).length / (isMobile ? 1 : 2))}% - 16px)`,
                                    height: isMobile ? "30%" : "45%",
                                    backgroundColor: data.color,
                                }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center text-white p-2">
                                    <div className="font-bold text-center text-xs sm:text-sm">{region}</div>
                                    <div className="text-xs mt-1">{formatValue(data.value)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 p-2 rounded-md shadow-md text-xs">
                        <div className="font-semibold mb-1">
                            {mapMetric === "sales"
                                ? "Sales Revenue"
                                : mapMetric === "marketStrength"
                                    ? "Market Strength"
                                    : "Year-over-Year Growth"}
                        </div>
                        <div className="flex items-center gap-1">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor:
                                        mapMetric === "sales"
                                            ? "rgb(79, 70, 200)"
                                            : mapMetric === "marketStrength"
                                                ? "rgb(100, 200, 100)"
                                                : "rgb(0, 200, 0)",
                                }}
                            ></div>
                            <span>High</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor:
                                        mapMetric === "sales"
                                            ? "rgb(79, 70, 255)"
                                            : mapMetric === "marketStrength"
                                                ? "rgb(200, 100, 100)"
                                                : "rgb(200, 0, 0)",
                                }}
                            ></div>
                            <span>{mapMetric === "growth" ? "Low/Negative" : "Low"}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
