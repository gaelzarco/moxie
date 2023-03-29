import { type NextPage } from "next";
import { 
  type FormEvent, type ChangeEvent,
  useState, useEffect
} from "react";
import * as Toast from '@radix-ui/react-toast';

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
    const [open, setOpen] = useState(false);

    const reader = new FileReader()

    const { mutate } = api.posts.createOne.useMutation({
      onSuccess: () => {
          setPost({ body: '', media: null })
          setFile(null)
          setImgView((bool) => !bool)
      }
 })

      const postBodyHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPost({...post, body: event.target.value});
      };
      const postFileHandler = (file: File | null) => {
        setFile(file)
    }
      const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpen(true)

        if (file) {
          reader.readAsArrayBuffer(file)
      
          reader.onload = async () => {
            const buffer = Buffer.from(reader.result as ArrayBuffer)
            const base64 = buffer.toString('base64')
            setPost((prevState) => ({ ...prevState, media: { buffer: base64, mimetype: file.type } }))
            console.log(post)
          }
        }

        if (post.body.length > 0) {
          mutate({
            body: post.body,
            media: post.media
          })
        }
      }

      useEffect(() => {
        if (file) {
          setFile(file)
          console.log(file)
        }
      }, [file])

      return (
        <form onSubmit={handleFormSubmit} className="w-full border border-stone-300">
            <Toast.Provider>
                <Toast.Root open={open} onOpenChange={setOpen}>
                  <Toast.Title> Success! </Toast.Title>
                  <Toast.Description asChild>
                    <p>
                      {post.body}
                    </p>
                  </Toast.Description>
                  <Toast.Action asChild altText="Refresh">
                    <button>Reload</button>
                  </Toast.Action>
                  <Toast.Close />
                </Toast.Root>

                <Toast.Viewport />
              </Toast.Provider>

          <div className="mb-4 w-full">
            <input
              type="text"
              placeholder="What's on your mind?"
              onChange={(event) => postBodyHandler(event)}
              value={post.body}
              className="w-full py-2 px-3 text-black active:outline-none focus:outline-none"
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
              className="rounded-full bg-stone-800/10 px-10 py-3 font-semibold no-underline transition hover:bg-stone-800/20"
            >
                Attach Image
            </button>
            
            <button
              type="submit"
              className="rounded-full bg-stone-800/10 px-10 py-3 font-semibold no-underline transition hover:bg-stone-800/20"
            >
              Submit
            </button>
          </div>

        </form>
      );
}

export default CreatePost;
