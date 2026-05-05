import { z } from 'zod'

export const toolSchema = z.object({
  name: z.string(),
  units: z.number().int().optional(),
  description: z.string().optional()
})

export type Tool = z.infer<typeof toolSchema>

export class NewTool {
  dragId: number
  name?: string
  units?: number
  description?: string

  constructor(tool: Tool, dragId: number) {
    this.dragId = dragId
    this.name = tool.name
    this.units = tool.units
    this.description = tool.description
  }

  exportTool(): Tool | null {
    return !this.name || this.name === ''
      ? null
      : {
          name: this.name,
          description: this.description,
          units: this.units
        }
  }
}
