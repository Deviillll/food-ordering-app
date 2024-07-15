"use client"
import axios from "axios"
import{ useEffect } from "react"
import useCartStore from "../store/store";
const FetchProducts = () => {
    
    const menuitem = useCartStore((state) => state.menuitem);
    const setMenuItems = useCartStore((state) => state.setMenuItems);


    const fetchProducts = async () => {
        try {
        const response = await axios.get("api/products")
      
        setMenuItems(response.data)
        } catch (error) {
        console.error(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
  return (
    <div>
       
    </div>
  )
}

export default FetchProducts
