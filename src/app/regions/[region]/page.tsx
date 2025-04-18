import RegionPerformance from "@/components/region-performance"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function RegionDetailPage(params: any) {
    const regionName = decodeURIComponent(params.region)
    return (
        <div className="flex flex-col h-full">
            <header className="bg-white dark:bg-gray-800 shadow-sm p-4 md:p-6">
                <h1 className="text-2xl font-bold">{regionName} Performance</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <RegionPerformance initialRegion={regionName} />
            </main>
        </div>
    )
}
