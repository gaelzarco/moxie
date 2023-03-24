import { type FormEvent, type ChangeEvent, useState } from "react";

export default function UserForm() {
    const [ credentials, setCredentials ] = useState({
        email: '',
        name: '',
        password: ''
    })

      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(credentials)
      }

      const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, email: event.target.value});
      };
      const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, name: event.target.value});
      };
      const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, password: event.target.value});
      };

      return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold text-xl mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(event) => nameHandler(event)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold text-xl mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(event) => emailHandler(event)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold text-xl mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(event) => passwordHandler(event)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
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