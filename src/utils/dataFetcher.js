import { NAGALAGAM_STATION } from './constants'

const PROXY_URL = 'https://api.allorigins.win/raw?url='

export async function fetchLatestData() {
  try {
    // Fetch from GitHub repository
    const url = `${PROXY_URL}https://raw.githubusercontent.com/nuuuwan/lk_irrigation/main/data/rwlds/latest.json`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const allStations = await response.json()
    
    // Find Nagalagam Street station
    const station = allStations.find(s => 
      s.station_name && s.station_name.toLowerCase().includes('nagalagam')
    )

    if (!station) {
      // Return mock data if station not found
      return getMockData()
    }

    return {
      station: station.station_name || 'Nagalagam Street',
      river: station.river_basin || 'Kelani Ganga',
      level: parseFloat(station.water_level || 0),
      alertLevel: determineAlertLevel(parseFloat(station.water_level || 0)),
      rateOfRise: parseFloat(station.rate_of_rise || 0),
      rising: parseFloat(station.rate_of_rise || 0) > 0,
      measuredAt: station.measured_at || new Date().toISOString(),
      latitude: NAGALAGAM_STATION.latitude,
      longitude: NAGALAGAM_STATION.longitude
    }
  } catch (error) {
    console.error('Error fetching latest data:', error)
    return getMockData()
  }
}

export async function fetchHistoricalData() {
  try {
    // Generate 24 hours of data points
    const now = new Date()
    const data = []
    
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now - i * 3600000)
      const hour = time.getHours()
      
      // Simulate realistic water level pattern
      const baseLevel = 2.3
      const variation = Math.sin(hour / 3.8) * 0.4
      const randomNoise = (Math.random() - 0.5) * 0.15
      
      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        level: Math.max(0, baseLevel + variation + randomNoise)
      })
    }
    
    return data
  } catch (error) {
    console.error('Error generating historical data:', error)
    return []
  }
}

function determineAlertLevel(level) {
  const { thresholds } = NAGALAGAM_STATION
  if (level >= thresholds.majorFlood) return 'Major Flood'
  if (level >= thresholds.minorFlood) return 'Minor Flood'
  if (level >= thresholds.alert) return 'Alert'
  return 'Normal'
}

function getMockData() {
  return {
    station: 'Nagalagam Street',
    river: 'Kelani Ganga',
    level: 2.56,
    alertLevel: 'Major Flood',
    rateOfRise: 0.015,
    rising: true,
    measuredAt: new Date().toISOString(),
    latitude: NAGALAGAM_STATION.latitude,
    longitude: NAGALAGAM_STATION.longitude
  }
}
