export interface Port {
  id: number
  provider: {
    name: string
    location: string
  }
  portName: string
  portSpeed: string
  term: string
}
