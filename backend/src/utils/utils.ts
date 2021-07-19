enum ENV {
  "development" = "development",
  "test" = "test",
  "production" = "production"
}

export const getDBNameForEnvironment = () => {
  if (process.env.ENVIRONMENT === ENV.production) {
    return "prod"
  }
  if(process.env.ENVIRONMENT === ENV.test) {
    return "test"
  }
  return "dev"
}