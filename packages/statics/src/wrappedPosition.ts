import { SonraCategoryInfo, zx } from 'sonra'
import { ElementModel } from '.'
import { WrappedPosition__factory } from '../typechain'
import { PrincipalTokenInfo } from './principalToken'
import { provider } from './provider'

export type WrappedPositionInfo = SonraCategoryInfo<ElementModel, "wrappedPosition">

export const buildWrappedPositionInfo = async (principalTokenInfo: PrincipalTokenInfo): Promise<WrappedPositionInfo> => {
    const principalTokenAddressesByPosition: Record<zx.Address, zx.CategorisedAddress<"principalToken">[]> = {}

    for (const [principalTokenAddress, { position }] of Object.entries(principalTokenInfo.metadata)) {
        const wpAddress = zx.address().conform().parse(position)
        if (
            !Array.isArray(principalTokenAddressesByPosition[wpAddress])
        ) {
            principalTokenAddressesByPosition[wpAddress] = []
        }

        principalTokenAddressesByPosition[wpAddress] = [
            ...principalTokenAddressesByPosition[wpAddress],
            zx.address().category("principalToken").conform().parse(principalTokenAddress)
        ]
    }

    const addresses = zx.address().conform().array().nonempty().parse(Object.keys(principalTokenAddressesByPosition))

    const metadata: WrappedPositionInfo["metadata"] = {}
    for (const address of addresses) {
        const wrappedPosition = WrappedPosition__factory.connect(address, provider)

        const [name, symbol, decimals, token] = await Promise.all([
            wrappedPosition.name(),
            wrappedPosition.symbol(),
            wrappedPosition.decimals(),
            wrappedPosition.token().then(zx.address().parse)
        ])

        const tranches = zx.address().category("principalToken").array().nonempty().parse(principalTokenAddressesByPosition[address])
        metadata[address] = { name, symbol, decimals, tranches, token }
    }

    return { metadata, addresses }

}
