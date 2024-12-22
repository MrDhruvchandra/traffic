import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MAPS_CONFIG } from '../config/maps';
import { createHeatmapLayer } from '../utils/heatmap';
import { ErrorMessage } from './ErrorMessage';
import { MapContainer } from './MapContainer';
import type { MapProps } from '../types/map';

const TrafficMap: React.FC<MapProps> = ({ center, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trafficData = [
    { lat: 26.8467, lng: 80.9462, congestion: 0.5, name: 'Hazratganj' },
    { lat: 26.8500, lng: 80.9499, congestion: 0.7, name: 'Charbagh Railway Station' },
    { lat: 26.8600, lng: 80.9600, congestion: 0.8, name: 'Alambagh' },
    { lat: 26.8700, lng: 80.9700, congestion: 0.6, name: 'Gomti Nagar' },
    { lat: 26.8589, lng: 80.9150, congestion: 0.4, name: 'Kapoorthala' },
    { lat: 26.8100, lng: 80.9500, congestion: 0.2, name: 'Lucknow University' },
    { lat: 26.8505, lng: 80.9315, congestion: 0.3, name: 'Aminabad' },
    { lat: 26.8387, lng: 80.9220, congestion: 0.9, name: 'Naka Hindola' },
    { lat: 26.8980, lng: 80.9576, congestion: 0.5, name: 'Sushant Golf City' },
    // { lat: 26.8509, lng: 80.9448, congestion: 0.7, name: 'Bara Imambara' },
  ];

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps API key is missing. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.');
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['visualization'],
    });

    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize the map
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: { lat: 26.8467, lng: 80.9462 },
          zoom: 12,
          styles: MAPS_CONFIG.styles,
        });

        // Add the traffic layer
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(mapInstanceRef.current);

        // Create and display a heatmap layer
        heatmapRef.current = createHeatmapLayer(mapInstanceRef.current, { lat: 26.8467, lng: 80.9462 });

        // Add heatmap data
        const heatmapData = trafficData.map((point) => new google.maps.LatLng(point.lat, point.lng));
        if (heatmapRef.current) {
          heatmapRef.current.setData(heatmapData);
        }

        // Add markers for each location
        trafficData.forEach((location) => {
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: mapInstanceRef.current,
            label: {
              text: location.name,
              color: 'black',
              fontWeight: 'bold',
            },
          });

          // Optional: Add info window for additional details
          const infoWindow = new google.maps.InfoWindow({
            content: `<div><strong>${location.name}</strong><br>Congestion Level: ${location.congestion}</div>`,
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstanceRef.current, marker);
          });
        });
      }
    }).catch((err) => {
      setError('Failed to load Google Maps: ' + err.message);
    });
  }, [center, zoom]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <MapContainer ref={mapRef} />;
};

export default TrafficMap;
