import { ConnectAwareButton } from '@/components/shared/ConnectAwareButton'
import { Text } from '@chakra-ui/react'
import { FunkitPaymentsIconLine, useConnectModal, useFunkitCheckout } from '@funkit/connect'
import { SubmitConnector } from './connector'

function Deposit({ onSubmit, loading, disabled, shouldUseFunCheckout }: SubmitConnector.Props) {
  const { openConnectModal } = useConnectModal()
  const { beginCheckout } = useFunkitCheckout({
    onLoginRequired: openConnectModal,
  })

  function handleClickSubmit() {
    onSubmit(beginCheckout)
  }

  return (
    <ConnectAwareButton
      h="fit-content"
      p={2}
      gap={1}
      isLoading={loading}
      onClick={handleClickSubmit}
      isDisabled={disabled}
      _hover={!loading && !disabled ? {} : undefined}
      _active={!loading && !disabled ? {} : undefined}
    >
      <Text variant="button">Mint {shouldUseFunCheckout && 'with Fun'}</Text>
      {shouldUseFunCheckout && <FunkitPaymentsIconLine />}
    </ConnectAwareButton>
  )
}

export default SubmitConnector.Connector(Deposit)
