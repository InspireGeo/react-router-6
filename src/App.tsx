import React, { useState } from "react";

import MainRoutes from "./Routes";
import Sidebar from "./components/Sidebar";
import { Drawer, Button, Card, Collapse } from "antd";

import "./styles.css";
import {
  SimpleButton,
  MapComponent,
  NominatimSearch,
  MeasureButton,
  LayerTree,
  MapContext,
  DrawButton,
  CoordinateInfo,
  useMap,
  SelectFeaturesButton,
} from "@terrestris/react-geo";

function App() {
 /*  const [visible, setVisible] = useState(true);

  const toggleDrawer = () => {
    setVisible(!visible);
  }; */

  return (
   
    <div className="app">
      

      
        {/** Sidebar */}
        <Sidebar />

        {/** Inner container */}
     
    
      <MainRoutes />
    </div>

  );
}

export default App;
