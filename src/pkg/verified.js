import { WarpWebFactory } from "warp-contracts";
const Arweave = require("arweave");

const arweave = Arweave.init({
  host: "arweave.net",
  port: "443",
  protocol: "https",
  timeout: 20000,
  logging: false,
});

export async function verified(state, action) {
  const smartweave = WarpWebFactory.memCachedBased(arweave).useArweaveGateway().build();
  const contract = smartweave.contract("ZGaL5DOMIYRw9YHZ_NZ2JoIjST1QwhiD6T1jePH381I");
  (async () => {
    const state = await contract.readState();
    const verifiedAddresses = state.votes
      .filter(vote => vote.status === 'passed')
      .reduce((a, { value }) => ({ ...a, [JSON.stringify(value)]: true }), {});
    return verifiedAddresses;
  })();
}