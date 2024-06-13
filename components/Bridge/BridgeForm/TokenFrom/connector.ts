import { BridgeKey } from '@/config/bridges'
import { RootState } from '@/store'
import { selectBridgeFrom } from '@/store/slices/bridges'
import { setBridgeFrom } from '@/store/slices/bridges/thunks'
import { ConnectedProps, connect } from 'react-redux'

const mapState = (state: RootState, ownProps: TokenFromOwnProps) => {
  const bridgeKey = state.router.query?.bridge as BridgeKey

  const inputValue = selectBridgeFrom(state, bridgeKey)

  return {
    inputValue,
  }
}

const mapDispatch = {
  onChange: setBridgeFrom,
}

const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>

interface TokenFromOwnProps {}

interface TokenFromProps extends TokenFromOwnProps, PropsFromRedux {}

export namespace TokenFromConnector {
  export const Connector = connector
  export type Props = TokenFromProps
}
