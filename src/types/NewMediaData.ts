/*class NewMediaData {
  file: File
  url: string
  order: number

  constructor(file: File, url: string, order: number) {
    this.file = file
    this.url = url
    this.order = order
  }
}
  
export default NewMediaData*/

export type NewMediaDataType = {
  url: string
  order: number
  file?: File
}
