import { ConnectDb } from "@/dbConfig/dbConfig";
import User from "@/modals/user.modal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


ConnectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        console.log("user===>", reqBody)

        if (!user) {
            return NextResponse.json(
                { error: "user is does not exist" },
                { status: 400 }
            );
        }

        console.log("user===>", user)


        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { error: "check your crendentials" },
                { status: 400 }
            );
        }


        const toeknData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(toeknData, process.env.TOKEN_SECRET!, { expiresIn: '1h' })

        const response = NextResponse.json({
            message: "loged in successfully",
            success: true,
        })

        response.cookies.set("token", token, { httpOnly: true })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
