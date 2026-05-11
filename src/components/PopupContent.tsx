import { Popup } from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LngLat, Map, MapLayerMouseEvent } from "maplibre-gl";
import type { TCrop } from "../map_styles/crop_layers";

type CropValues = { f: number; h: number };
type CropData = Record<string, Record<string, CropValues>>;

let cache: CropData | null = null;

interface Props {
  map: Map | undefined;
  activeCrop: TCrop | undefined;
}

const PopupContent = ({ map, activeCrop }: Props) => {
  const [cropData, setCropData] = useState<CropData | null>(cache);
  const [activeCounty, setActiveCounty] = useState<string | undefined>(
    undefined,
  );
  const [activeDistrict, setActiveDistrict] = useState<string | undefined>(
    undefined,
  );
  const [activeState, setActiveState] = useState<string | undefined>(undefined);
  const [activeCropData, setActiveCropData] = useState<CropValues | undefined>(
    undefined,
  );
  const [mouseLocation, setMouseLocation] = useState<LngLat | undefined>(
    undefined,
  );
  const popupRef = useRef<Popup>(
    new Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "300px",
    }),
  );
  const popContainerRef = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://dises-public.s3.us-east-1.amazonaws.com/data/crops.json",
      );
      cache = await response.json();
      setCropData(cache);
    };

    if (cache) return;

    fetchData();
  }, []);

  const findCropData = useCallback(
    (id: string | undefined) => {
      if (!id || !activeCrop || !activeCounty || !cropData) return;

      setActiveCropData(cropData[id][activeCrop.crop.toUpperCase()]);
    },
    [activeCounty, activeCrop, cropData],
  );

  useEffect(() => {
    if (!map) return;

    const eventFeature = (prop: string, e: MapLayerMouseEvent) => {
      if (e.features && e.features.length > 0)
        return e.features[0].properties[prop].toString().toLowerCase();
      return undefined;
    };

    const handleCountyHover = (e: MapLayerMouseEvent) => {
      if (map) map.getCanvas().style.cursor = "pointer";

      setMouseLocation(e.lngLat);
      setActiveCounty(eventFeature("NAME", e));
      if (activeCrop && e.features)
        findCropData(e.features[0].properties.GEOID);
    };

    const handleDistrictHover = (e: MapLayerMouseEvent) => {
      setActiveDistrict(eventFeature("STASD_N", e));
    };

    const handleStateHover = (e: MapLayerMouseEvent) => {
      setActiveState(eventFeature("NAME", e));
    };

    const handleLeave = () => {
      popupRef.current.remove();
      setActiveCounty(undefined);
      setActiveDistrict(undefined);
      setActiveState(undefined);
      setMouseLocation(undefined);
    };

    map.on("mousemove", "county-interiors", handleCountyHover);
    map.on("mousemove", "district-interiors", handleDistrictHover);
    map.on("mousemove", "state-interiors", handleStateHover);
    map.on("mouseleave", "county-interiors", handleLeave);

    return () => {
      map.off("mousemove", "county-interiors", handleCountyHover);
      map.off("mousemove", "district-interiors", handleDistrictHover);
      map.off("mousemove", "state-interiors", handleStateHover);
      map.off("mousemove", "state-interiors", handleLeave);
    };
  }, [map, findCropData, activeCrop]);

  useEffect(() => {
    if (!map || !mouseLocation) {
      popupRef.current.remove();
    } else {
      popupRef.current
        .setLngLat(mouseLocation)
        .setDOMContent(popContainerRef.current)
        .addTo(map);
    }
  }, [map, mouseLocation]);

  return (
    <>
      {map &&
        createPortal(
          <div
            ref={popContainerRef}
            className={`z-1000 ${activeCounty ? "block" : "hidden"}`}
          >
            {activeCounty && (
              <>
                <h3 className="text-base capitalize">
                  {activeCounty} County, {activeState}
                </h3>
                <p>District {activeDistrict}</p>
                {activeCropData && activeCrop && (
                  <table className="mt-4 w-full text-sm rounded-md overflow-hidden shadow-sm border border-gray-100">
                    <caption
                      className={`text-left text-xs font-bold uppercase tracking-widest text-white ${activeCrop.className} px-4 py-2 caption-top`}
                    >
                      {activeCrop.crop}
                    </caption>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-4 py-3 text-gray-500 font-medium">
                          Current
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-right">
                          {activeCropData.h}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-500 font-medium">
                          Future
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-right">
                          {activeCropData.f}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
};

export default PopupContent;
