import Layout from "@/layouts/Layout";
import Picture from "@/components/Picture";
import { Image } from "@/interface/Image";
import { GetImages } from "@/services/images";
import { useEffect, useState } from "react";
import SkeletonCards from "@/components/SkeletonCards";

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
                    <div className="w-full my-2 sm:columns-3 columns-2">
                        {
                            !isLoading || Images.length > 0 ? Images.map(image => (
                                <Picture key={image.id} alt={image.prompt} src={image.url} />
                            ))
                                :
                                <SkeletonCards numberOfCards={6} />
                        }
                    </div>
                </section>
            </Layout>
        </>
    )
}
