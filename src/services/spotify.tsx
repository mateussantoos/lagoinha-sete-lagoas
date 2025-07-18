import axios from "axios";
import qs from "qs";

const clientId = "072a05a59b3a41b58040e0b9289c7e72";
const clientSecret = "c625665c7a30400092a504fbbab75775";
const showId = "5x0MX89vtXZtAwJIwD8qMO";

async function getAccessToken(): Promise<string> {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
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

export async function getPodcastEpisodes() {
  const token = await getAccessToken();

  const res = await axios.get(
    `https://api.spotify.com/v1/shows/${showId}?market=BR`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.episodes.items; // retorna apenas os episódios
}
