import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    (await cookies()).set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    return NextResponse.json({ message: "Logout bem-sucedido." });
  } catch (error) {
    console.error("Erro no logout:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
