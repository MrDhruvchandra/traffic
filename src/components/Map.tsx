import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MAPS_CONFIG } from '../config/maps';
import { createHeatmapLayer } from '../utils/heatmap';
import { ErrorMessage } from './ErrorMessage';
import { MapContainer } from './MapContainer';
import type { MapProps } from '../types/map';
// import {trafficData} from './trafficData';
const TrafficMap: React.FC<MapProps> = ({ center, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trafficData = [
    { lat: 26.8467, lng: 80.9462, congestion: 0.5 },  // Near Hazratganj
    { lat: 26.8500, lng: 80.9499, congestion: 0.7 },  // Near Charbagh Railway Station
    { lat: 26.8600, lng: 80.9600, congestion: 0.8 },  // Near Alambagh
    { lat: 26.8700, lng: 80.9700, congestion: 0.6 },  // Near Gomti Nagar
    { lat: 26.8589, lng: 80.9150, congestion: 0.4 },  // Near Kapoorthala
    { lat: 26.8100, lng: 80.9500, congestion: 0.2 },  // Near Lucknow University
    { lat: 26.8505, lng: 80.9315, congestion: 0.3 },  // Near Aminabad
    { lat: 26.8387, lng: 80.9220, congestion: 0.9 },  // Near Naka Hindola
    { lat: 26.8980, lng: 80.9576, congestion: 0.5 },  // Near Sushant Golf City
    { lat: 26.8509, lng: 80.9448, congestion: 0.7 },  // Near Bara Imambara
  ];

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps API key is missing. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.');
      return;
    }

    // Load only once with 'visualization' library
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['visualization'], // Only 'visualization' needed for heatmap
    });

    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize the map
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: { lat: 26.8467, lng: 80.9462 }, // Center on Lucknow
          zoom: 12, // Appropriate zoom level for the city
          styles: MAPS_CONFIG.styles,
        });

        // Add the traffic layer (no need to add it to the libraries array)
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(mapInstanceRef.current);

        // Create and display a heatmap layer
        heatmapRef.current = createHeatmapLayer(mapInstanceRef.current, { lat: 26.8467, lng: 80.9462 });

        // Example of adding traffic data points to the heatmap
        const heatmapData = trafficData.map((point) => new google.maps.LatLng(point.lat, point.lng));
        if (heatmapRef.current) {
          heatmapRef.current.setData(heatmapData);
        }
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
