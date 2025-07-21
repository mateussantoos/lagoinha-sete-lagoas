"use client";
import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { motion } from "framer-motion";
import MarkerLagoinha from "@/assets/webp/marker_lagoinha.webp";

export const MapaGCs = ({ gcs }: { gcs: any[] }) => {
  const [selectedGc, setSelectedGc] = useState<any | null>(null);

  const gcsComCoordenadas = gcs.filter((gc) => gc.latitude && gc.longitude);

  return (
    // A seção agora controla o padding e o fundo
    <section className=" py-24">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Este container agora define a altura, bordas e sombra do mapa */}
        <div className="relative h-[70vh] w-full rounded-2xl shadow-xl overflow-hidden">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY!}>
            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full w-full max-w-sm bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10"
            >
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="font-bebas text-2xl text-center">
                  Encontre um GC
                </h2>
              </div>
              <ul className="overflow-y-auto h-[calc(100%-60px)]">
                {gcsComCoordenadas.map((gc) => (
                  <li
                    key={gc.id}
                    onClick={() => setSelectedGc(gc)}
                    className="p-4 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    <h3 className="font-bebas text-lg text-primary">
                      {gc.name}
                    </h3>
                    <p className="font-lato text-sm text-neutral-600 dark:text-neutral-400">
                      {gc.address}
                    </p>
                    <p className="font-lato text-xs text-neutral-500 mt-1">
                      Líderes: {gc.leaders.map((l: any) => l.name).join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Mapa */}
            <Map
              defaultCenter={{ lat: -19.46, lng: -44.24 }}
              defaultZoom={13}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
              mapId={"lagoinha-map-style"}
            >
              {gcsComCoordenadas.map((gc) => (
                <AdvancedMarker
                  key={gc.id}
                  position={{ lat: gc.latitude, lng: gc.longitude }}
                  onClick={() => setSelectedGc(gc)}
                >
                  <img
                    src={MarkerLagoinha.src}
                    alt={`Marcador para o GC ${gc.name}`}
                    className="w-8 h-8 transition-transform duration-300 hover:scale-125"
                  />
                </AdvancedMarker>
              ))}

              {selectedGc && (
                <InfoWindow
                  position={{
                    lat: selectedGc.latitude,
                    lng: selectedGc.longitude,
                  }}
                  onCloseClick={() => setSelectedGc(null)}
                >
                  <div className="p-2 text-black">
                    <h4 className="font-bebas text-lg">{selectedGc.name}</h4>
                    <p className="font-lato text-sm">{selectedGc.address}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      </div>
    </section>
  );
};
