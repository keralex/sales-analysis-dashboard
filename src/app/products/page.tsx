import ProductsList from "@/components/products-list"

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <ProductsList />
    </div>
  )
}
