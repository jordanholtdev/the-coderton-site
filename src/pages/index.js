import {
  Link as ChakraLink,
  Text,
  Box,
  Heading,
  Flex,
  GridItem,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ViewIcon } from '@chakra-ui/icons';

import { WrapperContainer } from '../components/WrapperContainer';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import { Subscribe } from '../components/Subscribe';
import AdSpot from '../components/AdSpot';

const Index = ({ result }) => {
  return (
    <WrapperContainer>
      <Box height='16rem' width='100%'></Box>
      <Main>
        <GridItem colSpan={[4, 5, 3]} rowSpan={[1, 2]}>
          <Heading as='h1' size='4xl'>
            The Coderton
          </Heading>
          <Flex fontSize='2xl' my={[3, 4]}>
            We show you the best tools and resources for web development, coding
            and indie hacking.
          </Flex>
          <Text fontSize='16px' color='gray.500'>
            Create something awesome today! Discover a growing library of tools,
            listen to a podcast, and read the latest trends.
          </Text>
        </GridItem>
        <GridItem colStart={1} colEnd={[3, 2, 3]}>
          <Stack>
            <Link href='/tools' passHref>
              <ChakraLink
                aria-label='contact page'
                color='teal.400'
                fontSize='20px'
              >
                Discover the tools ➡
              </ChakraLink>
            </Link>
            <Link href='/podcasts' passHref>
              <ChakraLink
                aria-label='contact page'
                color='teal.400'
                fontSize='20px'
              >
                Listen to a Podcast ➡
              </ChakraLink>
            </Link>
            <Link href='/#newsletter' passHref>
              <ChakraLink
                aria-label='contact page'
                color='teal.400'
                fontSize='20px'
              >
                Read the latest ➡
              </ChakraLink>
            </Link>
          </Stack>
          <Box mt='4rem'>
            Found this useful?{' '}
            <ChakraLink
              href='https://www.buymeacoffee.com/jordanholtdev'
              color='purple.400'
              bgColor='yellow.100'
              padding={2}
              borderRadius='8px'
            >
              Support me here
            </ChakraLink>
          </Box>
        </GridItem>
        <GridItem colStart={[1, 2, 4]} colEnd={[3, 4, 6]} rowSpan={[2, 1]}>
          <Box p='1rem'>
            <Heading size='md'>
              <ViewIcon /> Weekly spotlight
            </Heading>
          </Box>
          <AdSpot adInfo={result} />
        </GridItem>
        <GridItem colSpan={3} id='newsletter'>
          <Heading as='h2' size='xl'>
            Read the latest
          </Heading>
          <Text fontSize='16px' color='gray.500' pt={4}>
            Get the latest resources, techniques and articles about web
            development in your inbox.
          </Text>
          <Subscribe />
        </GridItem>
      </Main>
      <DarkModeSwitch />
      <Footer />
    </WrapperContainer>
  );
};

export async function getStaticProps() {
  const ogs = require('open-graph-scraper');

  const options = {
    url: 'https://www.indiehackers.com/',
  };

  try {
    const data = await ogs(options);

    const { error, result, response } = data;
    return {
      props: { result },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: 'Something went wrong',
      },
    };
  }
}

export default Index;
