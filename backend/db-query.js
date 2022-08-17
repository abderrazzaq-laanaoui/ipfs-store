class SvgStorage {
  constructor(Ipfs, OrbitDB) {
    this.Ipfs = Ipfs
    this.OrbitDB = OrbitDB
  }

  async create() {
    this.node = await this.Ipfs.create({
      preload: { enabled: false },
      repo: './ipfs',
      EXPERIMENTAL: { pubsub: true },
      config: {
        Bootstrap: [],
        Addresses: { Swarm: [] }
      }
    })
    this._init()
  }
  async _init() {
    this.orbitdb = await this.OrbitDB.createInstance(this.node)
    this.defaultOptions = {
      accessController: {
        write: [this.orbitdb.identity.id]
      }
    }

    const docStoreOptions = {
      ...this.defaultOptions,
      indexBy: 'id',
    }

    this.imagesStore = await this.orbitdb.docstore('images', docStoreOptions);
    await this.imagesStore.load();
    this.onready ? this.onready() : null;
  }

  async addNewImage({ id, name, price, image }) {
    if (!id) {
      id = this.imagesStore.get('').length + 1;
    }

    const existingImage = await this.getImageById(id);
    if (existingImage) {
      return await this.updateImageByid(id, { name, price, image });
    }

    await this.imagesStore.put({ id, name, price, image });
    return this.imagesStore.get(id)[0];
  }

  getAllImages() {
    return this.imagesStore.get('')
  }

  getImageById(id) {
    const singleImage = this.imagesStore.get(id)[0]
    return singleImage
  }

  getImageByName(name) {
    return this.imagesStore.query((item) => item.name === name)
  }

  async updateImageByid(id, { name, price, image }) {
    const item = await this.getImageById(id)
    item.name = name ? name : null;
    item.price = price ? price : null;
    item.image = image ? image : null;
    await this.imagesStore.put(item);
    return item;
  }
  async deleteImageByid(id) {
    const cid = await this.imagesStore.del(id)
    return cid
  }

  getSixImages(counter) {
    let res = {};
    if (!counter) {
      let lastId = this.getAllImages().length;
      counter = Math.ceil(lastId / 6) - 1;
    }
    res.groupId = counter;
    res.items = this.imagesStore.query((item) => item.id > counter * 6 && item.id <= (counter + 1) * 6);
    return res;
  }
}

import * as  Ipfs from 'ipfs';
import OrbitDB from 'orbit-db';
const SVG = new SvgStorage(Ipfs, OrbitDB)


export default SVG;

