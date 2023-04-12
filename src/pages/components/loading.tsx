import type { NextPage } from "next";

const Loading: NextPage<{ home?: true }> = ({ home }) => {
    
    return (
        <div className="h-auto min-h-screen w-full pb-5 dark:bg-black max-w-[750px]">
            {!home && (
                <div className="sticky top-0 backdrop-blur-lg p-4 pt-9 pl-9 w-full inline-flex items-center z-10">
                    <div className="w-40 h-10 rounded-full animate-pulse bg-neutral-700">
                    </div>
                </div>
            )}
            {[...Array(20).keys()].map((i) => (
                <div className="text-left m-auto w-11/12 p-4 rounded-xl mt-5 dark:text-white dark:bg-neutral-900 leading-none" key={i}>
                    <div className=" m-2">
                        
                        
                        <div className="inline-flex items-center justify-between mb-2 w-full">
                            <div className="inline-flex items-center w-1/2">
                                <div className="bg-neutral-700 rounded-full w-10 h-10 animate-pulse"></div>
                                <div className="h-5 w-1/2 animate-pulse bg-neutral-700 rounded-full ml-2"></div>
                            </div>
                            <div className="h-5 w-1/6 animate-pulse bg-neutral-700 rounded-full"></div>
                        </div>

                        <div className="ml-12 mb-2 h-5 rounded-full w-auto animate-pulse bg-neutral-700"></div>
                        <div className="h-auto w-full min-w-full mb-6 h-5 rounded-3xl bg-neutral-700 animate-pulse"></div>

                        <div className="ml-12 inline-flex w-full">

                        <div className="inline-flex w-1/2 h-5 justify-between">
                            <div className="h-5 w-1/4 animate-pulse bg-neutral-700 rounded-full"></div>
                            <div className="ml- 20 w-1/4 h-5 animate-pulse bg-neutral-700 rounded-full"></div>
                            <div className="ml- 20 w-1/4 h-5 animate-pulse bg-neutral-700 rounded-full"></div>
                        </div>

                    </div> 
                    </div> 
                </div>
            ))}
        </div>
    );
};

export default Loading;