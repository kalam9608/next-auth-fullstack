import { ConnectDb } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/hepers/getDataFromToken";
import User from "@/modals/user.modal";
import { NextRequest, NextResponse } from "next/server";

ConnectDb();

export async function POST(request: NextRequest) {
  try {
    const userId =await getDataFromToken(request);

    const user = await User.findById({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "user not exist" }, { status: 400 });
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
