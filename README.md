# React Component for DISES Map Visualization

Components used for the [Thriving Future Cropscapes](https://www.thrivingfuturecropscapes.org/data-visualizations/) data visualizations.

## Example Use in Static HTML

Include the [CSS]() and [JavaScript File]() in the HTML document. In the body, include an empty DIV element with the id "map-viz". The JavaScript will take over that DIV and render the visualization. Below is a simple example.

```html
<html>
  <head>
    <link
      rel="stylesheet"
      id="map-viz-styles-css"
      href="https://dises-public.s3.us-east-1.amazonaws.com assets/index.css?ver=1.0.0"
      media="all"
    />
  </head>
  <body>
    <div id="map-viz"></div>
    <script
      src="https://dises-public.s3.us-east-1.amazonaws.com/assets/index.js?ver=1.0.0"
      id="map-viz-js-js"
    ></script>
  </body>
</html>
```

## Run the Components Locally

Install the dependencies and run the dev server:

```bash
npm install
npm run dev
```

The code should be running at [localhost:5173](http://localhost:5173).

## Update Code

The code is built and hosted in a S3 bucket - "dises-public" - with all the public access and CORS configured there.

### Build the Code

```bash
npm run build
```

Upload all files in the `./dist` directory to the "dises-public" S3 bucket.

## Adding to the WordPress Site

The components are added to a page on the WordPress site using a shortcode. The function in [wp_short_code.php](wp_short_code.php) should be added to the active theme's `functions.php`.

The code can be added to a block as so:

```
[map_viz]
```

## Shapefiles

The original shapefiles were exported as GeoJSON and reporjected to ESPG:4326. The resulting shapefiles are:

- [Counties](shapes/counties_east_4326.json)
- [Districts](shapes/districts_east_4326.json)
- [States](shapes/states_east_4326.json)

These files are used to create a set of PMTiles using [tippecanoe](https://github.com/felt/tippecanoe).

```bash
tippecanoe -o dises.pmtiles -L counties:counties_east_4326.json -L districts:districts_east_4326.json -L states:states_east_4326.json
```

The resulting PMTiles file is uploaded to the "ecds-pmtiles" S3 bucket.

## Rasters

The rasters are hosted on the GeoServer. The original GeoTIFFS were processed using our generalized raster prep for use via WMS. For example:

```bash
files=("tiff1.tif" "tiff2.tif")

processed_dir="processed"
mkdir -p "$processed_dir"

for file in "${files[@]}"; do
  filename="${file%.*}"

  source_epsg=$(gdalsrsinfo -o epsg "$file" | grep -o 'EPSG:[0-9]*')

  gdalwarp -s_srs $source_epsg -t_srs EPSG:3857 \
    -r lanczos \
    -co 'TILED=YES' \
    -co 'BLOCKXSIZE=256' \
    -co 'BLOCKYSIZE=256' \
    -co 'COMPRESS=LZW' \
    -co 'BIGTIFF=IF_SAFER' \
    "${file}" "${filename}.tmp.tiff"

  gdaladdo --config GDAL_TIFF_OVR_BLOCKSIZE 256 \
    -r average \
    "${filename}.tmp.tiff" 2 4 8 16 32 64 128

  gdal_translate \
    -co 'TILED=YES' \
    -co 'BLOCKXSIZE=256' \
    -co 'BLOCKYSIZE=256' \
    -co 'COMPRESS=LZW' \
    -co 'COPY_SRC_OVERVIEWS=YES' \
    -co 'BIGTIFF=IF_SAFER' \
    -co 'ALPHA=YES' \
    -a_nodata 0 \
    "${filename}.tmp.tiff" "${processed_dir}/${file}"
done
```

### Adding the Rasters to GeoServer

The ruby script [geoserver.rb](geoserver.rb) is an example of how to Add the resulting GeoTIFFs to the GeoServer as layers.

You must upload the processed GeoTIFFs to the GeoServer before the steps taken in the ruby script. NOTE: The script assumes you the the location where you uploaded the files in line 10:

```ruby
  add_layer_string = "file:/mnt2/data/public/#{workspace}/3857/#{tiff}"
```

You may need to adjust that line as well as the value for `workspace` set on line 5. You will also need to update the array of GeoTiff file names.
