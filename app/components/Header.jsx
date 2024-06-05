import React from 'react'

const Header = () => {
  return (
    
        <div className='flex flex-col uppercase space-y-9 bg-gradient-to-b from-orange-300 to-orange-400 px-10 justify-center items-center text-center h-[92vh] w-screen'> 
            <h1 className='  text-[5.5vw] font-semibold leading-normal '> the best and yummy food in Lahore </h1>

            <p className='text-md md:text-lg tracking-wide font-medium text-neutral-800 leading-6 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, fugiat officiis. Illum numquam !</p>
            <button className='md:px-6 px-3 py-2 bg-black uppercase text-white rounded-lg'>buy now</button>
        </div>
      
    
  )
}

export default Header
