import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Esta API agora tem uma única responsabilidade: receber um token do frontend
// e salvá-lo em um cookie seguro. A verificação da senha acontece no frontend.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Token não fornecido." },
        { status: 400 }
      );
    }

    // Cria o cookie de sessão seguro com o token recebido
    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, 
    });

    return NextResponse.json({ message: "Sessão criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar sessão:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
