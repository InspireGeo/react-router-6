import React, { useState } from "react";

import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOsm from "ol/source/OSM";
import OlSourceTileWMS from "ol/source/TileWMS";
import OlLayerGroup from "ol/layer/Group";
import TileWMS from "ol/source/TileWMS";
import { transform } from "ol/proj.js";
import { Drawer, Button, Card, Collapse} from "antd";

import {
  SimpleButton,
  MapComponent,
  NominatimSearch,
  MeasureButton,
  LayerTree,
  MapContext,
  DrawButton,
 DigitizeButton,
  CoordinateInfo,
  useMap,
  SelectFeaturesButton,
} from "@terrestris/react-geo";


import "ol/ol.css";
import "antd/dist/antd.css";
import "./react-geo.css";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import { defaults as defaultControls } from "ol/control";
// import { Collapse } from "antd";
import { ToggleGroup } from "@terrestris/react-geo";

const Panel = Collapse.Panel;


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

    
 /*    new OlLayerTile({
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
    }), */

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


   /*  new OlLayerTile({
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
    }), */

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

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: "EPSG:4326",
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: "custom-mouse-position",
  target: document.getElementById("mouse-position"),
});




const olMap = new OlMap({
  view: new OlView({
    center: transform(
      [7.586143638830786, 50.35594786885198],
      "EPSG:4326",
      "EPSG:3857"
    ),
    zoom: 8,
  }),
  
  layers: [layerGroup],
  controls: defaultControls(),
});



function Map() {
  const map = useMap();

  return <MapComponent map={map} />;
}

function NominatimSearchWithMap() {
  const map = useMap();

  return (
    <NominatimSearch
      key="search"
      map={map}
      style={{
        width: "100%",
      }}
    />
  );
}

function MeasureButtonWithMap() {
  const map = useMap();

  return (
    <ToggleGroup>
      <MeasureButton
        key="measureButton"
        name="line"
        map={map}
        measureType="line"
        iconName="pencil"
        pressedIconName="pencil"
      >
        Measure distance
      </MeasureButton>
      <MeasureButton
        name="steps"
        map={map}
        measureType="line"
        showMeasureInfoOnClickedPoints
      >
        Distance with step labels
      </MeasureButton>

      <MeasureButton name="multi" map={map} measureType="line" multipleDrawing>
        Distance with multiple drawing
      </MeasureButton>

      <MeasureButton name="poly" map={map} measureType="polygon">
        Area
      </MeasureButton>

      <MeasureButton name="angle" map={map} measureType="angle">
        Angle
      </MeasureButton>
    </ToggleGroup>
  );
}

function DrawButtonWithMap() {
  const map = useMap();

  return (
    <ToggleGroup>
      <DigitizeButton
        key="digitizeButton"
        name="drawPolygon"
        map={map}
        drawType="Polygon"
        iconName="pencil"
        pressedIconName="pencil"
      >
        Area
      </DigitizeButton>
      <DigitizeButton
        key="digitizeButton2"
        name="drawLine"
        map={map}
        drawType="LineString"
        iconName="pencil"
        pressedIconName="pencil"
      >
        Line
      </DigitizeButton>

      <DigitizeButton name="drawPoint" map={map} drawType="Point">
        Draw point
      </DigitizeButton>

      <DigitizeButton name="drawCircle" map={map} drawType="Circle">
        Draw circle
      </DigitizeButton>

      <DigitizeButton name="drawRectangle" map={map} drawType="Rectangle">
        Draw rectangle
      </DigitizeButton>

      <DigitizeButton name="drawText" map={map} drawType="Text">
        Draw text label
      </DigitizeButton>

      <DigitizeButton name="selectAndModify" map={map} editType="Edit">
        Select and modify features
      </DigitizeButton>

      <DigitizeButton name="copyFeature" map={map} editType="Copy">
        Copy features
      </DigitizeButton>

      <DigitizeButton name="deleteFeature" map={map} editType="Delete">
        Delete features
      </DigitizeButton>
    </ToggleGroup>
  );
} 

// function MeasureCoor() {
//   const map = useMap();
//   const coor = defaultControls().extend([mousePositionControl])
//   return (
//     console.log(coor),
//     coor
//   );
// };

function LayerTreeWithMap(props) {
  const map = useMap();

  return <LayerTree map={map} {...props} />;
}

function MapTerrestris() {
  // const [layers, setLayers] = useState();
  // const [feature, setFeature] = useState();

  const [visible, setVisible] = useState(true);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

 


  return (
    <div className="map" >
      
      <MapContext.Provider value={olMap} >
        <Map />
        
        <Button  className="btn btn-success" onClick={toggleDrawer}  style={{ position: "fixed", top: "30px", right: "30px" }} > | | | </Button>
        {/* <SimpleButton
          style={{ position: "fixed", top: "30px", right: "30px" }}
          onClick={toggleDrawer}
          iconName="bars"
        /> */}
        <Drawer
          title="react-geo-application"
          placement="right"
          onClose={toggleDrawer}
          visible={visible}
          mask={false}
        >
          <NominatimSearchWithMap />
          <br />
          <div className="my-pane">
            <Collapse accordion>
              <Panel header="Layers" key="1">
                <p>
                  <LayerTreeWithMap layerGroup={layerGroup} />{" "}
                </p>
              </Panel>
              <Panel header="Measurement Tools" key="2">
                <p>
                  <MeasureButtonWithMap />
                </p>
              </Panel>

              <Panel header="Digitize" key="3">
                <p>
                  <DrawButtonWithMap />
                </p>
              </Panel> 

              <Panel header="Extra" key="4">
                <p>
                  {/* <SelectFeaturesButton layers={layers} onFeatureSelect={e => setFeature(e.selected[0])}>
          Select feature
        </SelectFeaturesButton> */}
                </p>
              </Panel>
            </Collapse>
          </div>
        </Drawer>

        {/* <Button
          type="primary"
          style={{ position: "fixed", bottom: "40px", left: "50px" }}
        ></Button> */}
      </MapContext.Provider>
    </div>
  );
}

export default MapTerrestris;
