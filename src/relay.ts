import * as LibP2P from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { mplex } from '@libp2p/mplex'
import { noise } from '@chainsafe/libp2p-noise'
import { kadDHT } from '@libp2p/kad-dht'
import { webRTCDirect } from '@libp2p/webrtc-direct'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
import { circuitRelayServer } from 'libp2p/circuit-relay'
import { topics } from './index.js'

export async function relay() {
  console.log('Initializing libp2p node...')
  const node = await LibP2P.createLibp2p({
    start: true,
    transports: [webSockets(), webRTCDirect()],
    streamMuxers: [mplex()],
    connectionEncryption: [noise()],
    peerDiscovery: [pubsubPeerDiscovery({ topics })],
    dht: kadDHT(),
    pubsub: gossipsub({ allowPublishToZeroPeers: true }),
    relay: circuitRelayServer(),
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/0/ws', '/ip4/0.0.0.0/tcp/9090/http/p2p-webrtc-direct']
    }
  })

  console.log('Initialized libp2p node!')

  // Event listeners
  node.addEventListener('peer:discovery', (peerId) => {
    console.log('Discovered:', peerId)
  })
  node.addEventListener('peer:connect', (peerId) => {
    console.log('Connected:', peerId)
  })

  console.log(
    'Listening on addresses:',
    node.getMultiaddrs().map((addr) => addr.toString())
  )

  return node
}
