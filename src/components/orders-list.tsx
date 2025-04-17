"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, Eye, Edit, Truck, AlertTriangle } from "lucide-react"
import { generateSalesData, regions, products } from "@/lib/mock-data"

// Generate mock orders from sales data
const generateOrders = () => {
    const salesData = generateSalesData("month", 0)
    const orders = []

    // Create a set to track unique combinations
    const uniqueCombos = new Set()

    // Group sales data into orders
    for (const sale of salesData) {
        const key = `${sale.date}-${sale.region}-${sale.product}`
        if (!uniqueCombos.has(key)) {
            uniqueCombos.add(key)

            // Generate a random order ID
            const orderId = `ORD-${Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}`

            // Generate a random customer name
            const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emma", "Robert", "Lisa", "James", "Emily"]
            const lastNames = [
                "Smith",
                "Johnson",
                "Williams",
                "Brown",
                "Jones",
                "Miller",
                "Davis",
                "Garcia",
                "Rodriguez",
                "Wilson",
            ]
            const customerName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`

            // Generate a random status
            const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"]
            const statusWeights = [0.15, 0.2, 0.3, 0.25, 0.05, 0.05] // Weights to make some statuses more common
            let statusIndex = 0
            const r = Math.random()
            let sum = 0
            for (let i = 0; i < statusWeights.length; i++) {
                sum += statusWeights[i]
                if (r <= sum) {
                    statusIndex = i
                    break
                }
            }
            const status = statuses[statusIndex]

            // Generate a random payment method
            const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Cash on Delivery"]
            const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)]

            // Calculate a random shipping cost
            const shippingCost = Math.floor(Math.random() * 20) + 5

            // Create the order
            orders.push({
                id: orderId,
                date: sale.date,
                customer: customerName,
                region: sale.region,
                product: sale.product,
                quantity: sale.units,
                total: sale.sales,
                status,
                paymentMethod,
                shippingCost,
                notes: "",
            })

            // Limit to a reasonable number of orders
            if (orders.length >= 100) break
        }
    }

    // Sort by date, most recent first
    return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function OrdersList() {
    const [orders, setOrders] = useState(generateOrders())
    const [filteredOrders, setFilteredOrders] = useState(orders)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [regionFilter, setRegionFilter] = useState("all")
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    // Filter orders based on search term and filters
    const filterOrders = () => {
        let result = orders

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            result = result.filter(
                (order) =>
                    order.id.toLowerCase().includes(term) ||
                    order.customer.toLowerCase().includes(term) ||
                    order.product.toLowerCase().includes(term),
            )
        }

        // Apply status filter
        if (statusFilter !== "all") {
            result = result.filter((order) => order.status === statusFilter)
        }

        // Apply region filter
        if (regionFilter !== "all") {
            result = result.filter((order) => order.region === regionFilter)
        }

        setFilteredOrders(result)
    }

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setTimeout(filterOrders, 300)
    }

    // Handle status filter change
    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value)
        setTimeout(filterOrders, 300)
    }

    // Handle region filter change
    const handleRegionFilterChange = (value: string) => {
        setRegionFilter(value)
        setTimeout(filterOrders, 300)
    }

    // View order details
    const handleViewOrder = (order: any) => {
        setSelectedOrder(order)
        setIsViewDialogOpen(true)
    }

    // Edit order
    const handleEditOrder = (order: any) => {
        setSelectedOrder({ ...order })
        setIsEditDialogOpen(true)
    }

    // Save edited order
    const handleSaveOrder = () => {
        if (selectedOrder) {
            setOrders(orders.map((order) => (order.id === selectedOrder.id ? selectedOrder : order)))
            setFilteredOrders(filteredOrders.map((order) => (order.id === selectedOrder.id ? selectedOrder : order)))
            setIsEditDialogOpen(false)
        }
    }

    // Get badge color based on status
    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "Processing":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "Shipped":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            case "Delivered":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "Cancelled":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            case "Returned":
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <CardTitle>Orders</CardTitle>
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search orders..."
                            className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                        <SelectTrigger className="w-full md:w-[150px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                            <SelectItem value="Returned">Returned</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={regionFilter} onValueChange={handleRegionFilterChange}>
                        <SelectTrigger className="w-full md:w-[150px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Region" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Regions</SelectItem>
                            {regions.map((region) => (
                                <SelectItem key={region} value={region}>
                                    {region}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden md:table-cell">Product</TableHead>
                                <TableHead className="hidden lg:table-cell">Region</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-4">
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell className="hidden md:table-cell">{order.product}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{order.region}</TableCell>
                                        <TableCell>${order.total.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge className={getStatusBadgeColor(order.status)}>{order.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                                                        <Eye className="mr-2 h-4 w-4" /> View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                                                        <Edit className="mr-2 h-4 w-4" /> Edit Order
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Truck className="mr-2 h-4 w-4" /> Update Shipping
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">
                                                        <AlertTriangle className="mr-2 h-4 w-4" /> Mark as Problem
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* View Order Dialog */}
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>Complete information about order {selectedOrder?.id}</DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-sm">Order Information</h3>
                                        <div className="mt-2 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Order ID:</span>
                                                <span>{selectedOrder.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Date:</span>
                                                <span>{new Date(selectedOrder.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Status:</span>
                                                <Badge className={getStatusBadgeColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Payment Method:</span>
                                                <span>{selectedOrder.paymentMethod}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Customer Information</h3>
                                        <div className="mt-2 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Name:</span>
                                                <span>{selectedOrder.customer}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Region:</span>
                                                <span>{selectedOrder.region}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold text-sm">Order Items</h3>
                                    <div className="mt-2 rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Product</TableHead>
                                                    <TableHead className="text-right">Quantity</TableHead>
                                                    <TableHead className="text-right">Price</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{selectedOrder.product}</TableCell>
                                                    <TableCell className="text-right">{selectedOrder.quantity}</TableCell>
                                                    <TableCell className="text-right">
                                                        ${(selectedOrder.total - selectedOrder.shippingCost).toLocaleString()}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <span className="text-muted-foreground">Shipping Cost:</span>
                                    </div>
                                    <div>${selectedOrder.shippingCost.toLocaleString()}</div>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <div>Total:</div>
                                    <div>${selectedOrder.total.toLocaleString()}</div>
                                </div>
                                {selectedOrder.notes && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-sm">Notes</h3>
                                        <p className="mt-1 text-sm">{selectedOrder.notes}</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsViewDialogOpen(false)
                                    handleEditOrder(selectedOrder)
                                }}
                            >
                                Edit Order
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Order Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Edit Order</DialogTitle>
                            <DialogDescription>Make changes to order {selectedOrder?.id}</DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="customer">Customer Name</Label>
                                        <Input
                                            id="customer"
                                            value={selectedOrder.customer}
                                            onChange={(e) => setSelectedOrder({ ...selectedOrder, customer: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={selectedOrder.status}
                                            onValueChange={(value) => setSelectedOrder({ ...selectedOrder, status: value })}
                                        >
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Processing">Processing</SelectItem>
                                                <SelectItem value="Shipped">Shipped</SelectItem>
                                                <SelectItem value="Delivered">Delivered</SelectItem>
                                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                <SelectItem value="Returned">Returned</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="product">Product</Label>
                                        <Select
                                            value={selectedOrder.product}
                                            onValueChange={(value) => setSelectedOrder({ ...selectedOrder, product: value })}
                                        >
                                            <SelectTrigger id="product">
                                                <SelectValue placeholder="Select product" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem key={product} value={product}>
                                                        {product}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="region">Region</Label>
                                        <Select
                                            value={selectedOrder.region}
                                            onValueChange={(value) => setSelectedOrder({ ...selectedOrder, region: value })}
                                        >
                                            <SelectTrigger id="region">
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
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="quantity">Quantity</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            value={selectedOrder.quantity}
                                            onChange={(e) =>
                                                setSelectedOrder({ ...selectedOrder, quantity: Number.parseInt(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="shipping">Shipping Cost</Label>
                                        <Input
                                            id="shipping"
                                            type="number"
                                            value={selectedOrder.shippingCost}
                                            onChange={(e) =>
                                                setSelectedOrder({ ...selectedOrder, shippingCost: Number.parseInt(e.target.value) })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Input
                                        id="notes"
                                        value={selectedOrder.notes}
                                        onChange={(e) => setSelectedOrder({ ...selectedOrder, notes: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveOrder}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}
