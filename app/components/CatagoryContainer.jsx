"use client";
import CataMenu from "./CataMenu";
import CataProducts from "./CataProducts";
import React, { useState } from "react";

const CatagoryItems = () => {
  const [catagory, setCatagory] = useState("All");

  return (
    <div className="w-screen">
      <CataMenu setCatagory={setCatagory} catagory={catagory} />

      <div className="mt-7 ml-10 text-3xl text-orange-400 underline font-semibold ">
        <h1 className="tracking-wider">{catagory}</h1>
      </div>

      <CataProducts catagory={catagory} />
    </div>
  );
};

export default CatagoryItems;
