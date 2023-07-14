import type { NextPage } from "next";
import { type FormEvent, type ChangeEvent, useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { type RouterInputs, api } from "~/utils/api";
import { useTheme } from "next-themes";
import Image from "next/image";

import DragAndDrop from "./draganddrop";
import Toast from "./toast";
import { ImageIcon, RocketIcon } from "@radix-ui/react-icons";
import { Jelly } from "@uiball/loaders";

const CreatePost: NextPage<{ reply?: boolean, postId?: string }> = ({ reply, postId }) => {

  const { user, isSignedIn } = useUser()
  const context = api.useContext()

  const [ post, setPost ] = useState< RouterInputs["posts"]["createOne"] >({ body: '', media: null })
  const [ file, setFile ] = useState< File | null >(null)
  
  const [ errMsg, setErrMsg ] = useState< string | null >(null)
  const [ imgView, setImgView ] = useState(false)
  const [ charCount, setCharCount ] = useState(0)
  const [ loading, setLoading ] = useState(false)

  const toastRef = useRef<{ publish: () => void }>()
  const failedToastRef = useRef<{ publish: () => void }>()

  const { theme } = useTheme()

  const mutationSuccess = () => {
    setLoading(false)
    setPost({ body: '', media: null })
    setFile(null)
    setImgView(false)
    setCharCount(0)
    toastRef.current?.publish()
  }
  const postFailure = (err: string) => {
    setLoading(false)
    setErrMsg(err)
    failedToastRef.current?.publish()
  }

  const postMutation = api.posts.createOne.useMutation({ 
    onSuccess: async () => {
      mutationSuccess()
      await context.posts.getAll.refetch()
      .catch(err => console.log(err))
    },
    onError: (err) => postFailure(err.message)
  })
  const replyMutation = api.replies.createOne.useMutation({ 
    onSuccess: async () => {
      mutationSuccess()
      await context.replies.getAllByPostId.refetch(postId as string)
      .catch(err => console.log(err))
    },
    onError: (err) => postFailure(err.message)
   })

  const bodyStateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPost({...post, body: event.target.value});
    setCharCount(event.target.value.length);
  };
  const mediaStateHandler = (file: File | null) => setFile(file)

  const handlePostFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (!isSignedIn) return postFailure("Sign-in to post.")
    if (post.body.length < 1) return postFailure("Post body cannot be empty.")

    if (!reply && !postId) {
      postMutation.mutate({
        body: post.body,
        media: post.media
      })
    }
  }
  const handleReplyFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (!isSignedIn) postFailure("Sign-in to post.")
    if (post.body.length < 1) return postFailure("Post body cannot be empty.")

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
      }
    } else if (!file) {
      setPost((prevState) => ({ ...prevState, media: null }))
    }
  }, [ file ])

    return (
      <form onSubmit={reply && postId ? handleReplyFormSubmit : handlePostFormSubmit}
       className="shadow-xl dark:shadow-none w-11/12 mx-auto mt-5 rounded-xl dark:text-white bg-neutral-100 dark:bg-neutral-900 p-3 max-xs:p-2">

        <Toast forwardedRef={toastRef} title='Post created successfully!' /> 
        <Toast forwardedRef={failedToastRef} title={errMsg as string} error />
          
        <div id='form-body-input' className="p-4 flex flex-row">
          {!!user && 
            <Image src={user.profileImageUrl} width={50} height={50} className="h-14 w-14 rounded-full bg-neutral-200 dark:bg-neutral-800" alt='User Avatar'/>
          }
          <input
            type="text"
            placeholder="What's on your mind?"
            onChange={(event) => bodyStateHandler(event)}
            value={post.body}
            className="w-5/6 text-xl min-w-5/6 py-2 px-3 ml-1 dark:text-white bg-neutral-100 dark:bg-neutral-900 active:outline-none focus:outline-none"
          />
        </div>

        {imgView && (
              <div>
                  <DragAndDrop setParentState={mediaStateHandler}/>
              </div>
          )} 

        <div className="flex flex-row justify-between items-center content-center mb-5">

          <div className="flex flex-row items-center content-center justify-center">
            <ImageIcon
              onClick={(event) => {
                event.preventDefault()
                setImgView(!imgView)
              }}
              className="ml-24 h-5 w-5 dark:text-white hover:cursor-pointer"
            />

            {charCount > 0 && (
              <span className="ml-4 text-sm dark:text-neutral-500">
                {charCount}/500
              </span>
            )}
            
          </div>
          
          {loading ? (
            <div className="flex content-center justify-center px-6 py-4 mr-9">
              {loading && theme === 'dark' && <Jelly color='white' size={15}/>}
              {loading && theme === 'light' && <Jelly color='black' size={15}/>}
            </div>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-green-300/40 dark:bg-green-400/40 dark:text-white px-6 h-8 mr-5 hover:bg-green-400/40 dark:hover:bg-green-500/40 hover:cursor-pointer"
            >
              Send
              <RocketIcon className='ml-2' />
            </button>
          )}

        </div>

      </form>
    );
}

export default CreatePost;
