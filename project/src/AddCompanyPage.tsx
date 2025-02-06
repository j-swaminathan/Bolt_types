import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Grid,
  Heading,
  Input,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';

// Mock data for prompt types
const defaultPromptTypes = [
  { id: 1, name: 'Code Generation' },
  { id: 2, name: 'Text Analysis' },
  { id: 3, name: 'Data Visualization' },
  { id: 4, name: 'Language Translation' },
  { id: 5, name: 'Document Summary' },
  { id: 6, name: 'Content Creation' },
];

export default function AddCompanyPage() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [noOfminutes, setnoOfminutes] = useState<number | string>('');
  const [selectedPromptTypes, setSelectedPromptTypes] = useState<string[]>(['1', '2']);

  const [emailError, setEmailError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [maxHourerror, setMaxHourerror] = useState('');
  const [isCheckingEmail, setCheckingEmail] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      setCompanyNameError('Company name must be at least 3 characters');
    } else {
      setCompanyNameError('');
    }
  };

  const checkEmailAvailability = async () => {
    if (!email || !isValidEmail(email)) return false;

    setCheckingEmail(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailError('');
      return true;
    } catch (error) {
      console.error('Error checking email:', error);
      setEmailError('Error checking email availability');
      return false;
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleSubmit = async () => {
    let isValid = true;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }
    if (noOfminutes === '') {
      setMaxHourerror('Enter valid number');
      return;
    }

    const isEmailAvailable = await checkEmailAvailability();
    if (!isEmailAvailable) isValid = false;

    if (!isValid) return;

    setSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail('');
      setCompanyName('');
      setnoOfminutes('');
      setMaxHourerror('');
      setSelectedPromptTypes(['1', '2']);
      alert('Company successfully added');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" bg="white">
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Add Company</Heading>

        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!emailError}>
            <FormLabel>
              Email <Text as="span" color="red.500">*</Text>
            </FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={checkEmailAvailability}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
            {isCheckingEmail && <Spinner size="sm" mt={2} />}
          </FormControl>

          <FormControl isInvalid={!!companyNameError}>
            <FormLabel>Company Name</FormLabel>
            <Input
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                validateUsername(e.target.value);
              }}
            />
            <FormErrorMessage>{companyNameError}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!maxHourerror}>
            <FormLabel>Max Number of minutes</FormLabel>
            <Input
              type="number"
              placeholder="Max Number of minutes"
              value={noOfminutes}
              onChange={(e) => setnoOfminutes(e.target.value)}
            />
            <FormErrorMessage>{maxHourerror}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Prompt Types</FormLabel>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {defaultPromptTypes.map((type) => (
                <Checkbox
                  key={type.id}
                  isChecked={selectedPromptTypes.includes(type.id.toString())}
                  onChange={(e) => {
                    setSelectedPromptTypes(prev =>
                      e.target.checked
                        ? [...prev, type.id.toString()]
                        : prev.filter(id => id !== type.id.toString())
                    );
                  }}
                >
                  {type.name}
                </Checkbox>
              ))}
            </Grid>
          </FormControl>
        </VStack>

        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Adding..."
          width="full"
        >
          Add Company
        </Button>
      </VStack>
    </Box>
  );
}