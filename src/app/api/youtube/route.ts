// Exemplo de código para buscar os últimos vídeos de um canal
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });

  const channelId = "UCyzR30utxr1WnY9zuLHXXew";
  const uploadsPlaylistId = channelId.replace(/^UC/, "UU");

  try {
    const response = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId: uploadsPlaylistId,
      maxResults: 10,
    });

    const videos = response.data.items?.map((item) => {
      const snippet = item.snippet;
      const videoId = snippet?.resourceId?.videoId;
      return {
        title: snippet?.title,
        description: snippet?.description,
        thumbnail: snippet?.thumbnails?.high?.url,
        videoId: videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    return NextResponse.json(
      { error: "Erro ao buscar vídeos" },
      { status: 500 }
    );
  }
}
