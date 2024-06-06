import React from 'react'
import Header from './components/Header'
import Catagory from './components/Catagory'
import DownloadApp from './components/DownloadApp'
import SaleProduct from './components/SaleProduct'

const page = () => {
  return (
    <div>
      <Header />
      <Catagory />
      <DownloadApp />
      <SaleProduct />
    </div>
  )
}

export default page
