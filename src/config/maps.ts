export const MAPS_CONFIG = {
  defaultCenter: {
    lat: 40.7128,
    lng: -74.0060
  },
  defaultZoom: 13,
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7c93a3' }]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#d6d6d6' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#e3eef9' }]
    }
  ]
};