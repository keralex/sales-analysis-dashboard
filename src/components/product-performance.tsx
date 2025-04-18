"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SalesData } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ProductPerformanceProps {
  data: SalesData[]
  selectedProduct: string
}

export default function ProductPerformance({ data }: ProductPerformanceProps) {
  // Aggregate data by product
  const aggregateByProduct = (data: SalesData[]) => {
    const aggregated = data.reduce(
      (acc, item) => {
        if (!acc[item.product]) {
          acc[item.product] = {
            name: item.product,
            sales: 0,
            orders: 0,
            units: 0,
          }
        }
        acc[item.product].sales += item.sales
        acc[item.product].orders += item.orders
        acc[item.product].units += item.units
        return acc
      },
      {} as Record<
        string,
        {
          name: string
          sales: number
          orders: number
          units: number
        }
      >,
    )

    return Object.values(aggregated).sort((a, b) => b.sales - a.sales)
  }

  const productData = aggregateByProduct(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shoe Type Performance</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-96">
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
            <Tooltip
              formatter={(value, name) => {
                if (name === "sales") return [`${Number(value).toLocaleString()}`, "Revenue"]
                if (name === "orders") return [Number(value).toLocaleString(), "Orders"]
                if (name === "units") return [Number(value).toLocaleString(), "Pairs Sold"]
                return [value, name]
              }}
              contentStyle={{ fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="sales" name="Revenue ($)" fill="#4f46e5" />
            <Bar dataKey="units" name="Pairs Sold" fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
