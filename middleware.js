// import { NextResponse } from 'next/server'
//  import { authConfig } from '@/auth.config'
// import NextAuth from 'next-auth'



//const {auth}=NextAuth(authConfig)
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  

     console.log("from middleware")

    // const {session} =await auth()
    // console.log(session)
   
    // console.log("from middleware",session)
 // return NextResponse.redirect(new URL('/', request.url))
}
export const config = {
  matcher: [ '/about', '/contact']
}

