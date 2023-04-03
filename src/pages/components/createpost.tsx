// import type { NextPage } from "next";
import Image from "next/image";
import { type FormEvent, type ChangeEvent, useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

import DragAndDrop from "./draganddrop";

import * as Toast from '@radix-ui/react-toast';
import { FiImage } from 'react-icons/fi';

type Post = {
  body: string;
  media: {
    buffer: string;
    mimetype: string;
  } | null;
}

type PostProps = {
  reply?: boolean;
  postId?: string;
}

const CreatePost = ({ reply, postId }: PostProps) => {

  const { user, isSignedIn } = useUser()

  const [ post, setPost ] = useState<Post>({
      body: '',
      media: null
  })
  const [ file, setFile ] = useState<File | null>(null)
  const [imgView, setImgView] = useState(false)

  const toasterTimeRef = useRef(0)
  // const toasterCreatedDateRef = useRef(new Date());
  const [open, setOpen] = useState(false);

  const mutationSuccess = () => {
    setPost({ body: '', media: null })
    setFile(null)
    setImgView(false)
    setOpen(false)
    
    window.clearTimeout(toasterTimeRef.current)
    toasterTimeRef.current = window.setTimeout(() => {
      setOpen(true)
    }, 100)
  }

  const postMutation = api.posts.createOne.useMutation({
    onSuccess: mutationSuccess
  })

  const replyMutation = api.replies.createOne.useMutation({
    onSuccess: mutationSuccess
  })

  const postBodyStateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPost({...post, body: event.target.value});
  };
  const postMediaStateHandler = (file: File | null) => {
    setFile(file)
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpen(false)

    if (!isSignedIn) throw new Error('User is not signed in')

    if (post.body.length < 1) throw new Error('Body is empty')

    if (!reply && !postId) {
      postMutation.mutate({
        body: post.body,
        media: post.media
      })
    }

    if (reply === true && postId) {
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
      }
    }

    return () => clearTimeout(toasterTimeRef.current)
  }, [ file ])

    return (
      <form onSubmit={handleFormSubmit} className="min-w-full border-b border-stone-300">
          
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
              clearTimeout(toasterTimeRef.current)
            }}
            >Close</button>
          </Toast.Action >
        </Toast.Root>
        <Toast.Viewport className="ToastViewport"/>

        <div className="m-4 flex flex-row">
          {!!user && (
            <Image src={user.profileImageUrl} width={50} height={50} className="m-4 rounded-full" alt='User Avatar'/>
          )}
          <input
            type="text"
            placeholder="What's on your mind?"
            onChange={(event) => postBodyStateHandler(event)}
            // value={post.body}
            className="w-5/6 text-xl min-w-5/6 py-2 px-3 ml-1 text-black active:outline-none focus:outline-none"
          />
        </div>

        {imgView && (
              <div>
                  <DragAndDrop setParentState={postMediaStateHandler}/>
              </div>
          )} 

        <div className="flex flex-row justify-between items-center mb-3">
          <FiImage
            onClick={(event) => {
              event.preventDefault()
              setImgView(!imgView)
            }}
            className="ml-28 text-stone-800 hover:cursor-pointer"
            size={20}
          />
          
          <button
            type="submit"
            className="rounded-full bg-black text-white px-8 h-10 mr-5 font-semibold no-underline transition hover:bg-stone-800 hover:cursor-pointer"
          >
            Submit
          </button>
        </div>

      </form>
    );
}

export default CreatePost;
