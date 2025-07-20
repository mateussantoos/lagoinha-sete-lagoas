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

    const videoIds =
      playlistResponse.data.items
        ?.map((item) => item.snippet?.resourceId?.videoId)
        .filter((id): id is string => !!id) ?? [];

    if (videoIds.length === 0) {
      return NextResponse.json({ isLive: false, liveVideo: null });
    }

    const videosResponse = await youtube.videos.list({
      part: ["snippet", "liveStreamingDetails"],
      id: videoIds,
    });

    const liveVideo = videosResponse.data.items?.find(
      (video) =>
        video.liveStreamingDetails &&
        video.liveStreamingDetails.actualStartTime &&
        !video.liveStreamingDetails.actualEndTime
    );

    if (liveVideo && liveVideo.id) {
      return NextResponse.json({
        isLive: true,
        liveVideo: {
          videoId: liveVideo.id,
          title: liveVideo.snippet?.title,
          url: `https://www.youtube.com/watch?v=${liveVideo.id}`,
        },
      });
    }

    return NextResponse.json({ isLive: false, liveVideo: null });
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    return NextResponse.json(
      { error: "Erro ao buscar vídeos", isLive: false },
      { status: 500 }
    );
  }
}
