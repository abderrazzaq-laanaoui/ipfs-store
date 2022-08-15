import { create } from 'ipfs'
import OrbitDB from 'orbit-db'
const config = {
  ipfs: {
    preload: {
      enabled: false
    },
    config: {
      Addresses: {
        Swarm: [
          '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
          '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
          '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/'
        ]
      }
    }
  }
}

export default config

  ; (async function () {
    const ipfs = await create(config.ipfs)
    const orbitdb = await OrbitDB.createInstance(ipfs)

    // Create / Open a database
    const db = await orbitdb.log("hello")
    await db.load()

    // Listen for updates from peers
    db.events.on("replicated", address => {
      console.log(db.iterator({ limit: -1 }).collect())
    })

    // Add an entry
    const hash = await db.add("world")
    console.log(hash)

    // Query
    const result = db.iterator({ limit: -1 }).collect()
    console.log(JSON.stringify(result, null, 2))
  })()