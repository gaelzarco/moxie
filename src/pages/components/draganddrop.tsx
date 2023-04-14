import type { NextPage } from "next";
import { type DragEventHandler, useState, useEffect } from "react";
import Image from "next/image";

import { Link2Icon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

const DragAndDrop: NextPage<{ setParentState: (file: File | null) => void }> = ({ setParentState }) => {

    const [ file, setFile ] = useState< File | null >(null)

    const handleDragOver: DragEventHandler<HTMLInputElement> = (event) => event.preventDefault()
    const handleDrop: DragEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
        if (event.dataTransfer.files[0]) {
            setFile(event.dataTransfer.files[0])
            setParentState(file)
        }
    }

    useEffect(() => {
      if (file) {
        setParentState(file)
      }
    }, [ file ])

    return (
        <>
        {!file ? (
          <div className="flex justify-center items-center content-center p-4 mb-6"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >

            <label htmlFor="img" 
              className="flex w-10/12 items-center content-center justify-center p-8 py-14 rounded-xl border border-neutral-300 border-dashed cursor-pointer transition dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              <div className="flex flex-col content-center justify-center">
                <Link2Icon className="w-10 h-10 text-neutral-400 mx-auto" />
                <h4 className="font-semibold text-neutral-300 mx-auto">Click to upload a file</h4>
                <span className="text-sm text-neutral-400 mx-auto">or drag & drop</span>
              </div>
              <input type="file" id="img" name="img" accept="image/*, .gif" hidden
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    setFile(event.target.files[0])
                    setParentState(file)
                  }
                }}
              />
            </label>

          </div>
        ) : (
          <div className="mx-auto w-11/12 flex items-center content-center items-center justify-center dark:text-neutral-400 mt-2 mb-6">

            <Image src={URL.createObjectURL(file)} width={100} height={100} className="rounded-lg h-auto max-w-[150px]" alt='Uploaded File'/>
            <p className="ml-4">{file.name.slice(0, 4) + '...' +  file.name.slice(-5)}</p>
            <CheckIcon className="h-5 w-5 text-green-400 ml-4" />
            <div className="hover:cursor-pointer hover:bg-neutral-800 font-semibold text-red-400 bg-black w-auto h-auto rounded-full p-[10px] ml-4">
            <Cross2Icon
            onClick={(event) => {
              event.preventDefault()
              setFile(null)
              setParentState(null)
            }} />
            </div>

          </div>
        )}
        </>
    )
}

export default DragAndDrop