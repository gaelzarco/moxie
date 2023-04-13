import type { NextPage } from "next";
import Image from "next/image";
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

const ApectRatioImage: NextPage<{ src: string, alt: string }> = ({ src, alt }) => {
    return (
        <div className="h-auto w-full min-w-full mb-4 rounded-3xl overflow-hidden shadow-lg">
            <AspectRatioPrimitive.Root  ratio={16 / 9}>
                <Image 
                    className="object-cover w-full h-full"
                    src={src}
                    alt={alt}
                    width={500}
                    height={300}
                />
            </AspectRatioPrimitive.Root>
        </div>
    )
}

export default ApectRatioImage;