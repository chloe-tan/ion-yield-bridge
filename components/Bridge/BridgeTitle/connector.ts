import { etherscanBaseUrl } from '@/config/constants'
import { uiConfig } from '@/config/ui'
import { RootState } from '@/store'
import { selectChainConfig, selectContractAddressByName } from '@/store/slices/bridges'
import { ChainKey } from '@/types/ChainKey'
import { ChakraProps } from '@chakra-ui/react'
import { ConnectedProps, connect } from 'react-redux'

const mapState = (state: RootState, ownProps: BridgeTitleOwnProps) => {
  const chainKey = state.router.query?.bridge as ChainKey
  const chainConfig = selectChainConfig(state)

  const descriptionLength = uiConfig.pages.bridge.title.descriptionLenth
  const description = chainConfig?.description || ''
  const truncatedDescription =
    description.length > descriptionLength ? description.substring(0, descriptionLength) + '...' : description

  const boringVaultAddress = selectContractAddressByName('boringVault')(state)
  const etherscanHref = boringVaultAddress ? `${etherscanBaseUrl}${boringVaultAddress}` : undefined

  return {
    chainKey,
    name: chainConfig?.name,
    description: truncatedDescription,
    etherscanHref,
  }
}

const mapDispatch = {}

const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>

interface BridgeTitleOwnProps {}

interface BridgeTitleProps extends BridgeTitleOwnProps, PropsFromRedux, ChakraProps {}

export namespace BridgeTitleConnector {
  export const Connector = connector
  export type Props = BridgeTitleProps
}
