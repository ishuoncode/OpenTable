import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest, res: NextResponse) {
    console.log("🚀 ~ file: middleware.ts:4 ~ middleware ~ middleware:", "I am a middleware and called  before endpoints")

    //check if bearer token exist 
    const bearerToken = req.headers.get("authorization") as string;

    if (!bearerToken) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized request" }), { status: 401 },)
    }

    const token = bearerToken.split(" ")[1]

    if (!token) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized request" }), { status: 401 },)
    }
    // verify jwt token 
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jwtVerify(token, secret);
    } catch (err) {
        return new NextResponse(JSON.stringify( "Unauthorized request" ), { status: 401 })
    }
}
export const config = {
    matcher: ["/api/auth/me"]
}