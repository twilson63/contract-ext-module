import { test } from 'uvu'
import * as assert from 'uvu/assert'
import fs from 'fs'
import ArLocal from 'arlocal'
import Arweave from 'arweave'
import { WarpNodeFactory, LoggerFactory } from 'warp-contracts'

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http'
})

LoggerFactory.INST.logLevel('debug')
const warp = WarpNodeFactory.forTesting(arweave)
const wallet = await arweave.wallets.generate()
const addr = await arweave.wallets.jwkToAddress(wallet)
const src = fs.readFileSync('./dist/contract.js', 'utf-8')

const initState = JSON.stringify({
  greeting: ''
})


test('hello', async () => {
  //const arlocal = new ArLocal.default()
  //await arlocal.start()

  await arweave.api.get(`mint/${addr}/${arweave.ar.arToWinston('1000')}`)
  await arweave.api.get('mine')


  // // deploy contract 
  const result = await warp.createContract.deploy({
    initState,
    src,
    wallet
  })
  console.log(result)
  const contract = warp.contract(result.contractTxId).connect(wallet)
  const result2 = await contract.viewState({
    function: 'verify'
  })
  console.log('result', result2.result)
  //const id = await contract
  //   .writeInteraction({
  //     function: 'hello',
  //     greeting: 'Phil'
  //   })

  // console.log('writetransaction', id)
  await arweave.api.get('mine')

  // const { state } = await contract.readState()
  // console.log(state)
  assert.equal(true, true)
  //assert.equal(state.greeting, 'Phil')

  //await arlocal.stop()
})

test.run()