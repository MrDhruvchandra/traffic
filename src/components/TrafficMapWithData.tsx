import React from 'react';

interface TrafficData {
  lat: number;
  lng: number;
  congestion: number;
  name: string;
}

const trafficData: TrafficData[] = [
  { lat: 26.8467, lng: 80.9462, congestion: 0.5, name: 'Hazratganj' },
  { lat: 26.8500, lng: 80.9499, congestion: 0.7, name: 'Charbagh Railway Station' },
  { lat: 26.8600, lng: 80.9600, congestion: 0.8, name: 'Alambagh' },
  { lat: 26.8700, lng: 80.9700, congestion: 0.6, name: 'Gomti Nagar' },
  { lat: 26.8589, lng: 80.9150, congestion: 0.4, name: 'Kapoorthala' },
  { lat: 26.8100, lng: 80.9500, congestion: 0.2, name: 'Lucknow University' },
  { lat: 26.8505, lng: 80.9315, congestion: 0.3, name: 'Aminabad' },
  { lat: 26.8387, lng: 80.9220, congestion: 0.9, name: 'Naka Hindola' },
  { lat: 26.8980, lng: 80.9576, congestion: 0.5, name: 'Sushant Golf City' },
  { lat: 26.8509, lng: 80.9448, congestion: 0.7, name: 'Bara Imambara' },
];

const TrafficDataList: React.FC = () => {
  return (
    <div className="traffic-data-list p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Traffic Data</h2>
      <ul className="divide-y divide-gray-300">
        {trafficData.map((item, index) => (
          <li key={index} className="py-2">
            <h3 className="font-semibold">{item.name}</h3>
            <p>
              <strong>Location:</strong> {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
            </p>
            <p>
              <strong>Congestion Level:</strong> {item.congestion}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficDataList;
