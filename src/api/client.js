// src/api/client.js

import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import hooks from 'feathers-hooks'
import auth from 'feathers-authentication-client'
import io from 'socket.io-client/dist/socket.io'

const host = 'http://localhost:3030'
export const FEATHERS_TOKEN_KEY = 'VeganChallenger'

const socket = io(host, {
  transports: ['websocket']
})

const feathersClient = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage,
    storageKey: FEATHERS_TOKEN_KEY,
  }))

export default feathersClient
