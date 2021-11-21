const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["SpongeBob", "C.Ronaldo", "Doraemon"], // Names
    [
      "https://i.imgur.com/l4pF9Fb.png", // Images
      "https://imgur.com/a/LNzHGlQ.png",
      "https://imgur.com/pmMXDpH.png",
    ],
    [100, 5, 300], // HP values
    [100, 50, 125], // Attack damage values
    "Rocky", // Boss name
    "https://imgur.com/1Gil4PN.png", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
