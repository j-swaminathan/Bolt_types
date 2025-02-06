import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Checkbox,
  Text,
  Box,
} from '@chakra-ui/react';

// Mock data for prompt types
const defaultPromptTypes = [
  { id: 1, name: 'Code Generation', description: 'Generate code snippets and boilerplate' },
  { id: 2, name: 'Text Analysis', description: 'Analyze and process text content' },
  { id: 3, name: 'Data Visualization', description: 'Create charts and visual representations' },
  { id: 4, name: 'Language Translation', description: 'Translate between different languages' },
  { id: 5, name: 'Document Summary', description: 'Summarize long documents' },
  { id: 6, name: 'Content Creation', description: 'Generate creative content and articles' },
];

interface PromptTypesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  companyEmail: string;
  initialSelectedTypes?: number[];
}

export function PromptTypesDialog({
  isOpen,
  onClose,
  companyEmail,
  initialSelectedTypes = [1, 2]
}: PromptTypesDialogProps) {
  const [selectedTypes, setSelectedTypes] = useState<number[]>(initialSelectedTypes);

  const handleToggleType = (typeId: number) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSave = async () => {
    // Here you would typically make an API call to update the company's prompt types
    console.log('Saving prompt types for company:', companyEmail, selectedTypes);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Prompt Types</ModalHeader>
        
        <ModalBody>
          <Text color="gray.600" mb={4}>
            Select the prompt types that this company can access:
          </Text>
          
          <VStack spacing={4} align="stretch">
            {defaultPromptTypes.map((type) => (
              <Box key={type.id} pb={3} borderBottom="1px" borderColor="gray.100" _last={{ borderBottom: 'none' }}>
                <Checkbox
                  isChecked={selectedTypes.includes(type.id)}
                  onChange={() => handleToggleType(type.id)}
                >
                  <Box>
                    <Text fontWeight="medium">{type.name}</Text>
                    <Text fontSize="sm" color="gray.600">{type.description}</Text>
                  </Box>
                </Checkbox>
              </Box>
            ))}
          </VStack>
        </ModalBody>

        <ModalFooter bg="gray.50" roundedBottom="md">
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}