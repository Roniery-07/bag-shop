import { NextResponse } from "next/server";
import { listProducts } from "@/lib/db/product";

export async function GET(){
    try{
        const products= await listProducts();
        return NextResponse.json(products);
    }
    catch(error){
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}