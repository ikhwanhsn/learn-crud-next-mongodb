import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  const { id } = params;
  const { newName: name, newDescription: description } = await request.json();
  await connectMongoDB();
  await Product.findByIdAndUpdate(id, { name, description });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function GET(request: Request, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}
