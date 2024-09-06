import { type NewMediaDataType } from './NewMediaData'

export type NewDirectionType = {
  key: Number
  description: String
  media: Array<NewMediaDataType>
}
/*
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

export default NewDirection*/
