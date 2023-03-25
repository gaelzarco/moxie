import { 
  type DragEventHandler, 
  useState, useRef
} from "react";

interface FuncProps {
    changeState: (file: File | any) => void;
}

const DragAndDrop: React.FC<FuncProps> = ( props: FuncProps ) => {

    const fileRef = useRef<HTMLInputElement>(null)
    const [ file, setFile ] = useState<File | null>(null)

    const handleDragOver: DragEventHandler<HTMLInputElement> = (event) => event.preventDefault()
    const handleDrop: DragEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
        if (event.dataTransfer) {
            console.log(event.dataTransfer.files[0])
            setFile(event.dataTransfer.files[0]!)
            props.changeState(event.dataTransfer.files[0]!)
        }
    }

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
              className="cursor-pointer relative justify-center items-center"
              onChange={(event) => {
                if (event.target.files) {
                    setFile(event.target.files[0]!)
                    props.changeState(event.target.files[0])
                }
              }}
              hidden
              ref={fileRef}
            />
            <button
            onClick={() => {
                fileRef.current?.click()
            }}
            >
              Select Files
            </button>
          </div>
          ) : (
            <div className="flex flex-col justify-center items-center content-center mt-10 mb-10">
            <h1>
                {file.name}
            </h1>
            <div>
                <button onClick={() => {
                    setFile(null)
                    props.changeState(null)
                    }}>Cancel</button>
            </div>
        </div>
          )}
        </>
    )
}

export default DragAndDrop