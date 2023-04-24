import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { Jelly } from "@uiball/loaders";

const ApectRatioImage: NextPage<{ src: string, alt: string }> = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true)

    const handleImageLoad = () => {
        setIsLoading(false);
      }

    return (
        <div className="h-auto w-full mb-4 rounded-3xl overflow-hidden shadow-xl">
            <AspectRatioPrimitive.Root  ratio={16 / 9}>
                {isLoading &&  (
                    <div className="h-full w-full flex items-center justify-center content-center">
                        <Jelly color="white" size={15} />
                    </div>
                )}
                <Image 
                    className="object-cover h-full w-full"
                    src={src}
                    alt={alt}
                    height={300}
                    width={500}
                    onLoad={handleImageLoad}
                />
            </AspectRatioPrimitive.Root>
        </div>
    )
}

export default ApectRatioImage;