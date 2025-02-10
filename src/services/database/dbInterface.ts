export interface dbConnection {
  ready: boolean

  connect(dbName: string): Promise<void>
}
