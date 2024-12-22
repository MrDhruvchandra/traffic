export const trafficData = async () => {
    const apiKey =import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const trafficApiURL = `https://maps.googleapis.com/maps/api/directions/json?origin=Lucknow&destination=Charbagh&key=${apiKey}`;
  
    try {
      const response = await fetch(trafficApiURL);
      const data = await response.json();
  
      if (data.status !== 'OK') {
        throw new Error('Failed to fetch traffic data');
      }
  
      // Extract relevant points for heatmap
      const trafficPoints = data.routes[0]?.legs[0]?.steps.map((step) => ({
        lat: step.start_location.lat,
        lng: step.start_location.lng,
      }));
  
      if (!Array.isArray(trafficPoints)) {
        throw new Error('Invalid traffic data format');
      }
  
      console.log('Traffic Points:', trafficPoints);
  
      // Return the processed points for further use
      return trafficPoints;
    } catch (error) {
      console.error('Error fetching traffic data:', error);
      return [];
    }
  };
  
  // Example usage:
  trafficData().then((points) => {
    // Now you can safely use points with `map`
    if (points.length) {
      const heatmapData = points.map((point) => new google.maps.LatLng(point.lat, point.lng));
      console.log('Heatmap Data:', heatmapData);
    }
  });
  