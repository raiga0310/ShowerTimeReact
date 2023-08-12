import './App.css'

import React, { useEffect, useState } from 'react'

//definition api response sction; section is aJSON format object
interface Section {
  id: number
  gender: string
  total: number
  available: number
  occupied: number
  disabled_rooms: number
}

function fetchSections(): Promise<Section[]> {
  return fetch('http://localhost:8081/showerrooms').then((res) => res.json())
}

function App() {
  const [sections, setSections] = useState<Section[]>([])
  let eventSource: EventSource
  useEffect(() => {
    console.log('fetching data')
    fetchSections().then((data) => setSections(data))
    eventSource = new EventSource('http://localhost:8081/events')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data)
      fetchSections().then((data) => setSections(data))
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="App" data-testid="app-page">
      <div className="section-container">
        {sections
          .filter((section) => section.gender === 'male')
          .map((section) => (
            <>
              <section className="section male">
                gender: {section.gender}
                total: {section.total}
                available: {section.available}
                occupied: {section.occupied}
                disabled_rooms: {section.disabled_rooms}
              </section>
            </>
          ))}
        {sections
          .filter((section) => section.gender === 'female')
          .map((section) => (
            <>
              <section className="section male">
                gender: {section.gender}
                total: {section.total}
                available: {section.available}
                occupied: {section.occupied}
                disabled_rooms: {section.disabled_rooms}
              </section>
            </>
          ))}
      </div>
    </div>
  )
}

export default App
