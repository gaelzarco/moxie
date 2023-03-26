import { NextPage } from "next";
import { 
  type FormEvent, type ChangeEvent,
  useState, useEffect
} from "react";
import { api } from "~/utils/api";
import DragAndDrop from "./draganddrop";

type Post = {
  body: string;
  media: {
    buffer: string;
    mimetype: string;
  } | null;
}

const CreatePost: NextPage = () => {

    const [ post, setPost ] = useState<Post>({
        body: '',
        media: null
    })
    const [ file, setFile ] = useState<File | null>(null)
    const [imgView, setImgView] = useState(false)

    const { mutate, isLoading } = api.posts.createOne.useMutation({
      onSuccess: () => {
          setPost({ body: '', media: null })
          setFile(null)
          console.log(post)
      }
 })

      const postBodyHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPost({...post, body: event.target.value});
      };
      const postFileHandler = (file: File | null) => {
        setFile(prevState  => prevState = file )
    }
      const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (post.body.length > 0) {
          mutate(post)
        }
      }

      useEffect(() => {
        if (file) {
          const reader = new FileReader()
          reader.readAsArrayBuffer(file)
      
          reader.onload = async () => {
            const buffer = Buffer.from(reader.result as ArrayBuffer)
            const base64 = buffer.toString('base64')
            setPost((prevState) => ({ ...prevState, media: { buffer: base64, mimetype: file!.type } }))
          }
        } else {
          setPost((prevState) => ({ ...prevState, media: null }))
        }
      }, [file])

      return (
        <form onSubmit={handleFormSubmit} className="w-auto">
          <div className="mb-4 w-full">
            <input
              type="text"
              placeholder="What's on your mind?"
              onChange={(event) => postBodyHandler(event)}
              value={post.body}
              className="border rounded w-full py-2 px-3 text-black active:outline-none focus:outline-none"
            />
          </div>

          {imgView && (
                <div>
                    <DragAndDrop setParentState={postFileHandler}/>
                </div>
            )} 

          <div className="flex flex-row justify-center content-center items-center mb-8">
            <button
              onClick={(event) => {
                event.preventDefault()
                setImgView(!imgView)}
              }
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            >
                Attach Image
            </button>
            
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
