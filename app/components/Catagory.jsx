import React from 'react'
import CatagoryItems from './CatagoryItems'

const Catagory = () => {
  return (
    <div>
        <div className=' py-5 mt-14  '>
            <h1 className=" text-2xl  md:text-4xl text-orange-500 tracking-wide font-semibold text-center uppercase">Catagories</h1>
            <p className="text-sm md:text-lg tracking-tight text-center font-medium mt-8 text-zinc-800 line-clamp-2 md:line-clamp-none leading-6 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          fugiat officiis. Illum numquam 
        </p>
        </div>
        <CatagoryItems/>
      
    </div>
  )
}

export default Catagory