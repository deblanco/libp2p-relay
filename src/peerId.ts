import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

export const generatePeerId = async () => {
  const newPeerId = await createEd25519PeerId()
  const normalizedPeer = {
    id: newPeerId.toString(),
    pubKey: uint8ArrayToString(newPeerId.publicKey, 'base64pad'),
    privateKey: newPeerId.privateKey
      ? uint8ArrayToString(newPeerId.privateKey, 'base64pad')
      : undefined
  }
  console.log('🚀 ~ file: peerId.ts:7 ~ generatePeerId ~ normalizedPeer:', normalizedPeer)
  return normalizedPeer
}
