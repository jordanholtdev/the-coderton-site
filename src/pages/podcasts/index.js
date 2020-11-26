import {
  Flex,
  Box,
  Link as ChakraLink,
  Stack,
  SimpleGrid,
  Heading,
  Text,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';
import Link from 'next/link';
import { WrapperContainer } from '../../components/WrapperContainer';
import { podcastTable, minifyRecords } from './../api/utils/Airtable';
import { Footer } from '../../components/Footer';
import { DarkModeSwitch } from '../../components/DarkModeSwitch';

const PodcastCard = ({ id, fields, slug }) => (
  <Link href='/podcasts/[slug]' as={`/podcasts/${slug}`} passHref>
    <ChakraLink
      aria-label='contact page'
      fontSize='20px'
      _hover={{ opacity: 0.7 }}
    >
      <Flex justifyContent='center' direction='column'>
        <Box
          px={4}
          borderRadius='6px'
          border='1px'
          borderColor='gray.300'
          _hover={{ borderColor: 'teal.400' }}
        >
          <Stack isInline justify='space-between' align='center'>
            <Box minW='60%'>
              <Heading as='h6' size='md' mb={2}>
                {fields.name}
              </Heading>
              <Text fontSize='sm'>{fields.description}</Text>
              <Text fontSize='sm' color='gray.500' mt='6px'>
                Listen ➡
              </Text>
            </Box>
            <Box w='100%'>
              <Image
                src={fields.image[0]?.thumbnails?.large?.url}
                borderRadius='8px'
                boxSize='220px'
                objectFit='contain'
                fallbackSrc='https://via.placeholder.com/100'
              />
            </Box>
          </Stack>
        </Box>
      </Flex>
    </ChakraLink>
  </Link>
);

const Podcasts = ({ initialPodcasts = [] }) => {
  return (
    <WrapperContainer>
      <Box maxW='200px' p={4}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/'>Home</Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>podcasts</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box mt='6rem' maxWidth='60rem'>
        <Heading as='h1' size='4xl' mb={4}>
          Discover the podcasts
        </Heading>

        <Text textAlign='center'>
          Missing something? Do you think your tool should be included on this
          list? Let us know!
        </Text>
      </Box>
      <SimpleGrid
        maxWidth='80rem'
        mt='6rem'
        overflow='hidden'
        columns={{ sm: 1, md: null, lg: 3 }}
        spacing='10px'
      >
        {initialPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} {...podcast} />
        ))}
      </SimpleGrid>
      <DarkModeSwitch />
      <Footer />
    </WrapperContainer>
  );
};

export async function getStaticProps() {
  try {
    // Fetch data from external API
    const podcasts = await podcastTable.select({}).firstPage();

    return { props: { initialPodcasts: minifyRecords(podcasts) } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'Something went wrong',
      },
    };
  }
}

export default Podcasts;
