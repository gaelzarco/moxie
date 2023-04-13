import type { NextPage } from "next";
import { type DragEventHandler, useState, useEffect } from "react";
import Image from "next/image";
import { Link2Icon } from "@radix-ui/react-icons";

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
    }, [ file, setParentState ])

    return (
        <>
        {!file ? (
          <div className="flex justify-center items-center content-center p-4 mb-8"
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
          <div className="flex flex-col justify-center items-center content-center dark:text-neutral-400 mt-8 mb-8">

            <label htmlFor="img" 
              className="flex w-10/12 items-center content-center justify-center p-8 py-14 rounded-xl border border-neutral-300 border-dashed cursor-pointer dark:bg-neutral-800"
            >
                <Image src={URL.createObjectURL(file)} width={300} height={300} className="mx-auto rounded-xl" alt='Uploaded File'/>
                <button
                  className="mx-auto rounded-full dark:bg-red-500 dark:text-white px-8 h-10 font-semibold no-underline transition dark:hover:bg-red-400 hover:cursor-pointer"
                  onClick={(event) => {
                  event.preventDefault()
                  setFile(null)
                  setParentState(null)
                }}>
                  Cancel
                </button>
            </label>

          </div>
        )}
        </>
    )
}

export default DragAndDrop