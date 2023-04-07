import type { NextPage } from "next";

const Loading: NextPage<{ home?: true }> = ({ home }) => {
    
    return (
        <div className="text-left w-full min-w-full">
            {!home && (
                <div className="sticky top-0 backdrop-blur-lg p-4 w-full border-b dark:border-stone-700 z-10">
                    <div className="w-40 h-10 rounded-full animate-pulse bg-neutral-700">
                    </div>
                </div>
            )}
            {[...Array(20).keys()].map((i) => (
                <div className="flex leading-none mt-5 p-5" key={i}>
                    <div className=" bg-neutral-700 rounded-full w-11 h-10 animate-pulse"
                    ></div>
                    <div className="pl-2 mb-1 w-full">
                        <div className="inline-flex justify-between mb-6 w-full ">

                            <div className="pl-2 h-5 w-52 animate-pulse bg-neutral-700 rounded-full"
                            ></div>
                            <div className="h-5 pl-2 w-24 bg-neutral-700 animate-pulse rounded-full"
                            ></div>

                    </div>
                    <div className="pl-2 mb-6 h-5 rounded-full w-full animate-pulse bg-neutral-700"
                    ></div>
                    <div className="h-auto w-full min-w-full mb-4 h-5 rounded-3xl bg-neutral-700 animate-pulse"
                    > </div>

                    <div className="mt-1 inline-flex w-full">
                        <div className="inline-flex w-1/2 h-5 justify-between">
                            <div className="inline-flex h-5 w-20 animate-pulse bg-neutral-700 rounded-full"
                            ></div>
                            <div className="ml- 20 w-20 h-5 animate-pulse bg-neutral-700 rounded-full"
                            ></div>
                            <div className="ml- 20 w-20 h-5 animate-pulse bg-neutral-700 rounded-full"
                            ></div>
                        </div>
                    </div> 
                </div> 
            </div>
            ))}
        </div>
    );
};

export default Loading;