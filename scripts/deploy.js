async function main() {
  console.log(`preparing deployment ...\n`)

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  
  //fetch contract to deploy (artifacts)
  const NFT = await ethers.getContractFactory("NFT");
  const Marketplace = await ethers.getContractFactory("Marketplace");

  //deploy contracts
  const nft = await NFT.deploy();
  console.log(`NFT deployed to : ${nft.address}`)

  const marketplace = await Marketplace.deploy(1);
  console.log(`Marketplace deployed to : ${marketplace.address}`)
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});