
import { credentialsLogin, socialLogin } from "@/action";
import { getsession } from "@/action";
import Link from "next/link";
import { redirect } from "next/navigation";




const page = async () => {
  const session= await getsession()
  if(session){
    return redirect("/")

  }
  

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
    <div className="w-[60vw] md:w-[40vw] lg:w-[30vw] px-8 mt-16 shadow-lg shadow-gray-300 py-8 rounded-sm">
    <form  action={credentialsLogin} >
      
      <div className="">
        <label htmlFor="email" className="leading-7 text-sm text-orange-400">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full  rounded border border-orange-400 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
        />
      </div>
      <div className="">
        <label htmlFor="name" className="leading-7 text-sm text-orange-400">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full  rounded border border-orange-400 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
        />
      </div>
      <div className="mt-4">
        <button className="w-full bg-gray-900  border border-orange-400 focus:border-orange-500 focus:bg-orange-500 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded-md" type="submit">
          Login
        </button>
      </div>
    </form>

        <p className="text-sm text-center mt-1 text-orange-400">OR</p>
        <form action={socialLogin} className="mt-1 flex gap-x-2">
          <button className="w-full bg-gray-900  rounded-md border border-orange-400 focus:border-orange-500 focus:bg-orange-500 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="submit" name="action" value={'github'}>
            Github{" "}
          </button>

          <button className="w-full bg-gray-900  rounded-md border border-orange-400 focus:border-orange-500 focus:bg-orange-500 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="submit" name="action" value={'google'}>
            Google{" "}
          </button>
        </form>
      
        <p className="text-sm mt-2 ">
          Don&apos;t have an Account  ? 
          <Link href="/sign-up" className="text-orange-500">
            {" "}
            Register
          </Link>
        </p>
    </div>
    </div>
  );
};

export default page;
