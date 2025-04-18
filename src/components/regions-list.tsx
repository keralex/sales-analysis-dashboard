"use client"

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
import { Plus, Edit, Trash2 } from "lucide-react"
import { regionMarketStrength } from "@/lib/mock-data"
import { generateSalesData } from "@/lib/mock-data"

interface Region {
    name: string
    marketStrength: number
    population: number
    gdp: number
    salesTarget: number
    id: string
}

export default function RegionsList() {
    // Initialize regions from the mock data
    const [regions, setRegions] = useState<Region[]>(
        Object.entries(regionMarketStrength).map(([name, strength]) => ({
            name,
            marketStrength: strength,
            // Generate some realistic data for each region
            population: Math.floor(Math.random() * 500 + 10) * 1000000, // 10-500 million
            gdp: Math.floor(Math.random() * 50 + 5) * 10, // $50-500 billion
            salesTarget: Math.floor(Math.random() * 100 + 20) * 1000000, // $20-100 million
            id: `reg_${name.toLowerCase().replace(/\s+/g, "_")}`,
        })),
    )

    const [editingRegion, setEditingRegion] = useState<Region | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Get current period sales data for metrics
    const currentPeriodData = generateSalesData("year", 0)

    // Calculate total sales by region
    const regionSales = regions.reduce(
        (acc, region) => {
            const sales = currentPeriodData
                .filter((item) => item.region === region.name)
                .reduce((sum, item) => sum + item.sales, 0)
            acc[region.name] = sales
            return acc
        },
        {} as Record<string, number>,
    )

    const handleAddRegion = () => {
        setEditingRegion({
            name: "",
            marketStrength: 0.7,
            population: 50000000,
            gdp: 200,
            salesTarget: 50000000,
            id: `reg_${Math.floor(Math.random() * 1000)}`,
        })
        setIsDialogOpen(true)
    }

    const handleEditRegion = (region: Region) => {
        setEditingRegion({ ...region })
        setIsDialogOpen(true)
    }

    const handleSaveRegion = () => {
        if (editingRegion) {
            const isNewRegion = !regions.some((r) => r.id === editingRegion.id)

            if (isNewRegion) {
                setRegions([...regions, editingRegion])
            } else {
                setRegions(regions.map((r) => (r.id === editingRegion.id ? editingRegion : r)))
            }

            setIsDialogOpen(false)
            setEditingRegion(null)
        }
    }

    const handleDeleteRegion = (regionId: string) => {
        setRegions(regions.filter((r) => r.id !== regionId))
    }

    // Calculate sales target achievement percentage
    const getSalesTargetAchievement = (regionName: string) => {
        const sales = regionSales[regionName] || 0
        const region = regions.find((r) => r.name === regionName)
        if (!region) return 0
        return (sales / region.salesTarget) * 100
    }

    return (
        <Card>
            <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <CardTitle>Region Management</CardTitle>
                <Button onClick={handleAddRegion} className="flex items-center gap-1 w-full sm:w-auto">
                    <Plus className="h-4 w-4" /> Add Region
                </Button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Region Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Market Strength</TableHead>
                                <TableHead className="hidden md:table-cell">Population</TableHead>
                                <TableHead className="hidden md:table-cell">GDP (Billion $)</TableHead>
                                <TableHead className="hidden lg:table-cell">Sales Target</TableHead>
                                <TableHead>Current Sales</TableHead>
                                <TableHead>Target Achievement</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {regions.map((region) => (
                                <TableRow key={region.id}>
                                    <TableCell className="font-medium">{region.name}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{(region.marketStrength * 100).toFixed(0)}%</TableCell>
                                    <TableCell className="hidden md:table-cell">{(region.population / 1000000).toFixed(1)}M</TableCell>
                                    <TableCell className="hidden md:table-cell">${region.gdp.toFixed(0)}B</TableCell>
                                    <TableCell className="hidden lg:table-cell">${(region.salesTarget / 1000000).toFixed(1)}M</TableCell>
                                    <TableCell>${((regionSales[region.name] || 0) / 1000000).toFixed(1)}M</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div
                                                className={`h-2 w-full rounded-full ${getSalesTargetAchievement(region.name) >= 100
                                                        ? "bg-green-500"
                                                        : getSalesTargetAchievement(region.name) >= 75
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                    }`}
                                            >
                                                <div
                                                    className="h-full rounded-full bg-primary"
                                                    style={{
                                                        width: `${Math.min(getSalesTargetAchievement(region.name), 100)}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="ml-2 text-xs sm:text-sm">
                                                {getSalesTargetAchievement(region.name).toFixed(0)}%
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="icon" onClick={() => handleEditRegion(region)}>
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button variant="outline" size="icon" onClick={() => handleDeleteRegion(region.id)}>
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingRegion && editingRegion.name ? "Edit Region" : "Add New Region"}</DialogTitle>
                            <DialogDescription>
                                Make changes to the region details here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>

                        {editingRegion && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Region Name</Label>
                                    <Input
                                        id="name"
                                        value={editingRegion.name}
                                        onChange={(e) => setEditingRegion({ ...editingRegion, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="marketStrength">Market Strength (0-100%)</Label>
                                        <Input
                                            id="marketStrength"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={(editingRegion.marketStrength * 100).toFixed(0)}
                                            onChange={(e) =>
                                                setEditingRegion({
                                                    ...editingRegion,
                                                    marketStrength: Number(e.target.value) / 100,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="population">Population (millions)</Label>
                                        <Input
                                            id="population"
                                            type="number"
                                            value={(editingRegion.population / 1000000).toFixed(1)}
                                            onChange={(e) =>
                                                setEditingRegion({
                                                    ...editingRegion,
                                                    population: Number(e.target.value) * 1000000,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="gdp">GDP (Billion $)</Label>
                                        <Input
                                            id="gdp"
                                            type="number"
                                            value={editingRegion.gdp}
                                            onChange={(e) => setEditingRegion({ ...editingRegion, gdp: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="salesTarget">Sales Target (millions $)</Label>
                                        <Input
                                            id="salesTarget"
                                            type="number"
                                            value={(editingRegion.salesTarget / 1000000).toFixed(1)}
                                            onChange={(e) =>
                                                setEditingRegion({
                                                    ...editingRegion,
                                                    salesTarget: Number(e.target.value) * 1000000,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter className="flex flex-col sm:flex-row gap-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                                Cancel
                            </Button>
                            <Button onClick={handleSaveRegion} className="w-full sm:w-auto">
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}
