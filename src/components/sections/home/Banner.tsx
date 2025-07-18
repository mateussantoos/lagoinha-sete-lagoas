"use client";
import Video from "next-video";

export const Banner = () => {
  return (
    <div className="pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Video
          className="w-full object-cover rounded-2xl overflow-hidden"
          src="/videos/videoBanner.webm"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        />
      </div>
    </div>
  );
};
