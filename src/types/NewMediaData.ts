class NewMediaData {
  file: File
  url: string
  order: number

  constructor(file: File, url: string, order: number) {
    this.file = file
    this.url = url
    this.order = order
  }
}

export type NewMediaDataType = {
  file: File
  url: string
  order: number
}
export default NewMediaData
