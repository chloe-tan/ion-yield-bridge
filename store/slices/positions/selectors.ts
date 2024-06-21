import { chainsConfig } from '@/config/chains'
import { tokensConfig } from '@/config/token'
import { RootState } from '@/store'
import { utils } from '@/utils'
import { numToPercent } from '@/utils/number'
import { createSelector } from '@reduxjs/toolkit'
import { selectChain } from '../chain'
import { selectCurrency } from '../currency'
import { selectApys, selectUtilizationRates } from '../globalSelectors'
import { selectPrice } from '../price'
import { selectIonPoolLoading } from '../ionPool'
import { selectIonLensLoading } from '../ionLens'
import { selectAssetApysLoading } from '../assetApys'

export const selectPositions = (state: RootState) => state.positions.data
export const selectPositionsLoading = (state: RootState) => state.positions.loading

/**
 * Selects and formats the positions table data.
 *
 * @param {Array} positions - The positions array.
 * @param {string} chainKey - The chain key.
 * @param {number} price - The price.
 * @param {string} currency - The currency.
 * @param {Object} utilizationRates - The utilization rates object.
 * @param {Object} apys - The APYs object.
 * @returns {Array} The formatted positions table data.
 */
export const selectPositionsTableData = createSelector(
  [selectPositions, selectChain, selectPrice, selectCurrency, selectUtilizationRates, selectApys],
  (positions, chainKey, price, currency, utilizationRates, apys) => {
    const markets = Object.values(chainsConfig[chainKey].markets)

    const formattedPositions = positions.map((position) => {
      const market = markets.find((m) => m.id === position.marketId)
      if (!market) {
        throw new Error(`Market not found for marketId ${position.marketId}`)
      }

      const lenderAsset = tokensConfig[market.lenderAsset].name
      const collateralAsset = tokensConfig[market.collateralAsset].name
      const apy = apys[market.key]
      const utilizationRate = utilizationRates[market.key]

      const formattedMarket = `${lenderAsset} | ${collateralAsset}`
      const formattedTotalSupplied = utils.currencySwitch(currency, position.totalSupplied, price)
      const formattedApy = numToPercent(apy, { fractionDigits: 1 })
      const formattedUtilizationRate = numToPercent(utilizationRate, { fractionDigits: 1 })

      return {
        ...position,
        formattedMarket,
        formattedTotalSupplied,
        formattedApy,
        formattedUtilizationRate,
      }
    })
    return formattedPositions
  }
)

/**
 * Selects the loading state of positions along with their dependencies.
 *
 * @param positionsLoading - The loading state of positions.
 * @param ionPoolLoading - The loading state of ion pool.
 * @param ionLensLoading - The loading state of ion lens.
 * @param assetApysLoading - The loading state of asset APYs.
 * @returns The combined loading state of positions and their dependencies.
 */
export const selectPositionsLoadingWithDependencies = createSelector(
  [selectPositionsLoading, selectIonPoolLoading, selectIonLensLoading, selectAssetApysLoading],
  (positionsLoading, ionPoolLoading, ionLensLoading, assetApysLoading) => {
    return positionsLoading || ionPoolLoading || ionLensLoading || assetApysLoading
  }
)
