import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, description } = await request.json();
  await connectMongoDB();
  await Product.create({ name, description });
  return NextResponse.json({ message: "Product created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json({ products });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Products deleted" }, { status: 200 });
}
