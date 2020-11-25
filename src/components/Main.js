import { Grid } from '@chakra-ui/react';

export const Main = (props) => (
  <Grid
    templateRows='repeat(2, 1fr)'
    templateColumns={{
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(5, 1fr)',
    }}
    gap={4}
    maxWidth='90rem'
    pt='1rem'
    px='1rem'
    {...props}
  />
);
