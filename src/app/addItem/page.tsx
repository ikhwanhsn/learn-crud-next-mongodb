"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const addItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in the form");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, description }),
        }
      );
      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Failed to create data");
      }
    } catch (error) {
      console.log("Error create data", error);
    }
  };
  return (
    <form className="w-full mt-3" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="product"
        id="product"
        placeholder="product..."
        className="border p-3 w-full"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        name="deskripsi"
        id="deskripsi"
        placeholder="deskripsi..."
        className="border p-3 w-full mt-2"
      />
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded-md w-full mt-2"
        type="submit"
      >
        Add product
      </button>
    </form>
  );
};

export default addItem;
