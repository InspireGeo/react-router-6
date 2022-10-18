import * as olSource from "ol/source";
import OlSourceOsm from "ol/source/OSM";
//import React, { useState } from "react";

/* import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOsm from "ol/source/OSM";
import OlSourceTileWMS from "ol/source/TileWMS";
import OlLayerGroup from "ol/layer/Group";
import TileWMS from "ol/source/TileWMS";
import { transform } from "ol/proj.js";


 */

// import { Collapse } from "antd";


function osm() {
	return new  OlSourceOsm()
}
/* 
function layerGroup(){


const layerGroup = new OlLayerGroup({
  name: "Layergroup",
  layers: [
    new OlLayerTile({
      source: new olSource.OSM(),
      name: "OSM",
    }),
    
  ]
});
} */


/* 
export const olMap = new OlMap({
  view: new OlView({
    center: transform(
      [7.586143638830786, 50.35594786885198],
      "EPSG:4326",
      "EPSG:3857"
    ),
    zoom: 8,
  }),
  layers: [layerGroup],
}); */




export default osm;