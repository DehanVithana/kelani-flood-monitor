import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

function HistoricalChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        color: '#718096'
      }}>
        Loading historical data...
      </div>
    )
  }

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
          Water Level Trend (24 Hours)
        </h3>
      </div>
      <div style={{ padding: '20px' }}>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="time"
              stroke="#718096"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#718096"
              style={{ fontSize: '12px' }}
              label={{ value: 'Level (m)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <ReferenceLine y={2.0} stroke="#d97706" strokeDasharray="3 3" label="Alert" />
            <ReferenceLine y={2.5} stroke="#ea580c" strokeDasharray="3 3" label="Minor Flood" />
            <ReferenceLine y={3.0} stroke="#dc2626" strokeDasharray="3 3" label="Major Flood" />
            <Line
              type="monotone"
              dataKey="level"
              stroke="#667eea"
              strokeWidth={3}
              dot={{ fill: '#667eea', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default HistoricalChart
