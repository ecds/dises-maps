export type TCrop = {
  crop: string;
  historic: string;
  future: string;
  className: string;
};

export const cropLayers = [
  {
    crop: "Barley",
    historic: "Historical_BARLEY_AG_2009_2019",
    future: "ssp586_BARLEY_AG_DELPHI",
    className: "bg-amber-700",
  },
  {
    crop: "Corn",
    historic: "Historical_CORN_AG_2009_2019",
    future: "ssp586_CORN_AG_DELPHI",
    className: "bg-yellow-700",
  },
  {
    crop: "Cotton",
    historic: "Historical_COTTON_AG_2009_2019",
    future: "ssp585_COTTON_AG_DELPHI",
    className: "bg-lime-700",
  },
  {
    crop: "Fruit & Vegetables",
    historic: "Historical_FRUITVEG_AG_2009_2019",
    future: "ssp585_FRUITVEG_AG_DELPHI",
    className: "bg-green-700",
  },
  {
    crop: "Hay & Alfalfa",
    historic: "Historical_HAY_AG_2009_2019",
    future: "ssp585_HAY_AG_DELPHI",
    className: "bg-emerald-700",
  },
  {
    crop: "Oats",
    historic: "Historical_OATS_AG_2009_2019",
    future: "ssp585_OATS_AG_DELPHI",
    className: "bg-teal-700",
  },
  {
    crop: "Pasture",
    historic: "Historical_PASTURE_AG_2009_2019",
    future: "ssp585_PASTURE_AG_DELPHI",
    className: "bg-cyan-700",
  },
  {
    crop: "Peanuts",
    historic: "Historical_PEANUTS_AG_2009_2019",
    future: "ssp585_PEANUTS_AG_DELPHI",
    className: "bg-sky-700",
  },
  {
    crop: "Pecans",
    historic: "Historical_PECANS_AG_2009_2019",
    future: "ssp585_PECANS_AG_DELPHI",
    className: "bg-blue-700",
  },
  {
    crop: "Rye",
    historic: "Historical_RYE_AG_2009_2019",
    future: "ssp585_RYE_AG_DELPHI",
    className: "bg-indigo-700",
  },
  {
    crop: "Sorghum",
    historic: "Historical_SORGHUM_AG_2009_2019",
    future: "ssp585_SORGHUM_AG_DELPHI",
    className: "bg-violet-700",
  },
  {
    crop: "Soy",
    historic: "Historical_SOY_AG_2009_2019",
    future: "ssp585_SOY_AG_DELPHI",
    className: "bg-purple-700",
  },
  {
    crop: "Wheat",
    historic: "ssp370_WHEAT_AG_DELPHI",
    future: "ssp585_WHEAT_AG_DELPHI",
    className: "bg-fuchsia-700",
  },
];

export const disesMaps = [
  ...cropLayers.map((l) => l.historic),
  ...cropLayers.map((l) => l.future),
]
  .flat()
  .filter((l) => l !== undefined);

export const crops = cropLayers.map((l) => l.crop);
