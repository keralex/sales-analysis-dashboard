"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateCustomerData } from "@/lib/mock-data"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CustomerAnalysis() {
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month")

  // Generate customer data
  const currentPeriodData = generateCustomerData(period, 0)
  const previousPeriodData = generateCustomerData(period, -1)

  // Aggregate data by date
  interface CustomerData {
    date: string
    newCustomers: number
    returningCustomers: number
    totalCustomers: number
  }

  const aggregateByDate = (data: CustomerData[]) => {
    const aggregated = data.reduce((acc: Record<string, CustomerData>, item) => {
      const date = item.date
      if (!acc[date]) {
        acc[date] = {
          date,
          newCustomers: 0,
          returningCustomers: 0,
          totalCustomers: 0,
        }
      }
      acc[date].newCustomers += item.newCustomers
      acc[date].returningCustomers += item.returningCustomers
      acc[date].totalCustomers = Math.max(acc[date].totalCustomers, item.totalCustomers)
      return acc
    }, {})

    return Object.values(aggregated).sort((a: CustomerData, b: CustomerData) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const currentAggregated = aggregateByDate(currentPeriodData)

  // Aggregate data by region
  interface RegionData {
    region: string
    newCustomers: number
    returningCustomers: number
    totalCustomers: number
  }

  const aggregateByRegion = (data: RegionData[]) => {
    const aggregated = data.reduce((acc: Record<string, RegionData>, item) => {
      const region = item.region
      if (!acc[region]) {
        acc[region] = {
          region: region,
          newCustomers: 0,
          returningCustomers: 0,
          totalCustomers: 0,
        }
      }
      acc[region].newCustomers += item.newCustomers
      acc[region].returningCustomers += item.returningCustomers
      acc[region].totalCustomers = Math.max(acc[region].totalCustomers, item.totalCustomers)
      return acc
    }, {})

    return Object.values(aggregated).sort((a: RegionData, b: RegionData) => b.totalCustomers - a.totalCustomers)
  }

  const regionData = aggregateByRegion(currentPeriodData)

  // Calculate KPIs
  const totalNewCustomers = currentPeriodData.reduce((sum, item) => sum + item.newCustomers, 0)
  const totalReturningCustomers = currentPeriodData.reduce((sum, item) => sum + item.returningCustomers, 0)
  const customerRetentionRate = (totalReturningCustomers / (totalNewCustomers + totalReturningCustomers)) * 100

  // Get the latest total customers value
  const latestTotalCustomers =
    currentAggregated.length > 0 ? currentAggregated[currentAggregated.length - 1].totalCustomers : 0

  // Calculate growth
  const prevTotalNewCustomers = previousPeriodData.reduce((sum, item) => sum + item.newCustomers, 0)
  const customerGrowth = prevTotalNewCustomers
    ? ((totalNewCustomers - prevTotalNewCustomers) / prevTotalNewCustomers) * 100
    : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestTotalCustomers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNewCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {customerGrowth > 0 ? "+" : ""}
              {customerGrowth.toFixed(1)}% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Returning Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReturningCustomers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerRetentionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="growth">Customer Growth</TabsTrigger>
          <TabsTrigger value="regions">Regional Distribution</TabsTrigger>
          <TabsTrigger value="retention">Retention Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Customer Growth Over Time</CardTitle>
                <CardDescription>New and returning customers over the selected period</CardDescription>
              </div>
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
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={currentAggregated}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "short" })
                    }
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [Number(value).toLocaleString(), undefined]}
                    labelFormatter={(date) =>
                      new Date(date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    }
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="totalCustomers"
                    name="Total Customers"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="newCustomers"
                    name="New Customers"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="returningCustomers"
                    name="Returning Customers"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Distribution by Region</CardTitle>
              <CardDescription>Total customers across different regions</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={regionData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [Number(value).toLocaleString(), undefined]} />
                  <Legend />
                  <Bar dataKey="totalCustomers" name="Total Customers" fill="#8884d8" />
                  <Bar dataKey="newCustomers" name="New Customers" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Customer Retention Trends</CardTitle>
                <CardDescription>New vs returning customers over time</CardDescription>
              </div>
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
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={currentAggregated}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "short" })
                    }
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [Number(value).toLocaleString(), undefined]}
                    labelFormatter={(date) =>
                      new Date(date).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="newCustomers"
                    name="New Customers"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="returningCustomers" name="Returning Customers" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
