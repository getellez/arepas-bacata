export abstract class ConfigServer {
  constructor() {
    require('dotenv').config({ path: this.getEnvFile(this.nodeEnv) })
  }
  public getEnvironment(k: string): string | undefined {
    return process.env[k]
  }

  public getNumberEnv(k: string) {
    return Number(process.env[k])
  }

  get nodeEnv(): string {
    // nodeEnv = 'local', 'development', 'production' or 'test'
    return this.getEnvironment('NODE_ENV')?.trim() ?? ''
  }

  public getEnvFile(nodeEnv: string): string {
    // nodeEnv = 'local', 'development', 'production' or 'test'
    console.log('NODE_ENV :>> ', process.env.NODE_ENV)
    if (!nodeEnv.length) {
      return '.env'
    }

    return `.env.${nodeEnv}`
  }
}
