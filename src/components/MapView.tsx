import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { PlaceWithStats } from '../hooks/usePlaces'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapViewProps {
  places: PlaceWithStats[]
}

const MapView: React.FC<MapViewProps> = ({ places }) => {
  // Default center (Tokyo)
  const defaultCenter: [number, number] = [35.6762, 139.6503]
  
  // Create custom icons based on safety score
  const createCustomIcon = (safetyScore: number) => {
    const color = safetyScore >= 8 ? '#10b981' : safetyScore >= 6 ? '#f59e0b' : '#ef4444'
    
    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          color: white;
        ">
          ${safetyScore}
        </div>
      `,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.coordinates}
            icon={createCustomIcon(place.safetyScore)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-1">{place.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{place.location}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span>{place.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-green-600">🛡️</span>
                    <span>{place.safetyScore}</span>
                  </div>
                </div>
                <span className="inline-block mt-2 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                  {place.category}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView