import React from 'react'

function StationCard({ data }) {
  if (!data) return null

  const getStatusColor = (level) => {
    switch (level) {
      case 'Major Flood': return '#dc2626'
      case 'Minor Flood': return '#ea580c'
      case 'Alert': return '#d97706'
      default: return '#059669'
    }
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        margin: '0 0 16px 0',
        fontSize: '20px',
        color: '#1a202c'
      }}>
        {data.station}
      </h2>
      
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <span style={{
          fontSize: '48px',
          fontWeight: '700',
          color: getStatusColor(data.alertLevel)
        }}>
          {data.level}
        </span>
        <span style={{ fontSize: '24px', color: '#718096' }}>meters</span>
      </div>

      <div style={{
        display: 'grid',
        gap: '12px'
      }}>
        <InfoRow label="Status" value={data.alertLevel} color={getStatusColor(data.alertLevel)} />
        <InfoRow label="Rate of Rise" value={`${data.rateOfRise} m/hr`} />
        <InfoRow label="Trend" value={data.rising ? '⬆️ Rising' : '⬇️ Falling'} />
        <InfoRow label="Last Measured" value={new Date(data.measuredAt).toLocaleString()} />
      </div>
    </div>
  )
}

function InfoRow({ label, value, color }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid #e2e8f0'
    }}>
      <span style={{ color: '#718096', fontSize: '14px' }}>{label}</span>
      <span style={{
        fontWeight: '600',
        color: color || '#1a202c',
        fontSize: '14px'
      }}>
        {value}
      </span>
    </div>
  )
}

export default StationCard
