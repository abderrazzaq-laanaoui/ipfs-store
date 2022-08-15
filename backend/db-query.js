// 1. Load data from json file stored in ipfs.files  to an Object
/*
 * a. create ipfs node  
 * b. create a datastore in the ipfs node if it doesn't exist yet with initial data
 * c. load data from json file stored in ipfs.files  to an Object
 */

// 2. Query data from the object using query-json library when get function is called
// 3. Update data in the object using update-json library when put function is called and update the json file in ipfs.files


const loadIpfs = async () => {
  const IPFS = await import("ipfs-core");
  const ipfs = await IPFS.create({ url: "https://ipfs.infura.io:5001/api/v0", silent: true });
  return ipfs.files;
};

const createDatastore = async (node) => {
  try {
    for await (let chunck of node.read("/datastore.json"));
  } catch (e) {
    const data = await node.write(
      "/datastore.json",
      Buffer.from(
        JSON.stringify({
          id: 1,
          groups: [],
        })
      ),
      { create: true }
    );

    console.log("datastore.json created...");
  }
};


const getDataObject = async (node) => {
  let dataArray = [];
  for await (const val of node.read("/datastore.json")) {
    dataArray.push(val);
  }
  return JSON.parse(dataArray.toString());
};
  
const getItemGrp = (id) => {
  return Math.ceil(id / 6) - 1;
}

const put = async (node, value) => {
  let data = await getDataObject(node);
  let index = getItemGrp(data.id);
  value.id = data.id;
  if (data.groups[index] === undefined) {
    data.groups[index] = [];
  }
  data.groups[index].push(value);
  data.id++;
  await node.write("/datastore.json", Buffer.from(
    JSON.stringify(data)), { create: true });
  return value;
};

const getLastGrp = async (node) => {
  let ret = {};
  let data = await getDataObject(node);
  let index = getItemGrp(data.id > 0 ? data.id - 1 : data.id);
  ret.groupId = index;
  ret.items = data.groups[index];
  return ret;
}
const get = async (node, grpkey) => {
  const data = await getDataObject(node);
  return data.groups[grpkey];
}

const getItem = async (id) => {
  const data = await getDataObject(node);
  return data.groups[getItemGrp(id)][id];
}
const main = async () => {
  let node = await loadIpfs();
  await createDatastore(node);
  return node;
};

module.exports = { main, put, get, getLastGrp };


