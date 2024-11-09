import { useState, useEffect } from "react";
import { Map } from "react-map-gl/maplibre";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { Layer } from "@deck.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const onDataLoad = (data: any) => {
    console.log("inside ondata load >>>>>>>>", data);
  };

  useEffect(() => {
    const layers = [
      new ScatterplotLayer({
        id: "deckgl-circle",
        loaders: [CSVLoader],
        data: "/src/assets/events.csv",
        onDataLoad,
        loadOptions: {
          csv: {
            // delimiter: '\t',
            dynamicTyping: true,
            skipEmptyLines: true
          }
        },
        getPosition: (d) => d.event_text,
        getFillColor: [255, 0, 0, 100],
        getRadius: 1000,
      }),
    ];
    setLayers([...layers]);
  }, []);

  return (
    <DeckGL
      initialViewState={{
        longitude: 72.853,
        latitude: 20.375,
        zoom: 11,
      }}
      controller
      layers={layers}
    >
      <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
    </DeckGL>
  );
};

export default MapComponent;
