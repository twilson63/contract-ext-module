export async function verified(state, action) {
  const res = await SmartWeave.contracts.readContractState("ZGaL5DOMIYRw9YHZ_NZ2JoIjST1QwhiD6T1jePH381I").readState();
  const verifiedAddresses = res.state.votes
    .filter(vote => vote.status === 'passed')
    .reduce((a, { value }) => ({ ...a, [JSON.stringify(value)]: true }), {});
  return verifiedAddresses;
}