export default () => ({
  KEY: '123123',
  google: {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
  },
  jwt:{
    key: process.env.jwtKey,
    refresh: process.env.jwtRefresh
  }
})
