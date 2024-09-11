import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";

    
    const decodedTotken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedTotken?.id;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
