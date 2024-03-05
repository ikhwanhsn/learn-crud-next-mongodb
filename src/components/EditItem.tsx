"use client";

import { fetcher } from "@/libs/swr/fetcher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const EditItem = ({ id }: any) => {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { data, error, isLoading } = useSWR(`/api/products/${id}`, fetcher);
  useEffect(() => {
    if (data) {
      setNewName(data.product.name);
      setNewDescription(data.product.description);
    }
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newName, newDescription }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to create data");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <>
      {!isLoading && newName && (
        <form onSubmit={handleSubmit} className="w-full mt-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            name="product"
            id="product"
            placeholder="product..."
            className="border p-3 w-full"
          />
          <input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
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
            Edit product
          </button>
        </form>
      )}
    </>
  );
};

export default EditItem;
