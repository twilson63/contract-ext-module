
// src/pkg/verified.js
async function verified(state, action) {
  const verifiedAddress = {};
  const { votes } = await SmartWeave.contracts.readContractState("ZGaL5DOMIYRw9YHZ_NZ2JoIjST1QwhiD6T1jePH381I");
  verifiedAddresses = votes.filter((vote) => vote.status === "passed").reduce((a, { value }) => ({ ...a, [value]: true }), {});
  return verifiedAddresses;
}

// src/contract.js
export async function handle(state, action) {
  if (action.input.function === "hello") {
    state.greeting = action.input.greeting;
    return { state };
  }


  if (action.input.function === "verify") {
    const caller = action.caller;
    const items = await verified(state, action);
    return items[caller] || false;
  }
  throw new ContractError("function not defined");
}

