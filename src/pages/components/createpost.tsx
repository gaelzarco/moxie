import { type NextPage } from "next";
import { 
  type FormEvent, type ChangeEvent,
  useState, useEffect, useRef
} from "react";
import { api } from "~/utils/api";

import * as Toast from '@radix-ui/react-toast';
import DragAndDrop from "./draganddrop";
import { useUser } from "@clerk/nextjs";

type Post = {
  body: string;
  media: {
    buffer: string;
    mimetype: string;
  } | null;
}

const CreatePost: NextPage = () => {

  const user = useUser()

    const [ post, setPost ] = useState<Post>({
        body: '',
        media: null
    })
    const [ file, setFile ] = useState<File | null>(null)
    const [imgView, setImgView] = useState(false)

    const timeRef = useRef(0)
    const [open, setOpen] = useState(false);

    const { mutate } = api.posts.createOne.useMutation({
      onSuccess: () => {
          setPost({ body: '', media: null })
          setFile(null)
          setImgView(false)

          setOpen(false)
          window.clearTimeout(timeRef.current)
          timeRef.current = window.setTimeout(() => {
            setOpen(true)
          }, 100)
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

        if (post.body.length > 0) {
          mutate({
            body: post.body,
            media: post.media
          })
        }
      }

      useEffect(() => {
        if (file) {
          const reader = new FileReader()
          reader.readAsArrayBuffer(file)
      
          reader.onload = () => {
            const buffer = Buffer.from(reader.result as ArrayBuffer)
            const base64 = buffer.toString('base64')
            setPost((prevState) => ({ ...prevState, media: { buffer: base64, mimetype: file.type } }))
          }
        }

        return () => clearTimeout(timeRef.current)
      }, [file])

      return (
        <Toast.Provider swipeDirection="right">
        <form onSubmit={handleFormSubmit} className="top-0 min-w-full border-x border-b border-stone-300">
            
          <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
            <Toast.Title className="ToastTitle">Post was successful!</Toast.Title>
            <Toast.Description asChild>
              <p className="ToastDescription">
                You post was succesfully created!
              </p>
            </Toast.Description >
            <Toast.Action className="ToastAction" asChild altText="close">
              <button
              className="Button small green"
              onClick={() => {
                setOpen(false)
                clearTimeout(timeRef.current)
              }}
              >Close</button>
            </Toast.Action >
          </Toast.Root>
          <Toast.Viewport className="ToastViewport"/>

          <div className="m-4 flex flex-row">
            {!!user.user?.profileImageUrl && (
              <img src={user.user?.profileImageUrl} className="w-16 h-16 m-4 rounded-full" />
            )}
            <input
              type="text"
              placeholder="What's on your mind?"
              onChange={(event) => postBodyHandler(event)}
              value={post.body}
              className="w-5/6 min-w-5/6 py-2 px-3 text-black active:outline-none focus:outline-none"
            />
          </div>

          {imgView && (
                <div>
                    <DragAndDrop setParentState={postFileHandler}/>
                </div>
            )} 

          <div className="flex flex-row justify-between mb-3 mr-3">
            <button
              onClick={(event) => {
                event.preventDefault()
                setImgView(!imgView)
              }}
              className="rounded-full ml-24 bg-black text-white px-10 py-3 font-semibold no-underline transition hover:bg-stone-800 hover: cursor-pointer"
            >
                Attach Image
            </button>
            
            <button
              type="submit"
              className="rounded-full bg-black text-white  px-10 py-3 font-semibold no-underline transition hover:bg-stone-800 hover:cursor-pointer"
            >
              Submit
            </button>
          </div>

        </form>
        </Toast.Provider>
      );
}

export default CreatePost;
