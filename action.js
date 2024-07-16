"use server"

import { signIn ,auth,signOut} from "./auth"

export async function socialLogin(formData) {
    const action= formData.get("action")
    console.log("action",action)
   await signIn(action,{redirectTo:"/"})
}
export async function credentialsLogin(formData) {
    const email= formData.get("email")
    const password= formData.get("password")
    if(!email || !password){
        return 
        
    }
    
    await signIn("credentials",{email,password,redirectTo:"/"})
}


export async function getsession() {
  const session=  await auth()
  return session
}

export async function logout() {
    await signOut( {redirectTo:"/sign-in"})
}