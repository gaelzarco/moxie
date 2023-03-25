import { NextPage } from "next";
import { 
  type FormEvent, type ChangeEvent,
  useState
} from "react";
import { api } from "~/utils/api";
import DragAndDrop from "./draganddrop";

const CreatePost: NextPage = () => {

  type Post = {
    body: string;
    media: {
      buffer: string;
      mimetype: string;
    } | null;
  }

   const postMutation = api.posts.createOne.useMutation()

    const [ post, setPost ] = useState<Post>({
        body: '',
        media: null
    })
    const [ file, setFile ] = useState<File | null>(null)

    const [imgView, setImgView] = useState(false)

      const bodyHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPost({...post, body: event.target.value});
      };
      const imgState = (file: File) => {
        setFile(file)
    }
      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // let formData = new FormData()
        // for (let [key, value] of Object.entries(post)) {
        //   formData.append(`${key}`, value!)
        // }
        // if (typeof post.media !== null) {
        //   formData.set('media', post.media!, post.media!.name)
        // }
        // console.log(post)

        if (file) {
          const reader = new FileReader()
          reader.readAsArrayBuffer(file!)

          reader.onload = async () => {
            const buffer = Buffer.from(reader.result as ArrayBuffer)
            const base64 = buffer.toString('base64')
            setPost({...post, media: {buffer: base64, mimetype: file!.type}})
          }

          postMutation.mutate({
            body: post.body,
            media: post.media!
          })
        }
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

          {imgView && (
                <div>
                    <DragAndDrop changeState={imgState}/>
                </div>
            )}

          <div onClick={() => setImgView(!imgView)}>
              <p>Attach Image</p>
          </div>

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
