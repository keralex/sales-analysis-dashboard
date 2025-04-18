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
import { productDetails } from "../lib/mock-data"

export default function ProductsList() {
  const [products, setProducts] = useState(
    Object.entries(productDetails).map(([name, details]) => ({
      name,
      ...details,
    })),
  )

  interface Product {
    name: string
    basePrice: number
    popularity: number
    id: string
    stock: number
    color: string
  }

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddProduct = () => {
    setEditingProduct({
      name: "",
      basePrice: 0,
      popularity: 0.5,
      id: `prod_${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      stock: 0,
      color: "",
    })
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product })
    setIsDialogOpen(true)
  }

  const handleSaveProduct = () => {
    if (editingProduct) {
      const isNewProduct = !products.some((p) => p.id === editingProduct.id)

      if (isNewProduct) {
        setProducts([...products, editingProduct])
      } else {
        setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
      }

      setIsDialogOpen(false)
      setEditingProduct(null)
    }
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Product Management</CardTitle>
        <Button onClick={handleAddProduct} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Popularity</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>${product.basePrice}</TableCell>
                <TableCell>{(product.popularity * 100).toFixed(0)}%</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct && editingProduct.name ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                Make changes to the product details here. Click save when you&#39;re done.
              </DialogDescription>
            </DialogHeader>

            {editingProduct && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={editingProduct.basePrice}
                      onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: Number(e.target.value) })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="popularity">Popularity (0-100%)</Label>
                    <Input
                      id="popularity"
                      type="number"
                      min="0"
                      max="100"
                      value={(editingProduct.popularity * 100).toFixed(0)}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          popularity: Number(e.target.value) / 100,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={editingProduct.color}
                      onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProduct}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
