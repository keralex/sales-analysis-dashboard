"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SalesData } from "@/lib/mock-data"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface RegionalSalesProps {
  data: SalesData[]
  selectedRegion: string
}

export default function RegionalSales({ data }: RegionalSalesProps) {
  const aggregateByRegion = (data: SalesData[]) => {
    const aggregated = data.reduce(
      (acc, item) => {
        if (!acc[item.region]) {
          acc[item.region] = { name: item.region, value: 0 }
        }
        acc[item.region].value += item.sales
        return acc
      },
      {} as Record<string, { name: string; value: number }>,
    )

    return Object.values(aggregated).sort((a, b) => b.value - a.value)
  }

  const regionalData = aggregateByRegion(data)

  // Colors for the pie chart
  const COLORS = ["#4f46e5", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#84cc16", "#10b981"]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Regional Revenue Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={regionalData}
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
              {regionalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${Number(value).toLocaleString()}`, "Revenue"]} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
