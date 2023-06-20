import type { NextPage } from "next";
import { UserNavDropDown } from "./dropdownmenus";

const Loading: NextPage<{ home?: true }> = ({ home }) => {
    
    return (
        <div className="h-auto min-h-screen w-full pb-5 dark:bg-black max-w-[750px]">
            {!home && (
                <div className="sticky top-0 backdrop-blur-lg h-[80px] pl-6 w-full inline-flex items-center justify-between z-10">
                    <div className="justify-start inline-flex items-center content-center pt-2">
                        <div className="w-[185px] h-10 rounded-full animate-pulse bg-neutral-700"></div>
                    </div>

                    <div className="inline-flex p-5 pr-6 justify-between">
                        <UserNavDropDown />
                    </div>
                </div>
            )}
            {[...Array(20).keys()].map((i) => (
                <div className="cursor-default text-left mx-auto w-11/12 p-4 rounded-xl mt-5 dark:text-white dark:bg-neutral-900 leading-none" key={i}>
                    <div className="p-2">
                        
                        <div className="inline-flex justify-between mb-2 w-full">
                            <div className="inline-flex w-3/4">
                                <div className="bg-neutral-700 rounded-full w-11 h-11 animate-pulse"></div>
                                <div className="h-5  w-3/4 max-w-[240px] animate-pulse bg-neutral-700 rounded-full ml-2"></div>
                            </div>
                            <div className="h-5 w-[50px] animate-pulse bg-neutral-700 rounded-full"></div>
                        </div>

                        <div className="ml-12 mb-2 h-5 rounded-full w-auto animate-pulse bg-neutral-700"></div>
                        <div className="w-full min-w-full mb-6 h-5 rounded-3xl bg-neutral-700 animate-pulse"></div>

                        <div className="ml-12 inline-flex w-full">

                        <div className="inline-flex max-w-[245px] h-5">
                            <div className="w-[50px] animate-pulse bg-neutral-700 rounded-full"></div>
                            <div className="ml-16 w-[50px] h-5 animate-pulse bg-neutral-700 rounded-full"></div>
                            <div className="ml-16 w-[50px] h-5 animate-pulse bg-neutral-700 rounded-full"></div>
                        </div>

                    </div> 
                    </div> 
                </div>
            ))}
        </div>
    );
};

export default Loading;