import { verified } from './pkg/verified.js'

export async function handle(state, action) {
  if (action.input.function === 'hello') {
    const oldContract = await SmartWeave.contracts.readContractState('8BJP39yp6mgPGUQLdWE55I3N35AWXSStn6y2H8faXJw')

    console.log('oldContract', oldContract)
    state.greeting = action.input.greeting
    return { state }
  }
  if (action.input.function === 'stamp') {

    const caller = action.caller
    const addresses = await verified(state, action)
    if (addresses[caller]) {// vouched
      state.stamps[`PERMAPAGE:${caller}`] = {
        asset: 'PERMAPAGE',
        address: caller,
        timestamp: action.input.timestamp,
        flagged: false
      }
    }
    return { state }
  }
  throw new ContractError('function not defined')
}