import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

// Sample NADI centers data - you can replace this with real data
const nadiCenters: NADICenter[] = [
  {
    id: 1,
    name: "NADI Felda Jengka 9",
    coordinates: [102.469935, 3.816610],
    district: "Pulau Tawar",
    region: "Timur 1",
    phase: "Clawback 2013",
    status: "In Operation",
    dusp: "TM"
  },
  {
    id: 2,
    name: "NADI Kuala Lumpur",
    coordinates: [101.6869, 3.1390],
    district: "Kuala Lumpur",
    region: "Central",
    phase: "Phase 1",
    status: "In Operation",
    dusp: "TM"
  },
  {
    id: 3,
    name: "NADI Penang",
    coordinates: [100.3327, 5.4164],
    district: "Penang",
    region: "Northern",
    phase: "Phase 2",
    status: "In Operation",
    dusp: "TM"
  },
  {
    id: 4,
    name: "NADI Johor Bahru",
    coordinates: [103.7414, 1.4927],
    district: "Johor Bahru",
    region: "Southern",
    phase: "Phase 1",
    status: "In Operation",
    dusp: "TM"
  },
  {
    id: 5,
    name: "NADI Kota Kinabalu",
    coordinates: [116.0753, 5.9804],
    district: "Kota Kinabalu",
    region: "Sabah",
    phase: "Phase 3",
    status: "Maintenance",
    dusp: "TM"
  }
];

interface NADICenter {
  id: number;
  name: string;
  coordinates: [number, number];
  district: string;
  region: string;
  phase: string;
  status: string;
  dusp: string;
}

export const NADIInteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<NADICenter | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCenters = nadiCenters.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [109.5, 4.5], // Center of Malaysia
      zoom: 6,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each NADI center
    filteredCenters.forEach((center) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold text-sm">${center.name}</h3>
          <p class="text-xs text-gray-600">Click for more details</p>
        </div>
      `);

      const marker = new mapboxgl.Marker({
        color: center.status === 'In Operation' ? '#22c55e' : '#f59e0b'
      })
        .setLngLat(center.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      // Add click event to marker
      marker.getElement().addEventListener('click', () => {
        setSelectedCenter(center);
      });
    });

    return () => {
      map.current?.remove();
    };
  };

  useEffect(() => {
    if (mapboxToken && !showTokenInput) {
      initializeMap();
    }
  }, [mapboxToken, showTokenInput, filteredCenters]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <div className="space-y-4">
        <div className="text-center p-6 border rounded-lg">
          <MapPin className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Enter Mapbox Token</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Please enter your Mapbox public token to view the interactive map.
            Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="password"
              placeholder="pk.eyJ1IjoieW91cm..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit}>
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search NADI centers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Map */}
        <div className="space-y-2">
          <div ref={mapContainer} className="w-full h-[400px] rounded-lg border" />
          <p className="text-xs text-muted-foreground">
            🟢 In Operation • 🟡 Maintenance • Click markers for details
          </p>
        </div>

        {/* Details Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {selectedCenter ? 'NADI Center Details' : 'Select a NADI Center'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCenter ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">NADI Center</p>
                  <p className="font-semibold">{selectedCenter.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Coordinates</p>
                  <p>Lat Long: {selectedCenter.coordinates[1]}, {selectedCenter.coordinates[0]}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">District</p>
                  <p>Dun: {selectedCenter.district}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Region</p>
                  <p>Region: {selectedCenter.region}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phase</p>
                  <p>Phase: {selectedCenter.phase}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    selectedCenter.status === 'In Operation' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    Status: {selectedCenter.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">DUSP</p>
                  <p>DUSP: {selectedCenter.dusp}</p>
                </div>
                <Button className="w-full mt-4">
                  View NADI Dashboard
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Click on any marker on the map to view NADI center details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Map View Options */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm">
            <p className="font-medium mb-2">Malaysia Maps - Zoom levels show:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>State Level:</strong> Total NADI by State</li>
              <li>• <strong>District Level:</strong> Total NADI by District</li>
              <li>• <strong>Parliament Level:</strong> Total NADI by Parliament</li>
              <li>• <strong>Dun Level:</strong> Total NADI by Dun</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};