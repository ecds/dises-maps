import { useEffect, useRef, useState } from "react";
import { LngLat, LngLatBounds, Map } from "maplibre-gl";
import { base } from "./map_styles/base";
import { disesMaps } from "./map_styles/crop_layers";
import PopupContent from "./components/PopupContent";
import CropSelect from "./components/CropSelect";
import "maplibre-gl/dist/maplibre-gl.css";
import LayerSelect from "./components/LayerSelect";
import type { TCrop, TCropLayer } from "./map_styles/crop_layers";

const App = () => {
  const [activeCrop, setActiveCrop] = useState<TCrop | undefined>(undefined);
  const [activeLayer, setActiveLayer] = useState<TCropLayer | undefined>(
    undefined,
  );
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const boundsRef = useRef<LngLatBounds>(
    new LngLatBounds(
      new LngLat(-108.168457, 18.624623),
      new LngLat(-57.005919, 50.584457),
    ),
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const _map = new Map({
      container: mapContainerRef.current,
      style: base,
      bounds: boundsRef.current,
    });

    _map.setMaxBounds(boundsRef.current);

    _map.on("load", () => setMap(_map));

    return () => {
      _map?.remove();
      setMap(undefined);
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    map.fitBounds(boundsRef.current);
    for (const mapLayer of disesMaps) {
      map.setLayoutProperty(mapLayer, "visibility", "none");
    }

    console.log("🚀 ~ App ~ activeLayer:", activeLayer);
    if (activeLayer)
      map.setLayoutProperty(activeLayer.layer, "visibility", "visible");
  }, [activeLayer, map]);

  useEffect(() => {
    if (!map) return;

    const mapRecenter = () => {
      map.once("moveend", () => {
        map.setCenter(boundsRef.current.getCenter());
      });
      map.fitBounds(boundsRef.current);
    };

    window.addEventListener("resize", mapRecenter);

    return () => window.removeEventListener("resize", mapRecenter);
  }, [map]);

  return (
    <div className="flex-col bg-[#FFF4E8]">
      <section className="flex flex-col-reverse md:flex-row justify-between">
        <div className="w-full md:w-1/3 flex flex-col p-8 h-full md:h-[150vh]">
          <CropSelect
            activeCrop={activeCrop}
            setActiveCrop={setActiveCrop}
            setActiveLayer={setActiveLayer}
          />
          <LayerSelect
            activeCrop={activeCrop}
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
          />
        </div>
        <div className="w-full md:w-2/3 sticky top-0 h-full">
          <div
            className="h-[50vh] md:h-[calc(100vh-145px)]"
            ref={mapContainerRef}
          ></div>
        </div>
      </section>
      <PopupContent map={map} activeCrop={activeCrop} />
    </div>
  );
};

export default App;
