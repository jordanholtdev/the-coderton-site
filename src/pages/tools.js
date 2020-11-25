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
        <Heading as='h1' size='4xl'>
          Discover the tools
        </Heading>
        <Text>
          Everything you need to create a unique project. This curated list only
          includes tools that have been tested by the team at the The Coderton.
        </Text>
        <Text>
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
        {initialTools.map((tool) => (
          <Tool key={tool.id} tool={tool} />
        ))}
      </SimpleGrid>
      <DarkModeSwitch />
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
