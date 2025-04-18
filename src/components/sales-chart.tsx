"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SalesData } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface SalesChartProps {
  currentData: SalesData[]
  previousData: SalesData[]
  period: "month" | "quarter" | "year"
}

export default function SalesChart({ currentData, previousData, period }: SalesChartProps) {
  // Aggregate data by date
  const aggregateByDate = (data: SalesData[]) => {
    const aggregated = data.reduce(
      (acc, item) => {
        const date = item.date
        if (!acc[date]) {
          acc[date] = { date, sales: 0 }
        }
        acc[date].sales += item.sales
        return acc
      },
      {} as Record<string, { date: string; sales: number }>,
    )

    return Object.values(aggregated).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const currentAggregated = aggregateByDate(currentData)
  const previousAggregated = aggregateByDate(previousData)

  // Combine data for chart
  const chartData = currentAggregated.map((current) => {
    const previous = previousAggregated.find((p) => new Date(p.date).getDate() === new Date(current.date).getDate())

    return {
      date: current.date,
      current: current.sales,
      previous: previous ? previous.sales : 0,
    }
  })

  const periodLabel = {
    month: "Monthly",
    quarter: "Quarterly",
    year: "Yearly",
  }[period]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{periodLabel} Revenue Comparison</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
              tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "short" })}
              tick={{ fontSize: 12 }}
              minTickGap={15}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${Number(value).toLocaleString()}`, undefined]}
              labelFormatter={(date) =>
                new Date(date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
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
  )
}
