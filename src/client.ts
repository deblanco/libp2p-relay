import * as LibP2P from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { mplex } from '@libp2p/mplex'
import { noise } from '@chainsafe/libp2p-noise'
import { kadDHT } from '@libp2p/kad-dht'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
import { circuitRelayTransport } from 'libp2p/circuit-relay'
import { topics } from './index.js'
import { multiaddr } from '@multiformats/multiaddr'

export const client = async (relayAddr: string) => {
  console.log('Initializing libp2p node...')
  const node = await LibP2P.createLibp2p({
    start: true,
    transports: [webSockets(), circuitRelayTransport()],
    streamMuxers: [mplex()],
    connectionEncryption: [noise()],
    peerDiscovery: [pubsubPeerDiscovery({ topics })],
    dht: kadDHT(),
    pubsub: gossipsub({ allowPublishToZeroPeers: true })
  })

  console.log('Initialized libp2p node!')

  // Event listeners
  node.addEventListener('peer:discovery', (peerId) => {
    console.log('Discovered:', peerId.detail)
  })
  node.addEventListener('peer:connect', (peerId) => {
    console.log('Connected:', peerId.detail)
  })

  node.pubsub.subscribe('chat.__stability__')

  console.log(
    'Listening on addresses:',
    node.getMultiaddrs().map((addr) => addr.toString())
  )

  await node.dial(multiaddr(relayAddr))

  return node
}
