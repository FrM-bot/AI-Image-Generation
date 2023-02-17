import Layout from "@/layouts/Layout";
import Picture from "@/components/Picture";
import useImageMaximized from "@/components/useImageMaximized";
import { Image } from "@/interface/Image";
import { GetImages } from "@/services/images";
import Config from "@/components/Config";
import { useEffect, useState } from "react";

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
                                [1, 2, 4, 9, 5, 8].map((index) => (
                                    <div key={index} role="status" className="rounded inline-block shadow max-w-2xl w-full h-[40vh] animate-pulse mt-3">
                                        <div className="flex items-center bg-white justify-center h-full mb-4 rounded dark:bg-custom-dark border-[3px] dark:border-zinc-800">
                                            <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </section>
            </Layout>
        </>
    )
}
