// TODO : remove this file
const removeData = async()=>{
    const IPFS = await import("ipfs-core");
  const ipfs = await IPFS.create({ silent: true });
   await ipfs.files.rm("/datastore.json");
   return;
}
removeData();