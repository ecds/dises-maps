import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { cropLayers } from "../map_styles/crop_layers";
import { Field, Label, Select } from "@headlessui/react";
import type { Dispatch, SetStateAction } from "react";
import type { TCrop, TCropLayer } from "../map_styles/crop_layers";

interface Props {
  activeCrop: TCrop | undefined;
  setActiveCrop: Dispatch<SetStateAction<TCrop | undefined>>;
  setActiveLayer: Dispatch<SetStateAction<TCropLayer | undefined>>;
}

const CropSelect = ({ activeCrop, setActiveCrop }: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSelect = () => {
    const selectedCrop = cropLayers.find(
      (crop) => crop.crop === selectRef.current?.value,
    );

    setActiveCrop((selectedCrop as TCrop) ?? undefined);
  };

  return (
    <Field>
      <Label
        htmlFor="crops"
        // className="block mb-2.5 text-base md:text-xl font-medium text-heading font-league-gothic text-[#002C39] uppercase"
        className="font-league-gothic text-lg md:text-2xl text-[#002C39] font-semibold uppercase"
      >
        Crops
      </Label>
      <div className="relative">
        <Select
          id="crops"
          ref={selectRef}
          onChange={handleSelect}
          value={activeCrop?.crop ?? ""}
          className={`mt-3 block w-full appearance-none rounded-lg border-none bg-[#002C39]/5 px-3 py-1.5 text-sm md:text-lg tracking-wide font-semibold text-[#002C39]/75 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 *:text-white`}
        >
          <option value={""}>Select Crop</option>
          {cropLayers.map((crop) => {
            return (
              <option key={crop.crop} value={crop.crop}>
                {crop.crop}
              </option>
            );
          })}
        </Select>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
          aria-hidden="true"
        />
      </div>
    </Field>
  );
};

export default CropSelect;
