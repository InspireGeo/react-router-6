import React, { useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector, geo4 } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";

import mapConfig from "./config.json";
import "./App.css";

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const Mapp = (props) => {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(8);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);
  const [showLayer11, setShowLayer11] = useState(false);
  const [showLayer12, setShowLayer12] = useState(true);

  /* const [tileLayers, setTileLayers] = useState([osm, geo4]);
  const [tileLayersShow, setTileLayersShow] = useState([
    showLayer11,
    showLayer12,
  ]); */
  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  return (
    <div className="square border border-primary">
      <Map center={fromLonLat(center)} zoom={zoom}>
        
       
          <Layers>
            {/*  {tileLayers &&
            tileLayers.map((tile, i) => (
              <div key={i}>
                {tileLayersShow.map((box, j) => (
                  <div key={j}>{box&&<TileLayer source={tile()} zIndex={0} />}</div>
                ))}
              </div>
            ))} */}

            {showLayer11 && <TileLayer source={osm()} zIndex={0} />}
            {showLayer12 && <TileLayer source={geo4()} zIndex={0} />}

            {/*  {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showMarker && <VectorLayer source={vector({ features })} />} */}
          </Layers>
      

        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>

      <div>
        <input
          type="checkbox"
          checked={showLayer12}
          onChange={(event) => setShowLayer12(event.target.checked)}
        />{" "}
        geo4
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer11}
          onChange={(event) => setShowLayer11(event.target.checked)
          }
          
        />{" "}
        osm
      </div>
      {/*  <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Johnson County
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />{" "}
        Wyandotte County
      </div>
      <hr />
      <div>
        <input
          type="checkbox"
          checked={showMarker}
          onChange={(event) => setShowMarker(event.target.checked)}
        />{" "}
        Show markers
      </div> */}
    </div>
  );
};

export default Mapp;
