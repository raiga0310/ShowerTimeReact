import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchSections } from '../api/showerrooms'
import { Section } from '../App'

export function useEventSource() {
  const [sections, setSections] = useState<Section[]>([])
  const eventSourceRef = useRef<EventSource | null>(null)

  const connectToEventSource = useCallback((eventSourceUrl: string) => {
    if (eventSourceRef.current == null) {
      const eventSource = new EventSource(eventSourceUrl)

      eventSource.onmessage = function (event) {
        console.log('event: ', event.data)
        //update state
        fetchSections().then((data) => setSections(data))
      }

      eventSource.onerror = function (event) {
        console.log('error: ', event)
        //reconnect
        eventSource.close()
        connectToEventSource(eventSourceUrl)
      }

      eventSourceRef.current = eventSource
      return
    }
  }, [])

  const closeEventSource = useCallback(() => {
    if (eventSourceRef.current != null) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
  }, [eventSourceRef.current])

  useEffect(() => {
    connectToEventSource('http://localhost:8081/events')
    return () => {
      closeEventSource()
    }
  }, [])

  useEffect(() => {
    console.log('fetching data')
    fetchSections().then((data) => setSections(data))
  }, [])

  return [sections, setSections] as const
}
