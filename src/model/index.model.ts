// creates a postgreSQL configuration file that creates conncetions based
// on the NODE_ENV

const modelConfiy = (devEnv: string): void => {
  if (devEnv === 'developent') {
    console.log(devEnv)
  } else {
    console.log('production')
  }
}
