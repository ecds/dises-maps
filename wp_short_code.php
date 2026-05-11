/**
* Register Shortcode for Remotely Hosted React App
*/
function render_map_viz()
{
$remote_url = 'https://dises-maps.ecdsdev.org/';

// Enqueue Remote CSS
wp_enqueue_style(
'map-viz-styles',
"$remote_url/assets/index.css",
array(),
'1.0.0'
);

// Enqueue Remote JS
wp_enqueue_script(
'map-viz-js',
"$remote_url/assets/index.js",
array(),
'1.0.0',
true
);

return '<div id="map-viz"></div>';
}
add_shortcode('map_viz', 'render_map_viz');