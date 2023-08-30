import { Section } from '../App'

export function fetchSections(): Promise<Section[]> {
  return fetch('http://localhost:8081/showerrooms').then((res) => res.json())
}
