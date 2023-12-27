declare global {
  namespace NodeJS {
    interface ProcessEnv {
      clientID: string,
      clientSecret: string,
      callbackURL: string,

      jwtKey: string,

      DATABASE_URL: string,
    }
  }
}

export {}