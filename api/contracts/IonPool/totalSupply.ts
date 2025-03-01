import { ChainKey, chainsConfig } from '@/config/chains'
import { wagmiConfig } from '@/config/wagmi'
import IonPool from '@/contracts/IonPool.json'
import { MarketKey } from '@/types/Market'
import { Abi } from 'viem'
import { readContract } from 'wagmi/actions'

export async function totalSupply({
  chainKey,
  marketKey,
}: {
  chainKey: ChainKey
  marketKey: MarketKey
}): Promise<bigint> {
  const contractAddress = chainsConfig[chainKey].markets[marketKey].contracts.ionPool
  const totalSupply = (await readContract(wagmiConfig, {
    abi: IonPool.abi as Abi,
    address: contractAddress,
    functionName: 'totalSupply',
    args: [],
  })) as bigint

  return totalSupply
}
