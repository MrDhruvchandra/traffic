import React from 'react';
import { Map } from 'lucide-react';
import TrafficMap from './components/Map';
import TrafficMapWithData from './components/TrafficMapWithData';
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Map className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Traffic Heat Map</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Live Traffic Density</h2>
            <p className="mt-2 text-gray-600">
              View real-time traffic conditions with our interactive heat map. Red areas indicate heavy traffic.
            </p>
          </div>
          <div className="container mx-auto p-4">
    </div>
          <div className="h-[600px]">
            <TrafficMap
              center={{ lat: 40.7128, lng: -74.0060 }}  
              zoom={13}
            />
          </div>
          <TrafficMapWithData center={{ lat: 26.8467, lng: 80.9462 }} zoom={12} />

          <div className="mt-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-4 w-4 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-600">Light Traffic</span>
              <div className="h-4 w-4 bg-yellow-400 rounded ml-4"></div>
              <span className="text-sm text-gray-600">Moderate Traffic</span>
              <div className="h-4 w-4 bg-red-500 rounded ml-4"></div>
              <span className="text-sm text-gray-600">Heavy Traffic</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;