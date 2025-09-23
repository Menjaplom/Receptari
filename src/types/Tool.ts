import { z } from 'zod'

export const toolSchema = z.object({
  name: z.string(),
  description: z.string().optional()
})

export type Tool = z.infer<typeof toolSchema>

export class NewTool {
  dragId: number
  name?: string
  description?: string

  constructor(tool: Tool, dragId: number) {
    this.dragId = dragId
    this.name = tool.name
    this.description = tool.description
  }

  exportTool(): Tool | null {
    return !this.name || this.name === ''
      ? null
      : {
          name: this.name,
          description: this.description
        }
  }
}
