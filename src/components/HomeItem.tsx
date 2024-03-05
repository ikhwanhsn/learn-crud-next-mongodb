"use client";

import { fetcher } from "@/libs/swr/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function HomeItem() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { data, error, isLoading } = useSWR("/api/products", fetcher);
  const deleteItem = async (id: any) => {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete data");
      }
      router.refresh();
    }
  };
  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <>
      {products.length > 0 &&
        products.map((product: any) => (
          <div
            className="flex justify-between items-center w-full px-5 py-3 border mt-2"
            key={product._id}
          >
            <section>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>{product.description}</p>
            </section>
            <section className="flex gap-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                onClick={() => deleteItem(product._id)}
                type="button"
              >
                Hapus
              </button>
              <Link
                href={`/editItem/${product._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Edit
              </Link>
            </section>
          </div>
        ))}
    </>
  );
}
