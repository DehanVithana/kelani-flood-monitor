import React, { useState, useEffect } from 'react'
import FloodMap from './components/FloodMap'
import StationCard from './components/StationCard'
import AlertBanner from './components/AlertBanner'
import HistoricalChart from './components/HistoricalChart'
import { fetchLatestData, fetchHistoricalData } from './utils/dataFetcher'

function App() {
  const [stationData, setStationData] = useState(null)
  const [historicalData, setHistoricalData] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const latest = await fetchLatestData()
        const historical = await fetchHistoricalData()
        setStationData(latest)
        setHistoricalData(historical)
        setLastUpdated(new Date())
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
    const interval = setInterval(loadData, 300000) // Update every 5 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '32px',
            color: '#1a202c',
            fontWeight: '700'
          }}>
            🌊 Kelani River Flood Monitor
          </h1>
          <p style={{
            margin: '0',
            color: '#718096',
            fontSize: '16px'
          }}>
            Critical Gauging Station: Nagalagam Street
            {lastUpdated && (
              <span style={{ marginLeft: '16px', fontSize: '14px' }}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </header>

        {loading ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center',
            fontSize: '18px',
            color: '#718096'
          }}>
            Loading flood data...
          </div>
        ) : (
          <>
            <AlertBanner data={stationData} />
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <StationCard data={stationData} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '20px'
            }}>
              <FloodMap data={stationData} />
              <HistoricalChart data={historicalData} />
            </div>
          </>
        )}

        <footer style={{
          marginTop: '40px',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '14px'
        }}>
          Data source: Sri Lanka Irrigation Department | Updates every 5 minutes
        </footer>
      </div>
    </div>
  )
}

export default App
