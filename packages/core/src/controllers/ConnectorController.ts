import { subscribeKey as subKey } from 'valtio/utils'
import { proxy, ref } from 'valtio/vanilla'
import type { Connector, EmailConnector } from '../utils/TypeUtil.js'

// -- Types --------------------------------------------- //
export interface ConnectorControllerState {
  connectors: Connector[]
}

type StateKey = keyof ConnectorControllerState

// -- State --------------------------------------------- //
const state = proxy<ConnectorControllerState>({
  connectors: []
})

// -- Controller ---------------------------------------- //
export const ConnectorController = {
  state,

  subscribeKey<K extends StateKey>(key: K, callback: (value: ConnectorControllerState[K]) => void) {
    return subKey(state, key, callback)
  },

  setConnectors(connectors: ConnectorControllerState['connectors']) {
    state.connectors = connectors.map(c => ref(c))
  },

  addConnector(connector: Connector) {
    state.connectors.push(ref(connector))
  },

  getEmailConnector() {
    return state.connectors.find(c => c.type === 'EMAIL') as EmailConnector | undefined
  },

  getConnectors() {
    return state.connectors
  }
}
