import { SonraFetch, z, zx } from 'sonra'
import { buildBaseTokenInfo } from './baseToken'
import { trancheFactoryAddress } from './constants'
import { buildPrincipalTokenInfo } from './principalToken'
import { buildWrappedPositionInfo } from './wrappedPosition'
import { buildYieldTokenInfo } from './yieldToken'

export const elementModel = {
  trancheFactory: z.object({}),
  baseToken: zx.erc20().extend({
    totalSupply: zx.bignumber(),
  }),
  yieldToken: zx.erc20().extend({
    underlying: zx.address().category('baseToken'),
    tranche: zx.address().category("principalToken"),
    term: z.object({
      start: z.date(),
      end: z.date(),
    }),
  }),
  wrappedPosition: zx.erc20().extend({
    token: zx.address(),
    tranches: zx.address().category("principalToken").array().nonempty()
  }),
  principalToken: zx.erc20().extend({
    underlying: zx.address().category('baseToken'),
    interestToken: zx.address().category("yieldToken"),
    position: zx.address().category("wrappedPosition"),
    term: z.object({
      start: z.date(),
      end: z.date(),
    }),
  })
} as const

export type ElementModel = typeof elementModel


export const elementFetch: SonraFetch<ElementModel> = async () => {
  const principalTokenInfo = await buildPrincipalTokenInfo(trancheFactoryAddress)

  const [baseTokenInfo, yieldTokenInfo, wrappedPosition] = await Promise.all([
    buildBaseTokenInfo(principalTokenInfo),
    buildYieldTokenInfo(principalTokenInfo),
    buildWrappedPositionInfo(principalTokenInfo)
  ])

  return {
    addresses: {
      trancheFactory: [trancheFactoryAddress],
      baseToken: baseTokenInfo.addresses,
      principalToken: principalTokenInfo.addresses,
      yieldToken: yieldTokenInfo.addresses,
      wrappedPosition: wrappedPosition.addresses
    },
    contracts: {
      trancheFactory: 'TrancheFactory.sol',
      baseToken: 'ERC20.sol',
      principalToken: 'Tranche.sol',
      yieldToken: "InterestToken.sol",
      wrappedPosition: "WrappedPosition.sol"
    },
    metadata: {
      trancheFactory: {},
      baseToken: baseTokenInfo.metadata,
      principalToken: principalTokenInfo.metadata,
      yieldToken: yieldTokenInfo.metadata,
      wrappedPosition: wrappedPosition.metadata
    },
  }
}
