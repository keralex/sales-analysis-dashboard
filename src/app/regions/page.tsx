import RegionsList from "@/components/regions-list"
import RegionsMap from "@/components/regions-map"

export default function RegionsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Region Management</h1>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mb-6">
                <RegionsMap />
            </div>
            <RegionsList />
        </div>
    )
}