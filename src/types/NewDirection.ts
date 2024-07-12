import MediaCarrouselData from './MediaCarrouselData'

class NewDirection {
  key: Number
  description: String
  media: Array<MediaCarrouselData>

  constructor(key: number, description: string, media: Array<MediaCarrouselData>) {
    this.key = key
    this.description = description
    this.media = media
  }
}

export default NewDirection
