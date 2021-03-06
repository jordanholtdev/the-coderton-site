import { Flex, useColorMode } from '@chakra-ui/react';

export const WrapperContainer = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: 'gray.50', dark: 'gray.900' };

  const color = { light: 'black', dark: 'white' };
  return (
    <Flex
      direction='column'
      alignItems='center'
      pb={8}
      justifyContent='flex-start'
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
