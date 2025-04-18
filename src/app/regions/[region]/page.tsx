import RegionPerformance from "@/components/region-performance"
import { AppProps } from 'next/app'

interface RegionDetailPageProps {
    params: {
        region: string
    }
}

export default function RegionDetailPage({ params, pageProps }: RegionDetailPageProps & AppProps) {
    // Decode the region name from the URL
    const regionName = decodeURIComponent(params.region)

    return (
        <div className="flex flex-col h-full">
            <header className="bg-white dark:bg-gray-800 shadow-sm p-4 md:p-6">
                <h1 className="text-2xl font-bold">{regionName} Performance</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <RegionPerformance initialRegion={regionName} {...pageProps} />
            </main>
        </div>
    )
}
