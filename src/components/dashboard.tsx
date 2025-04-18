"use client"

import { useState, useEffect } from "react"
import DashboardHeader from "./dashboard-header"
import DashboardSidebar from "./dashboard-sidebar"
import KpiCards from "./kpi-cards"
import SalesChart from "./sales-chart"
import RegionalSales from "./regional-sales"
import ProductPerformance from "./product-performance"
import { regions, products, generateSalesData } from "@/lib/mock-data"

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [selectedProduct, setSelectedProduct] = useState<string>("all")
  const [comparisonPeriod, setComparisonPeriod] = useState<"month" | "quarter" | "year">("month")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile and listen for sidebar collapse state changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleSidebarChange = () => {
      // Check if sidebar is collapsed by checking its width
      const sidebar = document.querySelector("aside")
      if (sidebar) {
        const sidebarWidth = sidebar.getBoundingClientRect().width
        setSidebarCollapsed(sidebarWidth < 100)
      }
    }

    // Initial checks
    checkMobile()
    handleSidebarChange()

    // Set up event listeners
    window.addEventListener("resize", checkMobile)

    // Set up a MutationObserver to watch for changes to the sidebar
    const observer = new MutationObserver(handleSidebarChange)
    const sidebar = document.querySelector("aside")

    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] })
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      observer.disconnect()
    }
  }, [])

  // Generate mock data
  const currentPeriodData = generateSalesData(comparisonPeriod, 0)
  const previousPeriodData = generateSalesData(comparisonPeriod, -1)

  // Filter data based on selections
  const filteredCurrentData = currentPeriodData.filter(
    (item) =>
      (selectedRegion === "all" || item.region === selectedRegion) &&
      (selectedProduct === "all" || item.product === selectedProduct),
  )

  const filteredPreviousData = previousPeriodData.filter(
    (item) =>
      (selectedRegion === "all" || item.region === selectedRegion) &&
      (selectedProduct === "all" || item.product === selectedProduct),
  )

  // Calculate KPIs
  const currentTotalSales = filteredCurrentData.reduce((sum, item) => sum + item.sales, 0)
  const previousTotalSales = filteredPreviousData.reduce((sum, item) => sum + item.sales, 0)
  const salesGrowth = previousTotalSales ? ((currentTotalSales - previousTotalSales) / previousTotalSales) * 100 : 0

  const currentTotalOrders = filteredCurrentData.reduce((sum, item) => sum + item.orders, 0)
  const previousTotalOrders = filteredPreviousData.reduce((sum, item) => sum + item.orders, 0)
  const ordersGrowth = previousTotalOrders
    ? ((currentTotalOrders - previousTotalOrders) / previousTotalOrders) * 100
    : 0

  const currentTotalUnits = filteredCurrentData.reduce((sum, item) => sum + item.units, 0)
  const previousTotalUnits = filteredPreviousData.reduce((sum, item) => sum + item.units, 0)
  const unitsGrowth = previousTotalUnits ? ((currentTotalUnits - previousTotalUnits) / previousTotalUnits) * 100 : 0

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div
        className="flex flex-col flex-1 overflow-hidden transition-all duration-200 w-full md:w-auto"
        style={{
          marginLeft: isMobile ? "0" : sidebarCollapsed ? "5rem" : "16rem",
          width: isMobile ? "100%" : sidebarCollapsed ? "calc(100% - 5rem)" : "calc(100% - 16rem)",
        }}
      >
        <DashboardHeader
          regions={regions}
          products={products}
          selectedRegion={selectedRegion}
          selectedProduct={selectedProduct}
          comparisonPeriod={comparisonPeriod}
          onRegionChange={setSelectedRegion}
          onProductChange={setSelectedProduct}
          onPeriodChange={setComparisonPeriod}
        />
        <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6">
          <KpiCards
            totalSales={currentTotalSales}
            salesGrowth={salesGrowth}
            totalOrders={currentTotalOrders}
            ordersGrowth={ordersGrowth}
            totalUnits={currentTotalUnits}
            unitsGrowth={unitsGrowth}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
            <SalesChart
              currentData={filteredCurrentData}
              previousData={filteredPreviousData}
              period={comparisonPeriod}
            />
            <RegionalSales data={filteredCurrentData} selectedRegion={selectedRegion} />
          </div>
          <div className="mt-4 md:mt-6">
            <ProductPerformance data={filteredCurrentData} selectedProduct={selectedProduct} />
          </div>
        </main>
      </div>
    </div>
  )
}
