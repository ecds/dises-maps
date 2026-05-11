import type { Dispatch, SetStateAction } from "react";
import type { TCrop } from "../map_styles/crop_layers";

interface Props {
  activeCrop: TCrop | undefined;
  activeLayer: string | undefined;
  setActiveLayer: Dispatch<SetStateAction<string | undefined>>;
}

const LayerSelect = ({ activeCrop, activeLayer, setActiveLayer }: Props) => {
  return (
    <div className="mt-4 flex flex-col items-start">
      {activeCrop?.historic && (
        <button
          className={`cursor-pointer text-blue-500 hover:text-blue-700 underline my-1 ${activeLayer === activeCrop?.historic ? "font-extrabold" : ""}`}
          onClick={() => setActiveLayer(activeCrop.historic)}
        >
          {activeCrop.historic}
        </button>
      )}
      <button
        className={`cursor-pointer text-blue-500 hover:text-blue-700 underline my-1 ${activeLayer === activeCrop?.future ? "font-extrabold" : ""}`}
        onClick={() => setActiveLayer(activeCrop?.future)}
      >
        {activeCrop?.future}
      </button>
    </div>
  );
  // }

  // return <></>;
};

export default LayerSelect;
