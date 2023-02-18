import Layout from "@/layouts/Layout";
import { Image } from "@/interface/Image";
import { GetImages } from "@/services/images";
import { useEffect, useState, lazy, Suspense } from "react";
import SkeletonCards from "@/components/SkeletonCards";
import Card from "@/components/Card";
import Columns from "@/components/Columns";

const Picture = lazy(() => import('@/components/Picture'))

export default function Showcase() {
    const [Images, setImages] = useState<Image[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        GetImages().then(setImages).finally(() => setIsLoading(false))
    }, [])

    return (
        <>
            <Layout title="Showcase">
                <section >
                    <Card>
                        <h1>Showcase</h1>
                    </Card>
                    <Columns>
                        <>
                            {
                                !isLoading || Images.length > 0 ? Images.map(image => (
                                    <Suspense key={image.id}>
                                        <Picture alt={image.prompt} src={image.url} />
                                    </Suspense>
                                ))
                                    :
                                    <SkeletonCards numberOfCards={6} />
                            }
                        </>
                    </Columns>
                </section>
            </Layout>
        </>
    )
}
