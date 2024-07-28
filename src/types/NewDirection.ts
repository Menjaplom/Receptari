import NewMediaData from './NewMediaData'

class NewDirection {
  key: Number
  description: String
  media: Array<NewMediaData>

  constructor(key: number, description: string, media: Array<NewMediaData>) {
    this.key = key
    this.description = description
    this.media = media
  }
}

export default NewDirection
