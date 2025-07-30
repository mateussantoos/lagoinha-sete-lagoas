import { NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";
import { clientId, clientSecret, showId } from "../../../services/spotify";

// Esta função será chamada apenas dentro desta rota
async function getAccessToken(): Promise<string> {
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authString}`,
      },
    }
  );
  return response.data.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/shows/${showId}/episodes?market=BR&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Mapeando os dados para o formato que nosso componente espera
    const episodes = response.data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      thumbnail: item.images[0]?.url,
      url: item.external_urls.spotify,
    }));

    return NextResponse.json({ episodes });
  } catch (error) {
    console.error("Erro ao buscar episódios do Spotify:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar dados do Spotify." },
      { status: 500 }
    );
  }
}
