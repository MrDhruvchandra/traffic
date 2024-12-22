export const createHeatmapLayer = (
  map: google.maps.Map,
  center: google.maps.LatLngLiteral
): google.maps.visualization.HeatmapLayer => {
  const trafficData = [
    { location: new google.maps.LatLng(center.lat + 0.01, center.lng + 0.01), weight: 0.8 },
    { location: new google.maps.LatLng(center.lat - 0.01, center.lng - 0.01), weight: 0.5 },
    { location: new google.maps.LatLng(center.lat + 0.02, center.lng + 0.02), weight: 1 },
  ];

  return new google.maps.visualization.HeatmapLayer({
    data: trafficData,
    map,
    radius: 30,
    gradient: [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]
  });
};