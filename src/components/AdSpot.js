import {
  Flex,
  Box,
  Link as ChakraLink,
  Text,
  Stack,
  Image,
  Heading,
  SkeletonCircle,
  SkeletonText,
  HStack,
} from '@chakra-ui/react';

const AdSpot = ({ adInfo }) => {
  if (!adInfo.success) {
    return (
      <Flex justifyContent='center' direction='column'>
        <Box
          p={4}
          w='100%'
          borderRadius='6px'
          border='1px'
          borderColor='gray.300'
        >
          <HStack>
            <SkeletonText w='250px' mt='4' noOfLines={5} spacing='2' />
            <SkeletonCircle
              startColor='gray.500'
              endColor='blue.500'
              size='20'
            />
          </HStack>
        </Box>
        <SkeletonText mt='4' noOfLines={4} spacing='2' />
      </Flex>
    );
  } else {
    return (
      <Flex justifyContent='center' direction='column'>
        <ChakraLink href={adInfo.ogUrl}>
          <Box px={4} borderRadius='6px' border='1px' borderColor='gray.300'>
            <Stack isInline justify='space-between' align='center'>
              <Box minW='60%'>
                <Heading as='h6' size='md' mb={2}>
                  {adInfo.ogTitle}
                </Heading>
                <Text fontSize='sm'>{adInfo.ogDescription}</Text>
                <Text fontSize='sm' color='gray.500' mt='6px'>
                  {adInfo.ogUrl}
                </Text>
              </Box>
              <Box w='100%'>
                <Image
                  src={adInfo?.ogImage?.url}
                  borderRadius='8px'
                  boxSize='220px'
                  objectFit='contain'
                  fallbackSrc='https://via.placeholder.com/100'
                />
              </Box>
            </Stack>
          </Box>
        </ChakraLink>
        <Box px='1rem'>
          <ChakraLink
            fontWeight='bold'
            color='gray.500'
            href={adInfo.ogUrl}
            isExternal
          >
            {adInfo.ogTitle}
          </ChakraLink>
          <Text fontSize='sm'>{adInfo.ogDescription}</Text>
        </Box>
      </Flex>
    );
  }
};

export default AdSpot;
