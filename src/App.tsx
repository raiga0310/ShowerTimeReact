import './App.css'

import DoorFrontIcon from '@mui/icons-material/DoorFront'
import Man4Icon from '@mui/icons-material/Man4'
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import WomanIcon from '@mui/icons-material/Woman'
import React, { useEffect } from 'react'

import { fetchSections } from './api/showerrooms'
import { useEventSource } from './hooks/event'

//definition api response sction; section is aJSON format object
export interface Section {
  id: number
  gender: string
  total: number
  available: number
  occupied: number
  disabled_rooms: number
}

function App() {
  const [sections, setSections] = useEventSource()

  useEffect(() => {
    fetchSections().then((sections) => setSections(sections))
  }, [])

  const hanleReload = () => {
    location.reload()
  }
  return (
    <div className="App" data-testid="app-page">
      <RotateLeftIcon
        className="reload"
        sx={{ fontSize: 70 }}
        onClick={hanleReload}
      />
      <h2 className="title">
        シャワーの使用状況 <br /> Shower Room Status
      </h2>
      <div className="section-container">
        {sections
          .filter((section) => section.gender === 'male')
          .map((section) => (
            <>
              <section className="section male">
                <h2>男性 {section.gender}</h2>
                {pushItems(section.gender, section.available, 'available')}
                {pushItems(section.gender, section.occupied, 'occupied')}
                {pushItems(section.gender, section.disabled_rooms, 'disabled')}
              </section>
            </>
          ))}
        {sections
          .filter((section) => section.gender === 'female')
          .map((section) => (
            <>
              <section className="section male">
                <h2>女性 {section.gender}</h2>
                {pushItems(section.gender, section.available, 'available')}
                {pushItems(section.gender, section.occupied, 'occupied')}
                {pushItems(section.gender, section.disabled_rooms, 'disabled')}
              </section>
            </>
          ))}
      </div>
      <div className="description">
        <h3>
          この画面の見方 <br /> What icons show
        </h3>
        <div className="icon-container">
          <div className="icon-item">
            <DoorFrontIcon
              sx={{
                color: 'green',
                fontSize: 100,
              }}
            />
            <p>空き available</p>
          </div>
          <div className="icon-item">
            <Man4Icon sx={{ fontSize: 100 }} />
            <p>使用中 in use</p>
          </div>
          <div className="icon-item">
            <NoMeetingRoomIcon
              sx={{
                color: 'red',
                fontSize: 100,
              }}
            />
            <p>使用不可 disabled</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <h2>
          このアプリについて <br /> about this app
        </h2>
        <p>
          要望･不具合は､<a href="https://x.com/ahoxa1rx">Twitter(𝕏)</a>､または
          <a href="https://github.com/raiga0310/">GitHub</a>
          にて受け付けています｡
          <br />
          Requests and bug reports are accepted on{' '}
          <a href="https://x.com/ahoxa1rx">Twitter(𝕏)</a> or{' '}
          <a href="https://github.com/raiga0310/">GitHub</a>.
        </p>
      </div>
    </div>
  )
}

function pushItems(
  gender: String,
  count: number,
  status: String,
): React.ReactNode[] {
  const items = []
  for (let i = 0; i < count; ++i) {
    switch (status) {
      case 'available': {
        items.push(
          <DoorFrontIcon
            className="icon"
            sx={{
              color: 'green',
              fontSize: 100,
            }}
          />,
        )
        break
      }
      case 'occupied': {
        items.push(
          gender == 'male' ? (
            <Man4Icon sx={{ fontSize: 100 }} />
          ) : (
            <WomanIcon sx={{ fontSize: 100 }} />
          ),
        )
        break
      }
      case 'disabled': {
        items.push(
          <NoMeetingRoomIcon
            className="icon"
            sx={{
              color: 'red',
              fontSize: 100,
            }}
          />,
        )
        break
      }
    }
  }
  return items
}

export default App
