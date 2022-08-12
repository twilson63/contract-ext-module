
  // src/pkg/verified.js
  async function verified(state, action) {
    const verifiedAddress = {};
    const { votes } = await SmartWeave.contracts.readContractState("0SUMa9kAdQPLuHmEOWDfJiNsLXgP5rczB2ENWY4w-a4");
    verifiedAddresses = votes.filter((vote) => vote.status === "passed").reduce((a, { value }) => ({ ...a, [value]: true }), {});
    return verifiedAddresses;
  }

  // src/contract.js
  export async function handle(state, action) {
    if (action.input.function === "hello") {
      const oldContract = await SmartWeave.contracts.readContractState("8BJP39yp6mgPGUQLdWE55I3N35AWXSStn6y2H8faXJw");
      console.log("oldContract", oldContract);
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

