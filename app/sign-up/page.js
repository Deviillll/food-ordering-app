"use client";
import { socialLogin } from "@/action";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getsession } from "@/action";

const SignUpPage = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const checkSession = async () => {
    const session = await getsession();
    if (session) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/user/register', data);
      router.push('/sign-in');
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className='w-[80wv] md:w-[45vw] lg:w-[30vw] px-7 py-5 shadow-lg mt-16 rounded-md shadow-gray-300'>
        <form onSubmit={handleRegister}>
          <div className="">
            <label htmlFor="name" className="leading-7 text-sm text-orange-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-orange-400 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="">
            <label htmlFor="email" className="leading-7 text-sm text-orange-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-orange-400 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="">
            <label htmlFor="password" className="leading-7 text-sm text-orange-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded border border-orange-400 focus:border-orange-500 focus:bg-gray-900 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-gray-900 rounded-md border border-orange-400 focus:border-orange-500 focus:bg-orange-500 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="submit">
              {loading ? "Processing" : "Register"}
            </button>
          </div>
        </form>
        <p className="text-sm text-center mt-1 text-orange-400">OR</p>
        <form action={socialLogin} className="mt-1 flex gap-x-2">
          <button className="w-full bg-gray-900 rounded-md border border-orange-400 focus:border-orange-500 focus:bg-orange-500 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="submit" name="action" value={'github'}>
            Github
          </button>
          <button className="w-full bg-gray-900 rounded-md border border-orange-400 focus:border-orange-500 focus:bg-orange-500 focus:ring-2 focus:ring-orange-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="submit" name="action" value={'google'}>
            Google
          </button>
        </form>
        <p className="text-sm mt-2">
          Don&apos;t have an Account?
          <Link href="/sign-in" className="text-orange-500">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
