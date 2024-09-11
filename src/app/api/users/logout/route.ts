import { ConnectDb } from "@/dbConfig/dbConfig";
import User from "@/modals/user.modal";
import { NextRequest, NextResponse } from "next/server";

ConnectDb();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "logoed out successfully",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
