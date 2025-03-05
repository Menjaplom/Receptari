import { z } from 'zod'

export const mediaSchema = z.object({
  url: z.string(),
  footer:  z.string().optional()
})

export type Media = z.infer<typeof mediaSchema>

/*export type NewMedia = z.infer<typeof mediaSchema> & {
  order: number,
  urlAux: string,
  file?: File
}*/

export class NewMedia{
  dragId: number
  url: string
  urlAux: string
  footer?:  string
  file?: File

  constructor(media: Media, dragId: number) {
    this.dragId = dragId
    this.url = media.url
    this.urlAux = media.url
    this.footer = media.footer
  }

  exportMedia(): Media {
    return {
      'url': this.url,
      'footer': this.footer
    }
  }
}
