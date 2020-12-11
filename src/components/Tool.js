import {
  Badge,
  Box,
  Button,
  Text,
  Link as ChakraLink,
  Stack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  useColorMode,
  HStack,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';

import React from 'react';
import Image from 'next/image';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Tool = ({ tool }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.700' };
  const imageBg = { light: '#f7fafc', dark: 'white' };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();

  const imageUrl = tool.fields.logo[0]?.thumbnails?.large?.url;

  return (
    <>
      <ChakraLink href={tool.fields.url} as='button' onClick={onOpen}>
        <Flex justify='space-evenly' alignContent='center' w='100%'>
          <Box
            p={4}
            border='1px'
            borderColor='gray.300'
            flex='1 1 auto'
            _hover={{ borderColor: 'teal.400' }}
          >
            <HStack alignItems='center' justifyContent='start' spacing={8}>
              <Box textAlign='left' flex='250px 1 1'>
                <Badge colorScheme='teal' variant='outline'>
                  {tool.fields.category}
                </Badge>
              </Box>
              <Box
                d='flex'
                alignItems='center'
                maxW='100%'
                justifyContent='start'
                flex='auto'
                bg={imageBg[colorMode]}
              >
                <Image
                  src={imageUrl}
                  width='100px'
                  height='100px'
                  objectFit='contain'
                />
              </Box>
              <Box textAlign='left' flex='400px 1 1' d='flex'>
                <Heading as='h6' size='md'>
                  {tool.fields.name}
                </Heading>
              </Box>
              <Box flex='300px 1 1'>
                <Text textAlign='left'>Learn more ➡</Text>
              </Box>
            </HStack>
          </Box>
        </Flex>
      </ChakraLink>

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tool.fields.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={bgColor[colorMode]}>
            <Stack direction='column'>
              <Box d='flex'>
                <Box
                  fontSize='xs'
                  color='gray.500'
                  fontWeight='bold'
                  minW='120px'
                  flex='0 0 auto'
                >
                  Category:{' '}
                </Box>
                <Box
                  d='flex'
                  alignItems='center'
                  marginLeft={4}
                  flex='1 1 auto'
                  maxWidth='0px'
                >
                  <Badge variant='subtle' colorScheme='green'>
                    {tool.fields.category}
                  </Badge>
                </Box>
              </Box>
              <Box d='flex'>
                <Box
                  fontSize='xs'
                  color='gray.500'
                  fontWeight='bold'
                  minW='120px'
                  flex='0 0 auto'
                >
                  Tags:{' '}
                </Box>
                <Box
                  d='flex'
                  alignItems='center'
                  marginLeft={4}
                  flex='1 1 auto'
                  maxWidth='0px'
                >
                  {tool.fields.tags.map((tag) => {
                    return (
                      <Badge
                        key={tag}
                        variant='outline'
                        colorScheme='teal'
                        mr={2}
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                </Box>
              </Box>
              <Box d='flex'>
                <Box
                  fontSize='xs'
                  color='gray.500'
                  fontWeight='bold'
                  minW='120px'
                  flex='0 0 auto'
                >
                  <Text
                    as='span'
                    color='gray.500'
                    fontWeight='bold'
                    fontSize='xs'
                  >
                    <LinkIcon /> Site:{' '}
                  </Text>
                </Box>
                <Box
                  d='flex'
                  alignItems='center'
                  marginLeft={4}
                  flex='1 1 auto'
                  // maxWidth='0px'
                >
                  <ChakraLink href={tool.fields.url} fontSize='md'>
                    {tool.fields.url} <ExternalLinkIcon mx='2px' />
                  </ChakraLink>
                </Box>
              </Box>
              <Box d='flex'>
                <Box
                  fontSize='xs'
                  color='gray.500'
                  fontWeight='bold'
                  minW='120px'
                  flex='0 0 auto'
                >
                  <Text
                    as='span'
                    color='gray.500'
                    fontWeight='bold'
                    fontSize='xs'
                  >
                    <LinkIcon /> Twitter:{' '}
                  </Text>
                </Box>
                <Box
                  d='flex'
                  alignItems='center'
                  marginLeft={4}
                  flex='1 1 auto'
                  // maxWidth='0px'
                >
                  <ChakraLink href={tool.fields.twitter} fontSize='md'>
                    {tool.fields.twitter} <ExternalLinkIcon mx='2px' />
                  </ChakraLink>
                </Box>
              </Box>
            </Stack>
            <Box my={4}>
              <Text color='gray.500' fontWeight='bold' fontSize='sm'>
                Description:
              </Text>
              <Text>{tool.fields.description}</Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant='outline'
              as='a'
              colorScheme='green'
              href={tool.fields.url}
            >
              Visit {tool.fields.name}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Tool;
