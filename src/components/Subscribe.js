import { Field, Formik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  FormErrorMessage,
  Icon,
  useColorMode,
  useToast,
} from '@chakra-ui/react';

const validateEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export const Subscribe = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.50', dark: 'gray.800' };
  const borderColor = { light: 'gray.300', dark: 'blue.100' };
  const toast = useToast();

  return (
    <Box
      border='1px solid'
      borderColor={borderColor[colorMode]}
      bg={bgColor[colorMode]}
      borderRadius={4}
      padding={6}
      my={4}
      w='100%'
    >
      <Heading as='h4' fontSize='2xl'>
        Join the newsletter
      </Heading>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validateEmailSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const res = await fetch('api/subscribe', {
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });

          const { error } = await res.json();

          if (error) {
            setSubmitting(false);
            toast({
              title: 'An error occurred.',
              description: error,
              status: 'error',
              duration: 4000,
              isClosable: true,
            });
            return;
          }
          resetForm();
          toast({
            title: 'Success!.',
            description: 'Thank you! 🎉 You are now subscribed',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Field name='email'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel py={1} htmlFor='email' id='email' color='gray.500'>
                    Email:
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon name='email' color='gray.500' />
                    </InputLeftElement>
                    <Input
                      {...field}
                      focusBorderColor='teal.200'
                      type='email'
                      variant='outline'
                      id='email'
                      aria-label='your email'
                      placeholder='jane@acme.com'
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              variant='outline'
              type='submit'
              isLoading={formik.isSubmitting}
            >
              Subscribe
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
