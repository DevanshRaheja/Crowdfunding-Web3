require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    defaultNetwork: "sepolia", //add goerli/sepolia as defaultNetwork
   
    sepolia: {
      hardhat: {},
      url: "https://sepolia.rpc.thirdweb.com", //sepolia endpoint link
      // chainId: 1337,
      // zksync: true,
      accounts: [`0x${process.env.PRIVATE_KEY}`], //it will append 0x and use private key of the metamask
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};