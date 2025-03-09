import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Layout from "./Layout";

// Fix for Leaflet's default icon images not loading correctly
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// Sample data for cracks and pipeline route
const initialCrackData = [
  { id: 1, lat: 37.782392, lng: -122.417374, severity: "Normal" },
  { id: 2, lat: 37.782597, lng: -122.415716, severity: "Normal" },
  { id: 3, lat: 37.782808, lng: -122.414051, severity: "Normal" },
  { id: 4, lat: 37.783009, lng: -122.412419, severity: "Normal" },
  { id: 5, lat: 37.783221, lng: -122.410802, severity: "Normal" },
  { id: 6, lat: 37.783324, lng: -122.417532, severity: "Normal" },
  { id: 7, lat: 37.783539, lng: -122.415901, severity: "Normal" },
  { id: 8, lat: 37.783743, lng: -122.414262, severity: "Normal" },
  { id: 9, lat: 37.783940, lng: -122.412627, severity: "Normal" },
  { id: 10, lat: 37.784152, lng: -122.410977, severity: "Normal" },
];

const pipelinePath = [
  [37.782392, -122.417374],
  [37.782597, -122.415716],
  [37.782808, -122.414051],
  [37.783009, -122.412419],
  [37.783221, -122.410802],
  [37.784152, -122.410977],
  [37.783940, -122.412627],
  [37.783743, -122.414262],
  [37.783539, -122.415901],
  [37.783324, -122.417532],
  [37.782392, -122.417374]
];

// Create custom marker icons based on severity
function getMarkerIcon(severity: string) {
  let color;
  switch (severity) {
    case "Crack":
      color = "red";
      break;
    case "Normal":
      color = "green";
      break;
    default:
      color = "blue";
  }
  return L.divIcon({
    className: "",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

interface Crack {
  id: number;
  lat: number;
  lng: number;
  severity: string;
}

// Response interface for the API call
interface CrackResponse {
  id: number;
  has_crack: boolean;
}

export default function Pipeline() {
  const [selectedCrack, setSelectedCrack] = useState<Crack | null>(null);
  // Convert static data to state
  const [crackData, setCrackData] = useState<Crack[]>(initialCrackData);
  const [filterSeverities, setFilterSeverities] = useState({
    Crack: true,
    Normal: true,
  });
  // Add toast notification state
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success',
  });

  // Function to show toast
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ visible: true, message, type });
    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Function to poll the API and update crack data
  useEffect(() => {
    const updateCrackData = async () => {
      try {
        const response = await fetch('http://localhost:8000/crack_result');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: CrackResponse = await response.json();
        
        // Update the crack severity based on the response
        setCrackData(prevCracks => {
          const updatedCracks = prevCracks.map(crack => {
            if (crack.id === data.id) {
              // If has_crack is true, set to Crack; otherwise, Normal
              const newSeverity = data.has_crack ? "Crack" : "Normal";
              
              return { ...crack, severity: newSeverity };
            }
            return crack;
          });
          
          // Show success toast notification
          showToast(`Pipeline data updated: Point ${data.id} is ${data.has_crack ? 'cracked' : 'normal'}`, 'success');
          
          return updatedCracks;
        });
      } catch (error) {
        console.error("Error fetching crack data:", error);
        // Show error toast notification
        showToast("Failed to update pipeline data", 'error');
      }
    };

    // Set up interval to poll every 12 seconds
    const intervalId = setInterval(updateCrackData, 12000);
    
    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Toggle function to show/hide certain severities
  const toggleSeverity = (severity: string) => {
    setFilterSeverities((prev) => ({
      ...prev,
      [severity]: !prev[severity],
    }));
  };

  // Filter the cracks that should be displayed
  const filteredCracks = crackData.filter((c) => filterSeverities[c.severity]);

  return (
    <Layout>
      <div className="flex flex-col h-[42vw] w-full bg-white rounded-4xl overflow-hidden">
        {/* Toast notification */}
        {toast.visible && (
          <div 
            className={`fixed top-4 right-4 z-[2000] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transform transition-all duration-300 animate-fade-in ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Header/Nav */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold">Pipeline Crack Detection</h1>
          <div className="flex items-center space-x-2">
            {/* You could add a user profile or logout button here, if needed. */}
            <span className="text-sm font-semibold">Monitoring Dashboard</span>
          </div>
        </header>

        {/* Main content with filter panel on the left & map on the right */}
        <div className="flex flex-row flex-grow">
          {/* Filter/Sidebar */}
          <aside className="bg-gray-100 w-64 p-4 shadow-inner">
            <h2 className="text-lg font-semibold mb-2">Legend</h2>
            <div className="space-y-4">
              {/* Crack toggle */}
              <div className="flex items-center justify-between bg-white px-3 py-3 rounded shadow">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
                  <span className="text-sm font-medium">Crack Detected</span>
                </div>
                <button 
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${filterSeverities.Crack ? 'bg-red-500' : 'bg-gray-300'}`}
                  onClick={() => toggleSeverity("Crack")}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${filterSeverities.Crack ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>

              {/* Normal toggle */}
              <div className="flex items-center justify-between bg-white px-3 py-3 rounded shadow">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                  <span className="text-sm font-medium">Normal</span>
                </div>
                <button 
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${filterSeverities.Normal ? 'bg-green-500' : 'bg-gray-300'}`}
                  onClick={() => toggleSeverity("Normal")}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${filterSeverities.Normal ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            </div>
          </aside>

          {/* Map section */}
          <div className="flex-grow relative">
            <MapContainer
              center={[37.783260, -122.414165]}
              zoom={17}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* Pipeline Path */}
              <Polyline positions={pipelinePath} color="blue" />
              {/* Crack Locations */}
              {filteredCracks.map((crack) => (
                <Marker
                  key={crack.id}
                  position={[crack.lat, crack.lng]}
                  icon={getMarkerIcon(crack.severity)}
                  eventHandlers={{
                    click: () => {
                      setSelectedCrack(crack);
                    },
                  }}
                >
                  <Popup>
                    <div className="text-sm">Crack ID: {crack.id}</div>
                    <div>Severity: {crack.severity}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            {/* Slide-up details panel - only render when a crack is selected */}
            {selectedCrack && (
              <div
                className="absolute bottom-0 left-0 w-full bg-white p-4 shadow-lg rounded-t-xl z-[1000] transition-transform duration-300 animate-slide-up"
                style={{
                  maxHeight: "50%",
                  overflowY: "auto"
                }}
              >
                <div className="w-12 h-1 bg-gray-300 mx-auto mb-3 rounded-full"></div>
                <h2 className="text-lg font-bold">Crack Details</h2>
                <p>Crack ID: {selectedCrack.id}</p>
                <p>Severity: {selectedCrack.severity}</p>
                <p className="text-sm text-gray-600 mt-2">Location: {selectedCrack.lat.toFixed(4)}, {selectedCrack.lng.toFixed(4)}</p>
                <button
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setSelectedCrack(null)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-200 text-gray-700 text-center py-2">
          <p className="text-sm">© 2025 Pipeline Monitoring Inc. All rights reserved.</p>
        </footer>
      </div>
    </Layout>
  );
}