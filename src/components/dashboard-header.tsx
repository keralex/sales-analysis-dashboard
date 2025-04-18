"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Filter, ChevronDown, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  regions: string[]
  products: string[]
  selectedRegion: string
  selectedProduct: string
  comparisonPeriod: "month" | "quarter" | "year"
  onRegionChange: (region: string) => void
  onProductChange: (product: string) => void
  onPeriodChange: (period: "month" | "quarter" | "year") => void
}

export default function DashboardHeader({
  regions,
  products,
  selectedRegion,
  selectedProduct,
  comparisonPeriod,
  onRegionChange,
  onProductChange,
  onPeriodChange,
}: DashboardHeaderProps) {
  const [showFilters, setShowFilters] = useState(false)

  const periodLabels = {
    month: "Monthly",
    quarter: "Quarterly",
    year: "Yearly",
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="px-4 pb-3 md:px-6 pt-16 md:py-4  ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between ">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            StepMaster Shoes
          </h1>

          {/* Mobile filter toggle */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-between"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </span>
              {showFilters ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {/* Filters */}
          <div className={`flex flex-col gap-3 md:flex-row ${showFilters ? "block" : "hidden md:flex"}`}>
            {/* Period filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full md:w-auto justify-between">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{periodLabels[comparisonPeriod]}</span>
                  <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={comparisonPeriod}
                  onValueChange={(value) => onPeriodChange(value as "month" | "quarter" | "year")}
                >
                  <DropdownMenuRadioItem value="month">Monthly</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="quarter">Quarterly</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="year">Yearly</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Region filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full md:w-auto justify-between">
                  <span className="flex items-center truncate">
                    <Filter className="h-4 w-4 mr-2 shrink-0" />
                    {selectedRegion === "all" ? "All Regions" : selectedRegion}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={selectedRegion} onValueChange={onRegionChange}>
                  <DropdownMenuRadioItem value="all">All Regions</DropdownMenuRadioItem>
                  {regions.map((region) => (
                    <DropdownMenuRadioItem key={region} value={region}>
                      {region}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Product filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full md:w-auto justify-between">
                  <span className="flex items-center truncate">
                    <Filter className="h-4 w-4 mr-2 shrink-0" />
                    {selectedProduct === "all" ? "All Shoe Types" : selectedProduct}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={selectedProduct} onValueChange={onProductChange}>
                  <DropdownMenuRadioItem value="all">All Shoe Types</DropdownMenuRadioItem>
                  {products.map((product) => (
                    <DropdownMenuRadioItem key={product} value={product}>
                      {product}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
