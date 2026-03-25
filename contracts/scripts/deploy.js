async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
    
    const CatNFT = await ethers.getContractFactory("CatNFT");
    const catNFT = await CatNFT.deploy();
    await catNFT.deployed();
    console.log("CatNFT deployed to:", catNFT.address);
    
    const CatMarketplace = await ethers.getContractFactory("CatMarketplace");
    const marketplace = await CatMarketplace.deploy();
    await marketplace.deployed();
    console.log("CatMarketplace deployed to:", marketplace.address);
    
    console.log("\nDeployment completed!");
    console.log("CatNFT:", catNFT.address);
    console.log("CatMarketplace:", marketplace.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
