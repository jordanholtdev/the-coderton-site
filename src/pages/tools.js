import {
  Flex,
  Box,
  SimpleGrid,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';
import Link from 'next/link';
import { WrapperContainer } from '../components/WrapperContainer';

import { DarkModeSwitch } from '../components/DarkModeSwitch';
import Tool from '../components/Tool';
import { table, minifyRecords } from './api/utils/Airtable';
import { Footer } from '../components/Footer';

const Tools = ({ initialTools }) => {
  return (
    <WrapperContainer>
      <Box maxW='200px' p={4}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/'>Home</Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>tools</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box mt='6rem' maxWidth='40rem'>
        <Heading as='h1' size='4xl' mb={4}>
          Discover the tools
        </Heading>
        <Box textAlign='left'>
          <Text>
            Everything you need to create an incredible project. This is a
            curated list of tools for devs. Missing something? Let us know and
            we'll add it the list.
          </Text>
        </Box>
      </Box>
      <SimpleGrid
        maxWidth='80rem'
        mt='6rem'
        overflow='hidden'
        columns={{ sm: 1, md: null, lg: 2 }}
        spacing='10px'
      >
        {initialTools.map((tool) => (
          <Tool key={tool.id} tool={tool} />
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
    const tools = await table.select({}).firstPage();

    return { props: { initialTools: minifyRecords(tools) } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'Something went wrong',
      },
    };
  }
}

export default Tools;
