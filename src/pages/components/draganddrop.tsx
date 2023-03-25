import { 
  type DragEventHandler, type MouseEventHandler,
  useState, useRef, useEffect
} from "react";

interface ChangeParentStateProps {
    setParentState: (file: File | any) => void
}

const DragAndDrop: React.FC<ChangeParentStateProps> = ({ setParentState }: ChangeParentStateProps ) => {

    // const fileRef = useRef<HTMLInputElement>(null)
    const [ file, setFile ] = useState<File | null>(null)

    const handleDragOver: DragEventHandler<HTMLInputElement> = (event) => event.preventDefault()
    const handleDrop: DragEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
        if (event.dataTransfer.files) {
            setFile(event.dataTransfer.files[0]!)
            setParentState(file)
        }
    }
    // const handleFileClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    //   event.preventDefault()
    //   fileRef.current?.click()
    //   setParentState(file)
    // }

    useEffect(() => {
      file ? setParentState(file) : setParentState(null)
      // console.log(fileRef.current?.files)
    }, [ file, setParentState ])

    return (
        <>
        {!file ? (
            <div className="border-2 border-dashed border-gray-400 rounded-lg h-48 justify-center items-center flex flex-col"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
              <p>Drag and drop</p>
              <br />
              <p>Or</p>
            <input
              type="file"
              className="cursor-pointer justify-center content-center items-center flex flex-col"
              onChange={(event) => {
                event.preventDefault()
                  if (event.target.files) {
                      setFile(event.target.files[0]!)
                      setParentState(file)
                  }
              }}
              // hidden
              // ref={fileRef}
            />
            {/* <button
              onClick={(event) => handleFileClick(event)}
              className="bg-stone-800 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded"
            >
              Select Files
            </button> */}
          </div>
          ) : (
            <div className="flex flex-col justify-center items-center content-center mt-10 mb-10">
            <h1>
                {file.name}
            </h1>
            <div>
                <button onClick={(event) => {
                  event.preventDefault()
                  setFile(null)
                  setParentState(null)
                  }}>
                  Cancel
                  </button>
            </div>
        </div>
          )}
        </>
    )
}

export default DragAndDrop