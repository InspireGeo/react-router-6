


const layerGroup = new OlLayerGroup({
    name: "Layergroup",
    layers: [
      new OlLayerTile({
        source: new OlSourceOsm(),
        name: "OSM",
      }),
      // new OlLayerTile({
      //   name: 'SRTM30-Contour',
      //   minResolution: 0,
      //   maxResolution: 10,
      //   source: new OlSourceTileWMS({
      //     url: 'https://ows.terrestris.de/osm/service',
      //     params: {
      //       'LAYERS': 'SRTM30-Contour'
      //     }
      //   })
      // }),
  
      
      new OlLayerTile({
        name: "rp_dtk50",
        minResolution: 0,
        maxResolution: 2000,
        source: new TileWMS({
          url: "http://geo4.service24.rlp.de/wms/dtk50.fcgi?REQUEST=GetCapabilities&VERSION=1.3.0&SERVICE=WMS",
          params: {
            LAYERS: "rp_dtk50",
            VERSION: "1.3.0",
          },
        }),
      }),
  
      new OlLayerTile({
        name: "rp_dop",
        minResolution: 0,
        maxResolution: 2000,
        source: new TileWMS({
          url: "https://geo4.service24.rlp.de/wms/dop_basis.fcgi?REQUEST=GetCapabilities&VERSION=1.3.0&SERVICE=WMS",
          params: {
            LAYERS: "rp_dop",
            VERSION: "1.3.0",
          },
        }),
      }),
      new OlLayerTile({
        name: "Naturschutzgebiete",
        minResolution: 0,
        maxResolution: 2000,
        source: new TileWMS({
          //url: 'https://inspire.naturschutz.rlp.de/cgi-bin/wfs/sd_d1_wms?service=wms&version=1.3.0&request=getCapabilities&',
          url: "https://berichte5.naturschutz.rlp.de/kartendienste_naturschutz/mod_ogc/wms_getmap.php?mapfile=naturschutzgebiet&service=WMS&version=1.1.1&Request=GetCapabilities",
          params: {
            LAYERS: "naturschutzgebiet",
            VERSION: "1.1.1",
          },
        }),
      }),
  
  
      new OlLayerTile({
        name: "WMS RP DTK100",
        minResolution: 0,
        maxResolution: 2000,
        source: new TileWMS({
          //url: 'https://inspire.naturschutz.rlp.de/cgi-bin/wfs/sd_d1_wms?service=wms&version=1.3.0&request=getCapabilities&',
          url: "https://geo4.service24.rlp.de/wms/rp_dtk100.fcgi?REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
          params: {
            LAYERS: "wms_rp_dtk100",
            VERSION: "1.1.1",
          },
        }),
      }),
  
      // url: 'https://berichte5.naturschutz.rlp.de/kartendienste_naturschutz/mod_ogc/wms_getmap.php?mapfile=naturschutzgebiet&service=WMS&version=1.1.1&Request=GetCapabilities',
      // 'LAYERS': 'HabitatsAndBiotopes' , VERSION: '1.3.0'
  
      // new OlLayerTile({
      //   name: 'OSM-Overlay-WMS',
      //   minResolution: 0,
      //   maxResolution: 200,
      //   source: new OlSourceTileWMS({
      //     url: 'https://ows.terrestris.de/osm/service',
      //     params: {
      //       'LAYERS': 'OSM-Overlay-WMS'
      //     }
      //   })
      // })
    ],
  });