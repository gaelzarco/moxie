import type { NextPage } from "next";
import { type FormEvent, type ChangeEvent, useRef, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { type RouterInputs, api } from "~/utils/api";
import Image from "next/image";

import DragAndDrop from "./draganddrop";
import ToastComponent from "./toast";
import { FiImage } from 'react-icons/fi';

type Post = RouterInputs["posts"]["createOne"]

const CreatePost: NextPage<{ reply?: boolean, postId?: string }> = ({ reply, postId }) => {

  const { user, isSignedIn } = useUser()
  const context = api.useContext()

  const [ post, setPost ] = useState<Post>({ body: '', media: null })
  const [ file, setFile ] = useState<File | null>(null)
  const [imgView, setImgView] = useState(false)

  const toastTimeRef = useRef(0)
  const [toastOpen, setToastOpen] = useState(false);

  const mutationSuccess = () => {
    setPost({ body: '', media: null })
    setFile(null)
    setImgView(false)
    setToastOpen(false)

    // console.log(post)
    // console.log(file)
    // console.log(imgView)

    window.clearTimeout(toastTimeRef.current)
    toastTimeRef.current = window.setTimeout(() => {
      setToastOpen(true)
    }, 100)
  }

  const postMutation = api.posts.createOne.useMutation({ 
    onSuccess: async () => {
      mutationSuccess()
      await context.posts.getAll.fetch()
      .catch(err => console.log(err))
    }
  })
  const replyMutation = api.replies.createOne.useMutation({ 
    onSuccess: async () => {
      mutationSuccess()
      await context.replies.getAllByPostId.fetch(postId as string)
      .catch(err => console.log(err))
    }
   })

  const bodyStateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPost({...post, body: event.target.value});
  };
  const mediaStateHandler = (file: File | null) => setFile(file)

  const handlePostFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isSignedIn) throw new Error('User is not signed in')
    if (post.body.length < 1) throw new Error('Body is empty')

    if (!reply && !postId) {
      postMutation.mutate({
        body: post.body,
        media: post.media
      })
    }
  }
  const handleReplyFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isSignedIn) throw new Error('User is not signed in')
    if (post.body.length < 1) throw new Error('Body is empty')

    if (reply && postId) {
      replyMutation.mutate({
        body: post.body,
        media: post.media,
        postId: postId
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
        setFile(null)
      }
    }

    return () => clearTimeout(toastTimeRef.current)
  }, [ file, post.media ])

    return (
      <form onSubmit={reply && postId ? handleReplyFormSubmit : handlePostFormSubmit}
       className="min-w-full border-b dark:border-stone-700">

        {toastOpen && (
          <ToastComponent title='Post was successful!' >
            <button
            className="text-sm px-5 h-[25px] bg-green-400 text-white shadow-md transition-colors duration-200 ease-in-out hover:bg-green-500 rounded-full"
            onClick={() => {
                setToastOpen(false)
                clearTimeout(toastTimeRef.current)
            }}
            >Close</button>
        </ToastComponent>
        )}
          
        <div id='form-body-input' className="m-4 flex flex-row">
          {!!user && 
            <Image src={user.profileImageUrl} width={50} height={50} className="m-2 rounded-full bg-neutral-800" alt='User Avatar'/>
          }
          <input
            type="text"
            placeholder="What's on your mind?"
            onChange={(event) => bodyStateHandler(event)}
            value={post.body}
            className="w-5/6 text-xl min-w-5/6 py-2 px-3 ml-1 dark:text-white dark:bg-neutral-900 active:outline-none focus:outline-none"
          />
        </div>

        {imgView && (
              <div id='form-dragdrop-input'>
                  <DragAndDrop setParentState={mediaStateHandler}/>
              </div>
          )} 

        <div id='form-imgview-input' className="flex flex-row justify-between items-center mb-3">
          <FiImage
            onClick={(event) => {
              event.preventDefault()
              setImgView(!imgView)
            }}
            className="ml-28 dark:text-white hover:cursor-pointer"
            size={20}
          />
          
          <button
            id='form-submit-input'
            type="submit"
            className="rounded-full bg-black dark:text-white px-8 h-10 mr-5 font-semibold no-underline transition dark:hover:bg-neutral-800 hover:cursor-pointer"
          >
            Submit
          </button>
        </div>

      </form>
    );
}

export default CreatePost;
