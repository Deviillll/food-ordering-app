
import useCartStore from '../store/store';

const CataMenu = ({setCatagory,catagory}) => {
    const Catagory = useCartStore((state) => state.catagory)

  return (
    <div id='item' className='flex  flex-wrap bg-black/90 py-8 md:w-full px-2 items-center justify-center md:px-10 md:justify-around mt-10 text-center  gap-4 '>       
    {Catagory.map((item, index) => {
        return (
            
               <div  key={index} onClick={()=>setCatagory(item.name)}  className='cursor-pointer'>
                <div className={`${catagory===item.name ? "rounded-full border-[5px] animate-spin-slow  border-orange-500 p-[3px] hover:animate-none" :null}`}>
               <img src={item.image} alt={item.name} className={`w-10 h-10   md:w-20 hover:scale-105 md:h-20 object-cover object-center rounded-full `}/>

                </div>
                <h1 className='text-xs md:text-md mt-3 font-normal text-orange-600 tracking-wide'>{item.name}</h1>
               </div>
           
        )
    })}

     </div>
  )
}

export default CataMenu
