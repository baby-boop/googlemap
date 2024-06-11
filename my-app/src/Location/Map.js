import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Map = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAbeIOIYyKZeIo8WGupB8aGIn3WStQYQY&libraries=places`;
        script.id = 'googleMaps';
        document.body.appendChild(script);
        script.addEventListener('load', initMap);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      const mapOptions = {
        zoom: 12,
        center: { lat: 47.9109801, lng: 106.8728637 } // Default coordinates
      };

      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      axios.get(`http://localhost:8080/locations`)
        .then(response => {
          const locations = response.data;

          const newMarkers = locations.map(location => {
            const markerPosition = { lat: location.latitude, lng: location.longitude };
            const marker = new window.google.maps.Marker({
              position: markerPosition,
              map: map,
              title: location.name // location name
            });

            
            marker.addListener('click', () => {
              
              const content = `<div><h3>Нэр: ${location.name}</h3><p>Хаяг: ${location.address}</p></div>`;
              const infoWindow = new window.google.maps.InfoWindow({
                content: content
              });
              
              infoWindow.open(map, marker);
            });

            return marker;
          });

          setMarkers(newMarkers);

          // ehnii position
          if (locations.length > 0) {
            const firstLocation = locations[0];
            map.setCenter({ lat: firstLocation.latitude, lng: firstLocation.longitude });
          }
        })
        .catch(error => {
          console.error('Error fetching locations:', error);
        });

      setMap(map);
    };

    loadMap();

    return () => {
      const scriptElement = document.getElementById('googleMaps');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '700px' }}></div>
      {latitude && longitude && (
        <p>Өргөрөг: {latitude}, Уртраг: {longitude}</p>
      )}
    </div>
  );
};

export default Map;
