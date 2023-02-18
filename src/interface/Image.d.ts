export interface Image extends ImageGenerated {
  id: string
  name: string
}
export interface ImageGenerated {
  url: string
  prompt: string
}
