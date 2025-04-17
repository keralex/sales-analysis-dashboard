"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SalesData } from "../lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ProductPerformanceProps {
  data: SalesData[]
  selectedProduct: string
}

export default function ProductPerformance({ data, selectedProduct }: ProductPerformanceProps) {
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
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={productData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#4f46e5" />
            <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" />
            <Tooltip
              formatter={(value, name) => {
                if (name === "sales") return [`$${Number(value).toLocaleString()}`, "Revenue"]
                if (name === "orders") return [Number(value).toLocaleString(), "Orders"]
                if (name === "units") return [Number(value).toLocaleString(), "Pairs Sold"]
                return [value, name]
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="sales" name="Revenue ($)" fill="#4f46e5" />
            <Bar yAxisId="right" dataKey="units" name="Pairs Sold" fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
