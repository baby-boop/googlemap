import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';

const ARC = () => {
  const [sceneView, setSceneView] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const [Map, SceneView, WebScene, GraphicsLayer, Graphic, FeatureLayer] = await loadModules([
          'esri/Map',
          'esri/views/SceneView',
          'esri/WebScene',
          'esri/layers/GraphicsLayer',
          'esri/Graphic',
          'esri/layers/FeatureLayer'
        ]);

        const map = new Map({
          basemap: 'topo-3d'
        });

        // const webScene = new WebScene({
        //   portalItem: {
        //     id: 'a0e287d088b9436bb3d9ebb53f0f9ba6'
        //   }
        // });
        
        const sceneView = new SceneView({
          container: 'map',
          map: map,
          camera: {
            position: {
              latitude: 47.9109801,
              longitude: 106.8728637,
              z: 1500
            },
            tilt: 45
          }
        });

        const graphicsLayer = new GraphicsLayer();
        sceneView.map.add(graphicsLayer);

        const response = await axios.get('http://localhost:8080/locations');
        const locations = response.data;

        locations.forEach(location => {
          const point = {
            type: 'point',
            longitude: location.longitude,
            latitude: location.latitude
          };

          const markerSymbol = {
            type: 'simple-marker',
            color: [45, 42, 241],
            outline: {
              color: [45, 42, 241],
              width: 1
            }
          };

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            popupTemplate: {
              title: 'Нэр: {name}',
              content: [
                { type: 'text', text: 'Хаяг: {address}' },
                { type: 'text', text: 'Уртгар: {longitude}' },
                { type: 'text', text: 'Өргөрөг: {latitude}' }
              ]
            },
            attributes: location
          });

          graphicsLayer.add(pointGraphic);
        });

        setSceneView(sceneView);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    loadMap();

    return () => {
      if (sceneView) {
        sceneView.container = null;
      }
    };
  }, []);

  return <div id="map" style={{ margin: '100px', width: '80%', height: '500px' }} />;
};


export default ARC;