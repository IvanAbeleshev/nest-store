export default () => ({
  google: {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
  },
  jwt:{
    key: process.env.jwtKey,
    refresh: process.env.jwtRefresh
  },
  redirectUrl: process.env.redirectURL
})
