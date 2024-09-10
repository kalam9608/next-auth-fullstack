import { ConnectDb } from "@/dbConfig/dbConfig";
import User from "@/modals/user.modal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/hepers/mailer";

ConnectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    console.log("user===>",user)

    if (user) {
      return NextResponse.json(
        { error: "user is already exist" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);

    const hasedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hasedPassword,
    });

    const savedUser = await newUser.save();

    console.log("saved user====>", savedUser);

    // mail verify

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser?._id });

    return NextResponse.json({
      message: "user succesfully created",
      status: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
