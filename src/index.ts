import dotenv from 'dotenv'
dotenv.config()
// import { client } from './client.js'
import { relay } from './relay.js'

export const topics = ['__stability__._peer-discovery._p2p._pubsub']

async function main() {
  const relayInstance = await relay()

  relayInstance.pubsub.subscribe('chat.__stability__')

  relayInstance.pubsub.addEventListener('message', (evt) => {
    const data = Buffer.from(evt.detail.data).toString('utf-8')
    console.log('Received message on topic', evt.detail.topic, 'from', evt.detail.from, ':', data)
  })

  //   const client0 = await client(relayAddr)
  //   client0.pubsub.addEventListener('message', (evt) => {
  //     const data = Buffer.from(evt.detail.data).toString('utf-8')
  //     console.log('CLIENT0 - Message received from', evt.detail.from, ':', data)
  //   })
  //   const client1 = await client(relayAddr)
  //   client1.pubsub.addEventListener('message', (evt) => {
  //     const data = Buffer.from(evt.detail.data).toString('utf-8')
  //     console.log('CLIENT1 - Message received from', evt.detail.from, ':', data)
  //   })

  //   setInterval(() => {
  //     client0.pubsub.publish('chat.__stability__', Buffer.from('Hello from client0!'))
  //     console.log(
  //       '🚀 ~ file: index.ts:26 ~ setInterval ~ client0.getMultiaddrs():',
  //       client0.getMultiaddrs()
  //     )
  //     console.log('🚀 ~ file: index.ts:27 ~ setInterval ~ client0.getPeers():', client0.getPeers())
  //   }, 5000)
}

main()
