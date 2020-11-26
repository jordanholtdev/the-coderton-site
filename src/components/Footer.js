import { Flex, Text } from '@chakra-ui/react';

export const Footer = (props) => (
  <Flex as='footer' py='6rem' {...props}>
    <Text fontSize='12px' color='gray.500'>
      © 2020 The Coderton | Made with Next.js and 💖 by Jordan Holt
    </Text>{' '}
    <Text></Text>
  </Flex>
);
