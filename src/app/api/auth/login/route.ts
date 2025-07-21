import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Encontrar o usuário pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Se o usuário não existe, retorna erro genérico
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // 2. Comparar a senha enviada com a senha criptografada no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Se a senha estiver incorreta, retorna o mesmo erro genérico
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // 3. Se a senha estiver correta, criar o token de sessão (JWT)
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d", // Token expira em 1 dia
    });

    // 4. Enviar o token para o navegador em um cookie seguro
    (await cookies()).set("auth_token", token, {
      httpOnly: true, // O cookie não pode ser acessado por JavaScript no navegador
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 dia em segundos
    });

    return NextResponse.json({ message: "Login bem-sucedido!" });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
