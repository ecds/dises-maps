import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Field, Label, Radio, RadioGroup, Select } from "@headlessui/react";
import type { Dispatch, SetStateAction } from "react";
import type { TCrop, TCropLayer } from "../map_styles/crop_layers";

interface Props {
  activeCrop: TCrop | undefined;
  activeLayer: TCropLayer | undefined;
  setActiveLayer: Dispatch<SetStateAction<TCropLayer | undefined>>;
}

const LayerSelect = ({ activeCrop, activeLayer, setActiveLayer }: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!activeCrop) {
      setActiveLayer(undefined);
    } else {
      const currentLayer = activeCrop.layers.find(
        (layer) => layer.label === "Current",
      );
      setActiveLayer(currentLayer);
    }
  }, [activeCrop, setActiveLayer]);

  const handleSelect = () => {
    if (!activeCrop) return;

    const selectedLayer = activeCrop.layers.find(
      (layer) => layer.layer === selectRef.current?.value,
    );

    setActiveLayer((selectedLayer as TCropLayer) ?? undefined);
  };

  if (!activeCrop) return <></>;

  return (
    <div className="mt-4">
      <div className="hidden md:block">
        <h4 className="font-league-gothic text-lg md:text-4xl text-[#002C39] font-semibold uppercase tracking-widest">
          {activeCrop.crop} Layers
        </h4>
        <RadioGroup
          value={activeLayer ?? activeCrop.layers[0]}
          onChange={setActiveLayer}
          aria-label={`Select scenario for ${activeCrop.crop}`}
          className={`flex space-y-2 space-x-2 flex-row flex-wrap`}
        >
          {activeCrop.layers.map((layer) => {
            return (
              <Radio
                key={layer.layer}
                value={layer}
                className="group font-league-gothic uppercase tracking-wider text-sm md:text-2xl w-full md:w-auto font-semibold text-black/75 data-checked:text-white relative cursor-pointer rounded-lg bg-[#FFCC53]/75 px-5 py-4 shadow-md transition focus:not-data-focus:outline-none data-checked:bg-[#63AB46] data-focus:outline data-focus:outline-white"
              >
                {layer.label}
              </Radio>
            );
          })}
        </RadioGroup>
      </div>
      <div className="block md:hidden">
        <Field>
          <Label
            htmlFor="layer-select"
            className="font-league-gothic text-lg text-[#002C39] font-semibold uppercase"
          >
            Layers
          </Label>
          <div className="relative">
            <Select
              id="layer-select"
              ref={selectRef}
              className={`mt-3 block w-full appearance-none rounded-lg border-none bg-[#002C39]/5 px-3 py-1.5 text-sm/6 tracking-widest font-semibold text-[#002C39]/75 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 *:text-white`}
              onChange={handleSelect}
              value={activeLayer?.layer ?? ""}
            >
              <option value={""}>Select Layer</option>
              {activeCrop.layers.map((layer) => {
                return (
                  <option key={layer.layer} value={layer.layer}>
                    {layer.label}
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
      </div>
    </div>
  );
  // }

  // return <></>;
};

export default LayerSelect;
