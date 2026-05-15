export type TCropLayer = { label: string; layer: string };

export type TCrop = {
  crop: string;
  className: string;
  layers: TCropLayer[];
};

export const cropLayers = [
  {
    crop: "Barley",
    layers: [
      { label: "Current", layer: "Historical_BARLEY_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_BARLEY_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_BARLEY_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_BARLEY_AG_DELPHI" },
      { label: "SSP 586", layer: "ssp586_BARLEY_AG_DELPHI" },
    ],
    className: "bg-amber-700",
  },
  {
    crop: "Corn",
    layers: [
      { label: "Current", layer: "Historical_CORN_AG_2009_2019" },
      { label: "SSP 370", layer: "ssp370_CORN_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_CORN_AG_DELPHI" },
      { label: "SSP 586", layer: "ssp586_CORN_AG_DELPHI" },
      { label: "SSP 245", layer: "ssp245_CORN_AG_DELPHI" },
    ],
    className: "bg-yellow-700",
  },
  {
    crop: "Cotton",
    layers: [
      { label: "Current", layer: "Historical_COTTON_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_COTTON_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_COTTON_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_COTTON_AG_DELPHI" },
    ],
    className: "bg-lime-700",
  },
  {
    crop: "Fruit & Vegetables",
    layers: [
      { label: "Current", layer: "Historical_FRUITVEG_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_FRUITVEG_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_FRUITVEG_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_FRUITVEG_AG_DELPHI" },
    ],
    className: "bg-green-700",
  },
  {
    crop: "Hay & Alfalfa",
    layers: [
      { label: "Current", layer: "Historical_HAY_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_HAY_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_HAY_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_HAY_AG_DELPHI" },
    ],
    className: "bg-emerald-700",
  },
  {
    crop: "Oats",
    layers: [
      { label: "Current", layer: "Historical_OATS_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_OATS_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_OATS_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_OATS_AG_DELPHI" },
    ],
    className: "bg-teal-700",
  },
  {
    crop: "Pasture",
    layers: [
      { label: "Current", layer: "Historical_PASTURE_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_PASTURE_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_PASTURE_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_PASTURE_AG_DELPHI" },
    ],
    className: "bg-cyan-700",
  },
  {
    crop: "Peanuts",
    layers: [
      { label: "Current", layer: "Historical_PEANUTS_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_PEANUTS_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_PEANUTS_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_PEANUTS_AG_DELPHI" },
    ],
    className: "bg-sky-700",
  },
  {
    crop: "Pecans",
    layers: [
      { label: "Current", layer: "Historical_PECANS_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_PECANS_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_PECANS_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_PECANS_AG_DELPHI" },
    ],
    className: "bg-blue-700",
  },
  {
    crop: "Rye",
    layers: [
      { label: "Current", layer: "Historical_RYE_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_RYE_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_RYE_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_RYE_AG_DELPHI" },
    ],
    className: "bg-indigo-700",
  },
  {
    crop: "Sorghum",
    layers: [
      { label: "Current", layer: "Historical_SORGHUM_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_SORGHUM_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_SORGHUM_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_SORGHUM_AG_DELPHI" },
    ],
    className: "bg-violet-700",
  },
  {
    crop: "Soy",
    layers: [
      { label: "Current", layer: "Historical_SOY_AG_2009_2019" },
      { label: "SSP 245", layer: "ssp245_SOY_AG_DELPHI" },
      { label: "SSP 370", layer: "ssp370_SOY_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_SOY_AG_DELPHI" },
    ],
    className: "bg-purple-700",
  },
  {
    crop: "Wheat",
    layers: [
      { label: "Current", layer: "ssp370_WHEAT_AG_DELPHI" },
      // { label: "SSP 370", layer: "ssp370_WHEAT_AG_DELPHI" },
      { label: "SSP 585", layer: "ssp585_WHEAT_AG_DELPHI" },
    ],
    className: "bg-fuchsia-700",
  },
];

export const disesMaps = cropLayers
  .map((crop) => crop.layers)
  .flat()
  .map((layer) => layer.layer)
  .filter((l) => l !== undefined);

export const crops = cropLayers.map((l) => l.crop);
