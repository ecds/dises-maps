# React Component for DISES Map Visualization

Components used for the [Thriving Future Cropscapes](https://www.thrivingfuturecropscapes.org/data-visualizations/) data visualizations.

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
