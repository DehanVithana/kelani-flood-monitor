import React, { useEffect, useRef } from 'react'

function FloodMap({ data }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!data || !window.google) return

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: data.latitude, lng: data.longitude },
      zoom: 12,
      mapTypeId: 'terrain'
    })

    const getMarkerColor = (level) => {
      switch (level) {
        case 'Major Flood': return '#dc2626'
        case 'Minor Flood': return '#ea580c'
        case 'Alert': return '#d97706'
        default: return '#059669'
      }
    }

    new window.google.maps.Marker({
      position: { lat: data.latitude, lng: data.longitude },
      map: map,
      title: data.station,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: getMarkerColor(data.alertLevel),
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 3
      }
    })

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px 0;">${data.station}</h3>
          <p style="margin: 4px 0;"><strong>Water Level:</strong> ${data.level}m</p>
          <p style="margin: 4px 0;"><strong>Status:</strong> ${data.alertLevel}</p>
        </div>
      `,
      position: { lat: data.latitude, lng: data.longitude }
    })

    infoWindow.open(map)
  }, [data])

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#1a202c' }}>
          Station Location
        </h3>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
      <div style={{
        padding: '12px',
        background: '#f7fafc',
        fontSize: '12px',
        color: '#718096',
        textAlign: 'center'
      }}>
        📍 Coordinates: {data?.latitude}, {data?.longitude}
      </div>
    </div>
  )
}

export default FloodMap
