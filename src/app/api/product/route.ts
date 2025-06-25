import { NextResponse } from "next/server";
import {prisma} from "@lib/prisma"

export async function GET(){
    // return new NextResponse("ola", { status: 200 });
    try{
        const products = await prisma.product.count({});
        return NextResponse.json(products)
    }
    catch(error){
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}