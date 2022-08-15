// TODO : remove this file
const removeData = async () => {
  const IPFS = await import("ipfs-core");
  const ipfs = await IPFS.create({ silent: true });
  await ipfs.files.rm("/datastore.json");
}
removeData().then(() => {
  console.log("datastore.json removed...");
}).catch(err => {
  console.log(err.code);
}
);