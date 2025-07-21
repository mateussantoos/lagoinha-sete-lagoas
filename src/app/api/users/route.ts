import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Criar novo usuário
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "A senha é obrigatória." },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json(
        { error: "Este e-mail já está em uso." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}

// Listar todos os usuários
export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// Editar usuário existente
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, password, role } = body;

    if (!id) {
      return NextResponse.json(
        { error: "O ID do usuário é obrigatório para edição." },
        { status: 400 }
      );
    }

    // Monta os dados para atualização
    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (password) {
      const saltRounds = 10;
      dataToUpdate.password = await bcrypt.hash(password, saltRounds);
    }
    if (role) dataToUpdate.role = role;
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: "Nenhum dado para atualizar." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao editar usuário:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json(
        { error: "Este e-mail já está em uso." },
        { status: 409 }
      );
    }
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Usuário não encontrado para atualização." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Erro ao editar usuário" },
      { status: 500 }
    );
  }
}
