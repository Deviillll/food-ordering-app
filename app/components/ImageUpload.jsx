"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Catagory } from "../constants/data";


const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const addProduct = async () => {
    setLoading(true);
    try {
    
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          category: data.category,
          imageUrl: imageUrl,
        }),
      });
      setData({ name: "", price: "", category: "" });
      setImageUrl("");
     // window.location.reload();
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };
    




  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState({});


  const handleUploadSuccess = (results, widget) => {
    const imageUrl = results.info.secure_url;
    setImageUrl(imageUrl);
  };

  return (
    <div className="mt-32 md:w-[40vw] w-[90vw]  shadow-lg shadow-gray-200  mx-auto px-5 py-10 rounded-lg">
        <form className="flex flex-col space-y-5 ">
        <div className="space-x-10">
        <label htmlFor="name">Name</label>
        <input
        className="border-2 py-1 border-black px-2 rounded-md"
          type="text"
          placeholder="name .."
          value={data.name}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
      </div>
      <div className="space-x-10">
        <label htmlFor="name">Price</label>
        <input
         className="border-2 py-1 border-black px-2 rounded-md"
          type="number"
          placeholder="price .."
          value={data.price}
          onChange={(e) => {
            setData({ ...data, price: e.target.value });
          }}
        />
      </div>
    

<div className="flex gap-x-16">
        <label htmlFor="category">Category</label>
        <select
        className=""
          onChange={(e) => {
            setData({ ...data, category: e.target.value });
          }}
          name="category"
          id="category"
        >
          {Catagory.map((catagory) => (
            <option key={catagory.name} value={catagory.name}>{catagory.name}</option>
          ))}
        </select>
      </div>
        </form>
        <div className="flex space-x-10 mt-5">
    
<CldUploadWidget uploadPreset="food_app" onSuccess={handleUploadSuccess} >
        {({ open }) => (
          <button className="bg-orange-400 px-2 text-sm py-1 h-10 rounded-md  " onClick={() => open()}>Upload Image</button>
        )}
      </CldUploadWidget>

    



      {imageUrl && (
        <div className="">
          <img
            src={imageUrl}
            alt="Uploaded Image"
            className="w-16 h-10 object-cover rounded-sm"
          />
        </div>
      )}
</div>
<div className=" flex justify-center">
<button onClick={addProduct} className="bg-orange-400 px-8 text-sm py-2 rounded-md text-white  mt-7 " >{loading ? "processing" : "Add"}</button>
</div>
    
    </div>
  );
};

export default ImageUpload;
