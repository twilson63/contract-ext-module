import { verified } from './pkg/verified.js'

export async function handle(state, action) {
  if (action.input.function === 'hello') {
    const oldContract = await SmartWeave.contracts.readContractState('ZGaL5DOMIYRw9YHZ_NZ2JoIjST1QwhiD6T1jePH381I');

    console.log('oldContract', oldContract);
    state.greeting = action.input.greeting;
    return { state };
  }
  if (action.input.function === 'stamp') {

    const caller = action.caller;
    const addresses = await verified(state, action);
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
  throw new ContractError('function not defined');
}