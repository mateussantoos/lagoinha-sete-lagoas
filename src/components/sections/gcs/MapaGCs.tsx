"use client";
import { useState, useEffect, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MarkerLagoinha from "@/assets/webp/marker_lagoinha.webp";
import { Calendar, Clock, Info, Menu, Users, X } from "lucide-react";

type GC = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  leaders: { name: string }[];
  day: string;
  time: string;
};
// Sub-componente para o conteúdo do mapa, para que o useMap() funcione
const MapContent = ({ gcs }: { gcs: GC[] }) => {
  const [selectedGc, setSelectedGc] = useState<GC | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const map = useMap();

  const handleGcClick = useCallback(
    (gc: GC) => {
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

  // Função para formatar o dia da semana
  const formatDay = (day: string) => {
    const dayName = day.charAt(0).toUpperCase() + day.slice(1);
    if (dayName.endsWith("a")) return `${dayName}-feira`;
    return dayName;
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-4 left-4 z-20 p-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full shadow-lg"
        aria-label="Toggle GC list"
      >
        {isSidebarOpen ? (
          <X size={20} className="dark:text-neutral-300" />
        ) : (
          <Menu size={20} className="dark:text-neutral-300" />
        )}
      </button>

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
              <h2 className="font-bebas text-2xl dark:text-neutral-200">
                Encontre um GC
              </h2>
            </div>
            <ul className="overflow-y-auto h-[calc(100%-60px)]">
              {gcs.map((gc) => (
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
                    Líderes: {gc.leaders.map((l) => l.name).join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <Map
        defaultCenter={{ lat: -19.46, lng: -44.24 }}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={"lagoinha-map-style"}
      >
        {gcs.map((gc) => (
          <AdvancedMarker
            key={gc.id}
            position={{ lat: gc.latitude, lng: gc.longitude }}
            onClick={() => handleGcClick(gc)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
            pixelOffset={[0, -50]}
          >
            {/* 2. Conteúdo do InfoWindow atualizado com todas as informações */}
            <div className="p-2 text-neutral-800 min-w-64">
              <h4 className="font-bebas text-xl text-primary mb-2">
                {selectedGc.name}
              </h4>
              <p className="font-lato text-sm mb-3">{selectedGc.address}</p>
              <div className="space-y-2 text-sm border-t border-neutral-200 pt-2">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-neutral-500" />
                  <span>
                    {selectedGc.leaders.map((l) => l.name).join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-neutral-500" />
                  <span>{formatDay(selectedGc.day)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-neutral-500" />
                  <span>{selectedGc.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info size={14} className="text-neutral-500" />
                  <span>{selectedGc.description}</span>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </>
  );
};

// Componente principal que busca os dados
export const MapaGCs = () => {
  const [gcs, setGcs] = useState<GC[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGcs = async () => {
      try {
        const response = await fetch("/api/gcs");
        const data = await response.json();
        const gcsComCoordenadas = data.filter(
          (gc: any) => gc.latitude && gc.longitude
        );
        setGcs(gcsComCoordenadas);
      } catch (error) {
        console.error("Erro ao buscar GCs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGcs();
  }, []);

  return (
    <section className="bg-stone-100 dark:bg-neutral-900 py-24">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[70vh] w-full rounded-2xl shadow-xl overflow-hidden">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <MapContent gcs={gcs} />
          </APIProvider>
        </div>
      </div>
    </section>
  );
};
