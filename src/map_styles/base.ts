import type {
  StyleSpecification,
  SourceSpecification,
  LayerSpecification,
} from "maplibre-gl";
import { disesMaps } from "./crop_layers";

const tileSources: {
  [_: string]: SourceSpecification;
} = {
  ne2_shaded: {
    maxzoom: 6,
    tileSize: 256,
    tiles: [
      "https://tiles.openfreemap.org/natural_earth/ne2sr/{z}/{x}/{y}.png",
    ],
    type: "raster",
  },
  openmaptiles: {
    type: "vector",
    url: "https://tiles.openfreemap.org/planet",
  },
  //    const url = new URL(`${geoserverHost}/${workspace}/ows`);
  //   url.searchParams.set("service", "WFS");
  //   url.searchParams.set("version", "1.0.0");
  //   url.searchParams.set("request", "GetFeature");
  //   url.searchParams.set("typeName", `${workspace}:${layer}`);
  //   url.searchParams.set("maxFeatures", "500");
  //   url.searchParams.set("outputFormat", "application/json");
  //   return decodeURI(url.toString());
  // };
  disesBoundaries: {
    type: "vector",
    url: "https://pmtiles.ecds.io/dises.json",
  },
};

const disesLayers: LayerSpecification[] = disesMaps.map((layer) => {
  return {
    id: layer,
    source: layer,
    type: "raster",
    layout: { visibility: "none" },
    paint: {
      "raster-opacity": 1,
    },
  };
});

for (const source of disesMaps) {
  tileSources[source] = {
    type: "raster",
    tiles: [
      `https://geoserver.ecds.emory.edu/DISES/gwc/service/wms?layers=DISES:${source}&service=WMS&request=GetMap&styles=&format=image/png&TRANSPARENT=true&version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}`,
    ],
    tileSize: 256,
  };
}

export const base: StyleSpecification = {
  version: 8,
  name: "Default",
  sources: tileSources,
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#f8f4f0" },
    },
    {
      id: "natural_earth",
      type: "raster",
      source: "ne2_shaded",
      maxzoom: 7,
      paint: {
        "raster-opacity": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          0,
          0.6,
          6,
          0.1,
        ],
      },
    },
    {
      id: "landcover_wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "wood"],
      paint: {
        "fill-antialias": false,
        "fill-color": "hsla(98,61%,72%,0.7)",
        "fill-opacity": 0.4,
      },
    },
    {
      id: "landcover_grass",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "grass"],
      paint: {
        "fill-antialias": false,
        "fill-color": "rgba(176, 213, 154, 1)",
        "fill-opacity": 0.3,
      },
    },
    {
      id: "landcover_ice",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "ice"],
      paint: {
        "fill-antialias": false,
        "fill-color": "rgba(224, 236, 236, 1)",
        "fill-opacity": 0.8,
      },
    },
    {
      id: "landcover_wetland",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      minzoom: 12,
      filter: ["==", ["get", "class"], "wetland"],
      paint: {
        "fill-antialias": true,
        "fill-opacity": 0.8,
        "fill-pattern": "wetland_bg_11",
        "fill-translate-anchor": "map",
      },
    },
    {
      id: "landuse_pitch",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "pitch"],
      paint: { "fill-color": "#DEE3CD" },
    },
    {
      id: "landuse_track",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "track"],
      paint: { "fill-color": "#DEE3CD" },
    },
    {
      id: "landuse_cemetery",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "cemetery"],
      paint: { "fill-color": "hsl(75,37%,81%)" },
    },
    {
      id: "landuse_hospital",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "hospital"],
      paint: { "fill-color": "#fde" },
    },
    {
      id: "landuse_school",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", ["get", "class"], "school"],
      paint: { "fill-color": "rgb(236,238,204)" },
    },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      filter: ["!=", ["get", "brunnel"], "tunnel"],
      paint: { "fill-color": "rgb(158,189,255)" },
    },
    {
      id: "landcover_sand",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", ["get", "class"], "sand"],
      paint: { "fill-color": "rgba(247, 239, 195, 1)" },
    },
    {
      id: "aeroway_fill",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "aeroway",
      minzoom: 11,
      filter: [
        "match",
        ["geometry-type"],
        ["MultiPolygon", "Polygon"],
        true,
        false,
      ],
      paint: { "fill-color": "rgba(229, 228, 224, 1)", "fill-opacity": 0.7 },
    },
    ...disesLayers,
    {
      id: "states",
      source: "disesBoundaries",
      "source-layer": "states",
      type: "line",
      paint: {
        "line-color": "#444746",
        "line-width": 1,
        "line-opacity": 0.5,
      },
    },
    {
      id: "districts",
      source: "disesBoundaries",
      "source-layer": "districts",
      type: "line",
      paint: {
        "line-color": "black",
        "line-width": 0.5,
      },
    },
    {
      id: "county-borders",
      source: "disesBoundaries",
      "source-layer": "counties",
      type: "line",
      paint: {
        "line-color": "#444746",
        "line-width": 0.2,
        "line-opacity": 0.5,
      },
    },
    {
      id: "state-interiors",
      source: "disesBoundaries",
      "source-layer": "states",
      type: "fill",
      paint: {
        "fill-opacity": 0,
      },
    },
    {
      id: "district-interiors",
      source: "disesBoundaries",
      "source-layer": "districts",
      type: "fill",
      paint: {
        "fill-opacity": 0,
      },
    },
    {
      id: "county-interiors",
      source: "disesBoundaries",
      "source-layer": "counties",
      type: "fill",
      paint: {
        "fill-opacity": 0,
      },
    },
  ],
};
