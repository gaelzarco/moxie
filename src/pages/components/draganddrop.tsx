import { 
  type DragEventHandler,
  useState, useEffect
} from "react";

interface ChangeParentStateProps {
    setParentState: (file: File | null) => void
}

const DragAndDrop = ({ setParentState }: ChangeParentStateProps ) => {

    const [ file, setFile ] = useState<File | null>(null)

    const handleDragOver: DragEventHandler<HTMLInputElement> = (event) => event.preventDefault()
    const handleDrop: DragEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
        if (event.dataTransfer.files) {
            setFile(event.dataTransfer.files[0] as File)
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
                if (null) {
                  return
                }
                if (event.target.files) {
                  setFile(event.target.files[0] as File)
                  setParentState(file)
                }
              }}
            />
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