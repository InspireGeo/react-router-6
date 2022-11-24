import TileWMS from "ol/source/TileWMS";


function geo4() {
	
return new TileWMS({
    url: "http://geo4.service24.rlp.de/wms/dtk50.fcgi?REQUEST=GetCapabilities&VERSION=1.3.0&SERVICE=WMS",
    params: {
      LAYERS: "rp_dtk50",
      VERSION: "1.3.0",
    },
  })

}

export default geo4;