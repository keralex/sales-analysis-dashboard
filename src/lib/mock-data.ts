// Define regions and products for filtering
export const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East", "Africa"]

// Shoe company specific products
export const products = [
  "Running Shoes",
  "Casual Sneakers",
  "Athletic Trainers",
  "Hiking Boots",
  "Dress Shoes",
  "Sandals",
  "Basketball Shoes",
]

// Product details for more realistic data
export const productDetails = {
  "Running Shoes": { basePrice: 120, popularity: 0.9, id: "prod_001", stock: 450, color: "Blue/White" },
  "Casual Sneakers": { basePrice: 85, popularity: 1.0, id: "prod_002", stock: 680, color: "Black/Gray" },
  "Athletic Trainers": { basePrice: 110, popularity: 0.8, id: "prod_003", stock: 320, color: "Red/Black" },
  "Hiking Boots": { basePrice: 150, popularity: 0.6, id: "prod_004", stock: 210, color: "Brown" },
  "Dress Shoes": { basePrice: 130, popularity: 0.7, id: "prod_005", stock: 180, color: "Black" },
  Sandals: { basePrice: 65, popularity: 0.75, id: "prod_006", stock: 520, color: "Tan" },
  "Basketball Shoes": { basePrice: 140, popularity: 0.85, id: "prod_007", stock: 290, color: "White/Red" },
}

// Regional market strength
export const regionMarketStrength = {
  "North America": 1.0,
  Europe: 0.9,
  "Asia Pacific": 0.95,
  "Latin America": 0.7,
  "Middle East": 0.8,
  Africa: 0.6,
}

// Seasonal factors (by month)
export const seasonalFactors = {
  0: 0.8, // January
  1: 0.85, // February
  2: 0.9, // March
  3: 1.0, // April
  4: 1.1, // May
  5: 1.2, // June
  6: 1.15, // July
  7: 1.1, // August
  8: 1.0, // September
  9: 0.9, // October
  10: 0.95, // November
  11: 1.3, // December (holiday season)
}

export interface SalesData {
  date: string
  region: string
  product: string
  sales: number
  orders: number
  units: number
}

export interface CustomerData {
  date: string
  newCustomers: number
  returningCustomers: number
  totalCustomers: number
  region: string
}

// Function to generate dates for a given period
function generateDates(period: "month" | "quarter" | "year", offset = 0): string[] {
  const dates: string[] = []
  const today = new Date()

  let startDate: Date
  let endDate: Date = new Date()

  if (period === "month") {
    startDate = new Date(today.getFullYear(), today.getMonth() + offset, 1)
    endDate = new Date(today.getFullYear(), today.getMonth() + offset + 1, 0)
  } else if (period === "quarter") {
    const currentQuarter = Math.floor(today.getMonth() / 3)
    startDate = new Date(today.getFullYear(), (currentQuarter + offset) * 3, 1)
    endDate = new Date(today.getFullYear(), (currentQuarter + offset + 1) * 3, 0)
  } else {
    // year
    startDate = new Date(today.getFullYear() + offset, 0, 1)
    endDate = new Date(today.getFullYear() + offset, 11, 31)
  }

  // Generate dates in the range
  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0])
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

// Function to generate realistic shoe sales data
export function generateSalesData(period: "month" | "quarter" | "year", offset = 0): SalesData[] {
  const dates = generateDates(period, offset)
  const data: SalesData[] = []

  // Generate data for each date, region, and product
  for (const date of dates) {
    const dateObj = new Date(date)
    const month = dateObj.getMonth()
    const seasonalFactor = seasonalFactors[month as keyof typeof seasonalFactors]

    for (const region of regions) {
      const regionStrength = regionMarketStrength[region as keyof typeof regionMarketStrength]

      for (const product of products) {
        const { basePrice, popularity } = productDetails[product as keyof typeof productDetails]

        // Base values with some randomness and factors
        const baseOrders = Math.floor((Math.random() * 20 + 10) * popularity * regionStrength * seasonalFactor)
        const unitsPerOrder = Math.floor(Math.random() * 2) + 1
        const baseUnits = baseOrders * unitsPerOrder

        // Add some daily variation
        const dailyVariation = 0.8 + Math.random() * 0.4

        // Calculate final values
        const orders = Math.floor(baseOrders * dailyVariation)
        const units = Math.floor(baseUnits * dailyVariation)
        const priceVariation = 0.95 + Math.random() * 0.1
        const sales = Math.floor(units * basePrice * priceVariation)

        data.push({
          date,
          region,
          product,
          sales,
          orders,
          units,
        })
      }
    }
  }

  return data
}

// Function to generate customer data
export function generateCustomerData(period: "month" | "quarter" | "year", offset = 0): CustomerData[] {
  const dates = generateDates(period, offset)
  const data: CustomerData[] = []

  // Base values for customer growth
  const baseNewCustomersPerDay = 15
  const baseReturningRatio = 0.4

  // Running total of customers
  let runningTotalCustomers = 5000 + offset * -1000 // Start with fewer customers in the past

  // Generate data for each date and region
  for (const date of dates) {
    const dateObj = new Date(date)
    const month = dateObj.getMonth()
    const seasonalFactor = seasonalFactors[month as keyof typeof seasonalFactors]

    for (const region of regions) {
      const regionStrength = regionMarketStrength[region as keyof typeof regionMarketStrength]

      // Calculate new customers with seasonal and regional factors
      const newCustomersBase = baseNewCustomersPerDay * seasonalFactor * regionStrength
      const dailyVariation = 0.7 + Math.random() * 0.6
      const newCustomers = Math.floor(newCustomersBase * dailyVariation)

      // Calculate returning customers
      const returningRatio = baseReturningRatio + (Math.random() * 0.2 - 0.1) // Vary between 0.3 and 0.5
      const returningCustomers = Math.floor(newCustomers * returningRatio * (1 + offset * -0.1))

      // Update running total
      runningTotalCustomers += newCustomers

      data.push({
        date,
        newCustomers,
        returningCustomers,
        totalCustomers: Math.floor((runningTotalCustomers * regionStrength) / regions.length),
        region,
      })
    }
  }

  return data
}
