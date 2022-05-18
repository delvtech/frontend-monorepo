import { SonraCategoryInfo, zx } from 'sonra'
import { ElementModel } from '.'
import { TrancheFactory__factory, Tranche__factory } from '../typechain'
import { provider } from "./provider"

export type PrincipalTokenInfo = SonraCategoryInfo<ElementModel, "principalToken">

export const buildPrincipalTokenInfo = async (trancheFactoryAddress: zx.Address): Promise<PrincipalTokenInfo> => {
  const trancheFactory = TrancheFactory__factory.connect(
    trancheFactoryAddress,
    provider,
  )

  const filter = trancheFactory.filters.TrancheCreated(null, null, null)
  const trancheCreatedEvents = await trancheFactory.queryFilter(
    filter,
  )

  const addressAndCreatedDateInfo: [zx.Address, Date, zx.CategorisedAddress<"wrappedPosition">][] = await Promise.all(
    trancheCreatedEvents.map(async (event) => {
      const address = zx.address().parse(event.args.trancheAddress)
      const termStart = new Date((await event.getBlock()).timestamp * 1000)
      const wrappedPosition = zx.address().category("wrappedPosition").conform().parse(event.args.wpAddress)
      return [address, termStart, wrappedPosition]
    }),
  )

  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse(addressAndCreatedDateInfo.map(([address]) => address))


  const metadata: PrincipalTokenInfo["metadata"] = {}

  for (const [address, termStart, position] of addressAndCreatedDateInfo) {
    const principalToken = Tranche__factory.connect(address, provider)

    const [
      name,
      symbol,
      decimals,
      underlying,
      termEnd,
      interestToken,
    ] = await Promise.all([
      principalToken.name(),
      principalToken.symbol(),
      principalToken.decimals(),
      principalToken
        .underlying()
        .then(zx.address().category('baseToken').conform().parse),
      principalToken
        .unlockTimestamp()
        .then((result) => new Date(result.toNumber() * 1000)),
      principalToken.interestToken().then(zx.address().category("yieldToken").conform().parse),
    ])

    metadata[address] = {
      name,
      symbol,
      decimals,
      underlying,
      term: {
        start: termStart,
        end: termEnd,
      },
      interestToken,
      position,
    }
  }



  return { addresses, metadata }
}
