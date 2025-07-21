"use client";
import { useState, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap, // Importamos o hook
} from "@vis.gl/react-google-maps";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MarkerLagoinha from "@/assets/webp/marker_lagoinha.webp";
import { Menu, X } from "lucide-react";

// 1. CRIAMOS UM NOVO SUB-COMPONENTE PARA O CONTEÚDO DO MAPA
const MapContent = ({ gcs }: { gcs: any[] }) => {
  const [selectedGc, setSelectedGc] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 2. AGORA USAMOS O HOOK 'useMap' AQUI DENTRO, COMO FILHO DO APIProvider
  const map = useMap();

  const gcsComCoordenadas = gcs.filter((gc) => gc.latitude && gc.longitude);

  const handleGcClick = useCallback(
    (gc: any) => {
      setSelectedGc(gc);
      if (map) {
        map.panTo({ lat: gc.latitude, lng: gc.longitude });
        map.setZoom(15);
      }
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    },
    [map]
  );

  return (
    <>
      {/* Botão para abrir/fechar sidebar no mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-4 left-4 z-20 p-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full shadow-lg"
        aria-label="Toggle GC list"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar / Gaveta */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full w-full max-w-sm bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10"
          >
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-center items-center h-[60px]">
              <h2 className="font-bebas text-2xl">Encontre um GC</h2>
            </div>
            <ul className="overflow-y-auto h-[calc(100%-60px)]">
              {gcsComCoordenadas.map((gc) => (
                <li
                  key={gc.id}
                  onClick={() => handleGcClick(gc)}
                  className="p-4 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-primary/10 transition-colors"
                >
                  <h3 className="font-bebas text-lg text-primary">{gc.name}</h3>
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
        )}
      </AnimatePresence>

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
            onClick={() => handleGcClick(gc)}
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
            position={{ lat: selectedGc.latitude, lng: selectedGc.longitude }}
            onCloseClick={() => setSelectedGc(null)}
          >
            <div className="p-2 text-black">
              <h4 className="font-bebas text-lg">{selectedGc.name}</h4>
              <p className="font-lato text-sm">{selectedGc.address}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </>
  );
};

export const MapaGCs = ({ gcs }: { gcs: any[] }) => {
  return (
    <section className="bg-stone-100 dark:bg-neutral-900 py-24">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[70vh] w-full rounded-2xl shadow-xl overflow-hidden">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY!}>
            <MapContent gcs={gcs} />
          </APIProvider>
        </div>
      </div>
    </section>
  );
};
