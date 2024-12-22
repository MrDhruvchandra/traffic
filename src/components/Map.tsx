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

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps API key is missing. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.');
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['visualization']
    });

    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: MAPS_CONFIG.styles
        });

        heatmapRef.current = createHeatmapLayer(mapInstanceRef.current, center);
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