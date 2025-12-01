import React from 'react'

function AlertBanner({ data }) {
  if (!data) return null

  const getAlertConfig = (level) => {
    switch (level) {
      case 'Major Flood':
        return { bg: '#dc2626', icon: '🚨', message: 'MAJOR FLOOD WARNING' }
      case 'Minor Flood':
        return { bg: '#ea580c', icon: '⚠️', message: 'MINOR FLOOD ALERT' }
      case 'Alert':
        return { bg: '#d97706', icon: '⚡', message: 'FLOOD ALERT' }
      default:
        return { bg: '#059669', icon: '✓', message: 'NORMAL CONDITIONS' }
    }
  }

  const config = getAlertConfig(data.alertLevel)

  return (
    <div style={{
      background: config.bg,
      color: 'white',
      borderRadius: '16px',
      padding: '20px 30px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '20px',
      fontWeight: '600',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
      animation: data.alertLevel === 'Major Flood' ? 'pulse 2s infinite' : 'none'
    }}>
      <span style={{ fontSize: '32px' }}>{config.icon}</span>
      <div>
        <div>{config.message}</div>
        {data.rising && (
          <div style={{ fontSize: '16px', fontWeight: '400', marginTop: '4px' }}>
            ⬆️ Water level is rising
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertBanner
