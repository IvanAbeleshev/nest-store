declare global {
  namespace NodeJS {
    interface ProcessEnv {
      clientID: string,
      clientSecret: string,
      callbackURL: string,

      jwtKey: string,
      jwtRefresh: string,

      DATABASE_URL: string,
      
      redirectURL: string
    }
  }
}

export {}