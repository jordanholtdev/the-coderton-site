import {
  Divider,
  Flex,
  Box,
  Text,
  Heading,
  Badge,
  Link as ChakraLink,
  HStack,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { WrapperContainer } from '../../components/WrapperContainer';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '../../components/Footer';

const FeedCard = ({ title, link, pubDate, enclosure, content }) => {
  if (enclosure === undefined) {
    return (
      <Box>
        <ChakraLink href={link} isExternal>
          <Heading as='text' size='md'>
            {title}
          </Heading>
          <Box>{pubDate}</Box>
        </ChakraLink>
      </Box>
    );
  }
  return (
    <Box border='1px' rounded='8px' padding={4} mt={2}>
      <ChakraLink href={link} isExternal>
        <Heading as='text' size='md'>
          {title}
        </Heading>
        <Box>{pubDate}</Box>
      </ChakraLink>
      <Box w='100%'>
        <audio
          controls={true}
          preload='none'
          src={enclosure.url}
          style={{ width: '100%', borderRadius: '4px' }}
        />
      </Box>
    </Box>
  );
};

const PodcastPage = ({ podcast, feed }) => {
  return (
    <WrapperContainer>
      <Box maxW='400px' p={4}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href='/podcasts'>podcasts</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>{podcast.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Flex direction='column' alignItems='center' mt='3rem'>
        <HStack spacing={10} mb={10}>
          <Heading as='h1' size='4xl'>
            {podcast.name}
          </Heading>
          <Box>
            <Image width='300px' height='300px' src={podcast.image} />
          </Box>
        </HStack>
        <Stack maxW='60rem'>
          <Box my={4}>
            <Badge colorScheme='teal' variant='outline'>
              {podcast.category}
            </Badge>
            {podcast.tags.map((tag) => (
              <Badge colorScheme='teal' variant='subtle' key={tag} mx={1}>
                {tag}
              </Badge>
            ))}
          </Box>
          <Box textAlign='left' my={4}>
            {feed.description || '🤷‍♂️ No description available...'}
          </Box>
          <HStack>
            <ChakraLink fontSize='15px' href={podcast.url} isExternal>
              Visit {podcast.name} <ExternalLinkIcon />
            </ChakraLink>
            <ChakraLink fontSize='15px' href={podcast.rss} isExternal>
              RSS <ExternalLinkIcon />
            </ChakraLink>
          </HStack>
          <Divider />
          <Box pt={6}>
            <Text mb={4}>The Coderton says:</Text>
            <Text>📝 {podcast.description}</Text>
          </Box>
        </Stack>
        <Box maxW='60rem' mt={10}>
          {feed.items.map((item) => (
            <FeedCard key={item.guid} {...item} />
          ))}
        </Box>
      </Flex>
      <Footer />
    </WrapperContainer>
  );
};

export async function getStaticPaths() {
  const { podcastTable, minifyPodcasts } = require('./../api/utils/Airtable');
  try {
    // Fetch data from external API
    const { map } = require('lodash');
    const podcasts = await podcastTable.select({}).firstPage();
    const initialPodcasts = minifyPodcasts(podcasts);
    const slugs = map(initialPodcasts, 'slug');
    const paths = slugs.map((slug) => {
      return { params: { slug } };
    });

    return { paths, fallback: false };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'Something went wrong',
      },
    };
  }
}

export async function getStaticProps({ params }) {
  const { podcastTable, minifyPodcasts } = require('./../api/utils/Airtable');

  const { slug } = params;

  try {
    // Fetch data from external API
    const { find } = require('lodash');
    let Parser = require('rss-parser');
    let parser = new Parser();

    const initialPodcasts = await podcastTable.select({}).firstPage();
    const podcasts = minifyPodcasts(initialPodcasts);
    const podcast = find(podcasts, { slug });

    let feed = await parser.parseURL(podcast['rss']);

    return { props: { podcast, feed } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'Something went wrong',
      },
    };
  }
}

export default PodcastPage;
