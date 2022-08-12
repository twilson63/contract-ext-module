export async function verified(state, action) {
  const verifiedAddress = {}
  const { votes } = await SmartWeave.contracts.readContractState('0SUMa9kAdQPLuHmEOWDfJiNsLXgP5rczB2ENWY4w-a4')
  verifiedAddresses = votes
    .filter(vote => vote.status === 'passed')
    .reduce((a, { value }) => ({ ...a, [value]: true }), {})
  return verifiedAddresses
}