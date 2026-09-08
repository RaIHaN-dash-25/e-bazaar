import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";


// GET ALL PRODUCTS (PUBLIC)
export async function GET() {
  try {

    const products = await prisma.product.findMany({
      include: {
        rating: true,
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });


    return NextResponse.json({
      success: true,
      products,
    });


  } catch (error) {

    console.error("GET_PRODUCTS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}



// CREATE PRODUCT
export async function POST(req) {

  try {

    const { userId } = await auth();


    if (!userId) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }



    // Find logged-in user's store
    const store = await prisma.store.findUnique({
      where: {
        userId,
      },
    });



    if (!store) {

      return NextResponse.json(
        {
          success: false,
          message: "Store not found",
        },
        {
          status: 404,
        }
      );

    }



    const formData = await req.formData();


    const name = formData.get("name");
    const description = formData.get("description");
    const mrp = Number(formData.get("mrp"));
    const price = Number(formData.get("price"));
    const category = formData.get("category");


    const files = formData.getAll("images");



    if (!name || !description || !mrp || !price || !category) {

      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );

    }



    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads"
    );


    await fs.mkdir(uploadDir, {
      recursive: true,
    });



    const imageUrls = [];



    for (const file of files) {

      if (!file || file.size === 0) continue;


      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);


      const safeFileName = file.name.replaceAll(" ", "-");

      const fileName = `${Date.now()}-${safeFileName}`;


      const filePath = path.join(
        uploadDir,
        fileName
      );


      await fs.writeFile(
        filePath,
        buffer
      );


      imageUrls.push(
        `/uploads/${fileName}`
      );

    }



    const product = await prisma.product.create({

      data: {

        name,

        description,

        mrp,

        price,

        category,


        images:
          imageUrls.length > 0
            ? imageUrls
            : [
                "/products/product_img1.png"
              ],


        // FIXED HERE
        storeId: store.id,


        inStock: true,

      },

    });



    return NextResponse.json({

      success: true,

      message: "Product added successfully",

      product,

    });



  } catch (error) {


    console.error(
      "CREATE_PRODUCT_ERROR:",
      error
    );


    return NextResponse.json(

      {
        success: false,
        message: "Failed to add product",
      },

      {
        status: 500,
      }

    );

  }

}