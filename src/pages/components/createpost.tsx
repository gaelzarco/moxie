import { NextPage } from "next";
import { 
  type FormEvent, type ChangeEvent, type DragEventHandler,
  useRef ,useState
 } from "react";

const CreatePost: NextPage = () => {

    const fileRef = useRef()
    const [ file, setFile ] = useState<File | undefined>(undefined);
    const [ post, setPost ] = useState({
        body: '',
        media: typeof File === 'undefined' ? undefined : new File([], '')
    })

    const handleDragOver: DragEventHandler<HTMLInputElement> = (event) => event.preventDefault()
    const handleDrop: DragEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
        if (event.dataTransfer) {
            setFile(event.dataTransfer.files[0])
            mediaHandler(event.dataTransfer.files[0])
        }
    }

      const bodyHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPost({...post, body: event.target.value});
      };
      const mediaHandler = (file: File | undefined) => {
        setPost({...post, media: file});
      };
      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(post)
      }

      return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="body" className="block font-bold text-xl mb-2">
              Body
            </label>
            <input
              type="text"
              name="body"
              id="body"
              onChange={(event) => bodyHandler(event)}
              className="border rounded w-full py-2 px-3 text-black active:outline-none focus:outline-none"
            />
          </div>
          {!file ? (
            <div className="border-2 border-dashed border-gray-400 rounded-lg h-48 justify-center items-center flex flex-col"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
              <p>Drag and drop</p>
              <br />
              <p>or</p>
            <input
              type="file"
              className="cursor-pointer relative justify-center items-center"
              onChange={(event) => {
                if (event.target.files) {
                    setFile(event.target.files[0])
                    mediaHandler(event.target.files[0])
                }
              }}
            />
          </div>
          ) : (
            <div className="uploads">
            <h1>
                {file.name}
            </h1>
            <div className="uploads-actions">
                <button onClick={() => {
                    setFile(undefined)
                    mediaHandler(undefined)
                    }}>Cancel</button>
            </div>
        </div>
          )}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            >
              Submit
            </button>
          </div>
        </form>
      );
}

export default CreatePost;