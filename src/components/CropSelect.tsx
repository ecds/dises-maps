import { useRef } from "react";
import { cropLayers } from "../map_styles/crop_layers";
import type { Dispatch, SetStateAction } from "react";
import type { TCrop } from "../map_styles/crop_layers";

interface Props {
  activeCrop: TCrop | undefined;
  setActiveCrop: Dispatch<SetStateAction<TCrop | undefined>>;
  setActiveLayer: Dispatch<SetStateAction<string | undefined>>;
}

const CropSelect = ({ activeCrop, setActiveCrop, setActiveLayer }: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSelect = () => {
    const selectedCrop = cropLayers.find(
      (crop) => crop.crop === selectRef.current?.value,
    );

    setActiveCrop((selectedCrop as TCrop) ?? undefined);
    if (!selectedCrop) {
      setActiveLayer(undefined);
    } else if (selectedCrop?.historic) {
      setActiveLayer(selectedCrop.historic as string);
    } else if (selectedCrop.future && selectedCrop?.future[0]) {
      setActiveLayer(selectedCrop.future[0]);
    } else {
      setActiveLayer(undefined);
    }
  };

  return (
    <form action="">
      <label
        htmlFor="crops"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        Crops
      </label>
      <select
        id="crops"
        ref={selectRef}
        onChange={handleSelect}
        value={activeCrop?.crop ?? ""}
        className="block bg-white w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        <option value={""}>Select Crop</option>
        {cropLayers.map((crop) => {
          return (
            <option key={crop.crop} value={crop.crop}>
              {crop.crop}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default CropSelect;
