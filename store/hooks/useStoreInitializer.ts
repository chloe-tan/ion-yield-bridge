import { useAccount } from 'wagmi'
import { useAppDispatch } from '../hooks'
import { setAddress } from '@/store/slices/account'
import { useEffect } from 'react'
import { fetchWeETHBalance } from '@/store/slices/balance'
import { fetchPrice } from '../slices/price'
import { fetchBridgeApy, fetchBridgeTvl } from '../slices/bridges/thunks'
import { BridgeKey } from '@/types/Bridge'

export function useStoreInitializer() {
  const dispatch = useAppDispatch()
  const { address } = useAccount()

  useEffect(() => {
    if (address) dispatch(setAddress(address))
    dispatch(fetchWeETHBalance())
    dispatch(fetchPrice())
    Object.values(BridgeKey).forEach((key) => {
      dispatch(fetchBridgeTvl(key))
      dispatch(fetchBridgeApy(key))
    })
  }, [address, dispatch])
}
