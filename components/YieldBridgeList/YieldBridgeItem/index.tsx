import { BridgeIcon } from '@/components/config/bridgeIcons'
import { BridgeUI } from '@/types/Bridge'
import { Flex, Skeleton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface YieldBridgeItemProps {
  bridge: BridgeUI
  loading?: boolean
}

export function YieldBridgeItem({ bridge, loading }: YieldBridgeItemProps) {
  const router = useRouter()

  function handleClick() {
    router.push(`/bridge/${bridge.key}`)
  }

  return (
    <Flex
      h="175px"
      border="1px solid"
      borderColor="border"
      w="350px"
      borderRadius="16px"
      overflow="hidden"
      cursor="pointer"
      _hover={{ bg: 'hover' }}
      _active={{ bg: 'active' }}
      onClick={handleClick}
    >
      {/* Text Section */}
      <Flex w="225px" py={6} pl={6} direction="column" justify="center">
        {/* Bridge Name */}
        <Text variant="header3">{bridge.name}</Text>

        {/* Bridge Description */}
        <Text>{bridge.description}</Text>

        {/* TVL & APY */}
        <Flex mt={3} gap={6}>
          {/* TVL */}
          <Flex direction="column">
            <Text>TVL</Text>
            <Skeleton isLoaded={!loading} w="100px">
              <Text variant="large">{bridge.tvl.formatted}</Text>
            </Skeleton>
          </Flex>

          {/* APY */}
          <Flex direction="column">
            <Text>APY</Text>
            <Skeleton isLoaded={!loading}>
              <Text variant="large">{bridge.apy.formatted}</Text>
            </Skeleton>
          </Flex>
        </Flex>
      </Flex>

      {/* Logo Section */}
      <Flex flex={1} position="relative">
        <BridgeIcon bridgeKey={bridge.key} fontSize="160px" position="absolute" bottom="-20px" right="-40px" />
      </Flex>
    </Flex>
  )
}
