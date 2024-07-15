import { getsession } from '@/action'
import ImageUpload from '../components/ImageUpload'
import { redirect } from 'next/navigation'

const page = async() => {

  const session = await getsession()
  if (!session || !session.user) {
    console.error("Session or user is null");
    return redirect("/");
             
  }

  const role = session.user.role;

  if (role !== "admin") {
    redirect("/");
  }

  



  return (
    <div>
        <ImageUpload />
      
    </div>
  )
}

export default page
