import { boolean, z } from 'zod'

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

export const suppImgFileType = [ 
  '.apng',
  '.png',
  '.avif',
  '.gif',
  '.jpg',
  '.jpeg',
  '.jfif',
  '.pjpeg',
  '.pjp',
  '.png',
  '.webp'
]

export const suppVideoFileType = [
  '.mp4',
  '.webm',
  '.3gpp',
  '.3gpp2',
  '.3gp2',
  '.mpeg',
  '.mov',
  '.ogg'
]

export function isImage(media: string): boolean {
  let suffix = media.slice(media.lastIndexOf('.'));// + 1); // or +1 if were to remove the dot in the future
  return suppImgFileType.includes(suffix)
}
