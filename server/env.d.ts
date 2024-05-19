declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      RESEND_API_KEY: string
    }
  }
}

export {}
