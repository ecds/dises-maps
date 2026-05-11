require 'json'
require 'httparty'

tiffs = %w[Historical_BARLEY_AG_2009_2019.tiff]
workspace = 'DISES'

tiffs.each do |tiff|
  ext = File.extname(tiff)
  tiff_name = File.basename(tiff, ext)
  add_layer_string = "file:/mnt2/data/public/#{workspace}/3857/#{tiff}"
  add_store_body = "<?xml version=\"1.0\"?><coverageStore><title>#{tiff_name}</title><name>#{tiff}</name><workspace>#{workspace}</workspace><enabled>true</enabled><type>GeoTIFF</type><url>file:#{workspace}/3857/#{tiff}.tiff </url><advertised>true</advertised></coverageStore>"
  update_layer_body = {
    coverageStore: {
      title: tiff_name,
      name: tiff_name,
      workspace: workspace,
      enabled: true,
      type: 'GeoTIFF',
      url: add_layer_string,
      advertised: true
    }
  }

  coverage_update_body = {
    coverage: {
      parameters: {
        entry: [
          {
            string: ['InputTransparentColor', '#000000']
          }
        ]
      }
    }
  }

  puts '###'

  store_post = HTTParty.post(
    "https://geoserver.ecds.emory.edu/rest/workspaces/#{workspace}/coveragestores",
    body: add_store_body,
    headers: { 'Content-type' => 'application/xml' },
    basic_auth: { username: '***', password: '*****' }
  )

  puts store_post.code

  store_put = HTTParty.put(
    "https://geoserver.ecds.emory.edu/rest/workspaces/#{workspace}/coveragestores/#{tiff_name}/external.geotiff?configure=first",
    body: add_layer_string,
    headers: { 'Content-type': 'text/plain' },
    basic_auth: { username: '****', password: '****' }
  )

  puts store_put.code

  layer_put = HTTParty.put(
    "https://geoserver.ecds.emory.edu/rest/workspaces/#{workspace}/coveragestores/#{tiff_name}",
    body: update_layer_body.to_json,
    headers: { 'Content-type': 'application/json' },
    basic_auth: { username: '****', password: '****' }
  )

  puts layer_put.code

  HTTParty.put("https://geoserver.ecds.emory.edu/rest/workspaces/#{workspace}/coveragestores/#{tiff_name}/coverages/#{tiff_name}",
               body: coverage_update_body.to_json,
               headers: { 'Content-type': 'application/json' },
               basic_auth: { username: '****', password: '****' })
end
