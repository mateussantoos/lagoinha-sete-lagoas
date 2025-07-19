import axios from "axios";
import qs from "qs";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const showId = process.env.SPOTIFY_SHOW_ID;

// Função para obter o token de acesso da API do Spotify
async function getAccessToken(): Promise<string> {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token", // URL CORRETA AQUI
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      },
    }
  );
  return res.data.access_token;
}

// Função que o seu componente vai chamar
export async function getPodcastEpisodes() {
  const token = await getAccessToken();

  const res = await axios.get(
    `https://api.spotify.com/v1/shows/${showId}/episodes?market=BR`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // A API do Spotify retorna os episódios dentro de 'items'
  return res.data.items;
}
