import fs from 'fs'

export const deployVouch = (warp, wallet) => {
  const vouchResult = await warp.createContract.deploy({
    src: fs.readFileSync('./tests/fixtures/vouch-src.js', 'utf-8'),
    wallet,
    initState: JSON.stringify({
      "name": "VouchDAO",
      "roles": {},
      "vault": {
        "UZ1YsJa8yJrw8yynYzhaAikqD1uuMu9gi9u7Ia_Eja8": [
          {
            "balance": 10000000,
            "end": 992169,
            "start": 991449
          }
        ]
      },
      "votes": [
        {
          "status": "passed",
          "type": "set",
          "note": "Verifying Tom's twitter verification address",
          "yays": 7200000000,
          "nays": 0,
          "voted": [
            "UZ1YsJa8yJrw8yynYzhaAikqD1uuMu9gi9u7Ia_Eja8"
          ],
          "start": 991453,
          "totalWeight": 7200000000,
          "key": "Voucher",
          "value": "Ax_uXyLQBPZSQ15movzv9-O1mDo30khslqN64qD27Z8"
        }
      ],
      "ticker": "VOUCH",
      "balances": {
        "UZ1YsJa8yJrw8yynYzhaAikqD1uuMu9gi9u7Ia_Eja8": 0
      },
      "settings": [
        [
          "quorum",
          0.5
        ],
        [
          "support",
          0.5
        ],
        [
          "voteLength",
          2000
        ],
        [
          "lockMinLength",
          720
        ],
        [
          "lockMaxLength",
          720
        ],
        [
          "communityLogo",
          "uFV_tr2eAhwrK9FryP-NtFTw3N-WshC0iIMP7MvIVHY"
        ],
        [
          "communityDescription",
          "VouchDAO allows users to verify once and be trusted everywhere on the Permaweb."
        ],
        [
          "communityAppUrl",
          "https://www.twitter.com/vouchdao"
        ],
        [
          "Voucher",
          "Ax_uXyLQBPZSQ15movzv9-O1mDo30khslqN64qD27Z8"
        ]
      ]
    })
  })
  console.log(vouchResult)
  return vouchResult
}