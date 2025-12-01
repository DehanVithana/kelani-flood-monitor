# Kelani River Flood Monitoring System

Real-time flood monitoring for Nagalagam Street gauging station on the Kelani River, Sri Lanka.

## Features

- 🌊 Real-time water level monitoring
- 🗺️ Interactive map showing station location
- 📊 Historical trend analysis (24 hours)
- 🚨 Alert system with color-coded warnings
- 📱 Responsive design for mobile and desktop
- ⚡ Auto-refresh every 5 minutes

## Data Source

Data is sourced from:
- Sri Lanka Irrigation Department's Hydrology Division
- Repository: https://github.com/nuuuwan/lk_irrigation

## Alert Levels

- 🟢 **Normal**: < 2.0m
- 🟡 **Alert**: ≥ 2.0m
- 🟠 **Minor Flood**: ≥ 2.5m
- 🔴 **Major Flood**: ≥ 3.0m

## Deployment

This site is deployed on Vercel and updates automatically.

## Local Development
```bash
npm install
npm run dev
```

## Technologies

- React 18
- Vite
- Recharts
- Google Maps API

## License

MIT License - Data courtesy of Sri Lanka Irrigation Department
