import client from './client'

class API {
  constructor() {
    this.app = client
  }

  service(serviceName) {
    return this.app.service(serviceName)
  }

  authenticate(user) {
    const { email, password } = user
    return this.app.authenticate({
      strategy: 'local',
      email,
      password
    })
    .then(response => {
      console.log('Authenticated!', response);
      return this.app.passport.verifyJWT(response.accessToken)
    })
    .then(payload => {
      console.log('JWT Payload', payload);
      return this.app.service('users').get(payload.userId);
    })
  }

  signOut() {
    return this.app.logout()
  }
}

export default API
