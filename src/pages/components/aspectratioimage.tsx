import type { NextPage } from "next";
import Image from "next/image";
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

const ApectRatioImage: NextPage<{ src: string, alt: string }> = ({ src, alt }) => {
    return (
        <div className="h-auto w-full mb-4 rounded-3xl overflow-hidden shadow-xl">
            <AspectRatioPrimitive.Root  ratio={16 / 9}>
                <Image 
                    className="object-cover h-full w-full"
                    src={src}
                    alt={alt}
                    height={300}
                    width={500}
                />
            </AspectRatioPrimitive.Root>
        </div>
    )
}

export default ApectRatioImage;