import DHBWCoin from "./abi/DHBWCoin.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "http",
      url: "http://127.0.0.1:7545",
    },
  },
  contracts: [DHBWCoin],
  events: {},
  polls: {
    accounts: 1500,
  },
};

export default options;
