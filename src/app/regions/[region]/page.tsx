import RegionPerformance from "@/components/region-performance"

export default function RegionDetailPage({ params }: { params: { region: string } }) {
    // Decode the region name from the URL
    const regionName = decodeURIComponent(params.region)

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{regionName} Performance</h1>
            <RegionPerformance />
        </div>
    )
}
