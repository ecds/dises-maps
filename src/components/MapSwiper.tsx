import { SwipeControlReact, useSwipeState } from "maplibre-gl-swipe/react";
import "maplibre-gl-swipe/style.css";
import type { Map } from "maplibre-gl";
import type { TCrop } from "../map_styles/crop_layers";
import { useEffect } from "react";

interface Props {
  map: Map;
  crop: TCrop;
}

const startPosition = 90;

const MapSwiper = ({ map, crop }: Props) => {
  const { state, setPosition } = useSwipeState({
    position: startPosition,
    orientation: "vertical",
    leftLayers: [
      crop.historic,
      "districts",
      "county-borders",
      "county-interiors",
    ],
    rightLayers: [
      crop.future,
      "districts",
      "county-borders",
      "county-interiors",
    ],
  });

  useEffect(() => {
    setPosition(startPosition);
  }, [crop, setPosition]);

  if (map && crop) {
    return (
      <SwipeControlReact
        map={map}
        position={state.position}
        orientation={state.orientation}
        leftLayers={state.leftLayers}
        rightLayers={state.rightLayers}
        onSlide={setPosition}
      />
    );
  }

  return <></>;
};

export default MapSwiper;
