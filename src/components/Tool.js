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
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';

import React from 'react';
import Image from 'next/image';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Tool = ({ tool }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.700' };
  const borderColor = { light: 'gray.400', dark: 'blue.100' };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();

  const imageUrl = tool.fields.logo[0]?.thumbnails?.large?.url;

  return (
    <>
      <ChakraLink href={tool.fields.url} as='button' onClick={onOpen}>
        <Flex justifyContent='center' direction='row'>
          <Box
            p={4}
            borderRadius='6px'
            border='1px'
            borderColor='gray.300'
            flex='1 1 auto'
          >
            <Stack isInline alignItems='center'>
              <Box maxW='50%' textAlign='left'>
                <Heading as='h6' size='md' mb={1}>
                  {tool.fields.name}
                </Heading>
                <Badge colorScheme='teal' my={1} variant='outline'>
                  {tool.fields.category}
                </Badge>
                <Text>{tool.fields.url}</Text>
              </Box>
              <Box maxW='100%' flex=' auto'>
                <Image
                  src={imageUrl}
                  borderRadius='full'
                  width='80px'
                  height='80px'
                  boxSize='100px'
                  objectFit='cover'
                />
              </Box>
            </Stack>
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
