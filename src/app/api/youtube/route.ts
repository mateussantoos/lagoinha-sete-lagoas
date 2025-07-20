import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });

  const channelId = "UCyzR30utxr1WnY9zuLHXXew";

  try {
    const uploadsPlaylistId = channelId.replace(/^UC/, "UU");
    const playlistResponse = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId: uploadsPlaylistId,
      maxResults: 5,
    });

    const recentVideos =
      playlistResponse.data.items?.map((item) => {
        const snippet = item.snippet;
        const videoId = snippet?.resourceId?.videoId;
        return {
          title: snippet?.title || "Título indisponível",
          thumbnail: snippet?.thumbnails?.high?.url || "",
          videoId: videoId || "",
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      }) ?? [];

    const videoIds = recentVideos.map((video) => video.videoId).filter(Boolean);

    const videosResponse = await youtube.videos.list({
      part: ["snippet", "liveStreamingDetails"],
      id: videoIds,
    });

    const liveVideoDetails = videosResponse.data.items?.find(
      (video) =>
        video.liveStreamingDetails &&
        video.liveStreamingDetails.actualStartTime &&
        !video.liveStreamingDetails.actualEndTime
    );

    if (liveVideoDetails && liveVideoDetails.id) {
      return NextResponse.json({
        isLive: true,
        liveVideo: {
          videoId: liveVideoDetails.id,
          title: liveVideoDetails.snippet?.title,
          url: `https://www.youtube.com/watch?v=${liveVideoDetails.id}`,
        },
        recentVideos: recentVideos,
      });
    }

    return NextResponse.json({
      isLive: false,
      liveVideo: null,
      recentVideos: recentVideos,
    });
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    return NextResponse.json(
      { error: "Erro ao buscar vídeos", isLive: false, recentVideos: [] },
      { status: 500 }
    );
  }
}
