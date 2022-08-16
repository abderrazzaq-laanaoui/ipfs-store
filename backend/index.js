

SVG.onready = async () => {
    const hash = "QmNR2n4zywCV61MeMLB6JwPueAPqheqpfiA4fLPMxouEmQ";
    let cid;
    let content
    // console.log("hash", hash)
    // // cid = await SVG.deletePieceByid(CID.parse("QmNR2n4zywCV61MeMLB6JwPueAPqheqpfiA4fLPMxouEmQ"));
    //  cid = await SVG.addNewImage({ id: 4, name: "SVG 4", price: 4, image: "<svg></svg>" });
    // console.log("cid", cid);

    cid = await SVG.deleteImageByid(5);

    console.log("cid", cid);
    content = await SVG.getAllImages()
    console.log(content)

    const images = SVG.getImageById(hash)
    // cid = await SVG.incrementPracticeCounter(piece)
    // content = await SVG.node.dag.get(cid)
    // console.log(content.value.payload)

    // await SVG.updateProfileField("username", "aphelionz")
    // var profileFields = SVG.getAllProfileFields();
    // console.log(profileFields)
    // await SVG.deleteProfileField("username")
}


SVG.create()