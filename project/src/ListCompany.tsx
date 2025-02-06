import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Tag,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { Settings2 } from 'lucide-react';
import { PromptTypesDialog } from './components/ui/prompt-types-dialog';

interface CompanyData {
  company_name: string;
  email: string;
  status: string;
  maxminutes: number;
  total_time_used: number;
  created_at: string;
}

export default function ListCompany() {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyEmail, setSelectedCompanyEmail] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Mock data fetch
    const fetchCompanies = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompanies([
        {
          company_name: 'Tech Corp',
          email: 'tech@example.com',
          status: 'active',
          maxminutes: 1000,
          total_time_used: 450,
          created_at: new Date().toISOString(),
        },
        {
          company_name: 'AI Solutions',
          email: 'ai@example.com',
          status: 'active',
          maxminutes: 2000,
          total_time_used: 890,
          created_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    };
    fetchCompanies();
  }, []);

  const handleStatusToggle = (email: string) => {
    setCompanies(prev =>
      prev.map(company =>
        company.email === email
          ? { ...company, status: company.status === 'active' ? 'deactive' : 'active' }
          : company
      )
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="60vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb={6}>Companies</Heading>

      <Box overflowX="auto" bg="white" rounded="lg" shadow="sm">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Company Name</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Max Minutes</Th>
              <Th>Time Used</Th>
              <Th>Created At</Th>
              <Th>Prompt Types</Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies.map((company) => (
              <Tr key={company.email}>
                <Td>{company.company_name}</Td>
                <Td>{company.email}</Td>
                <Td>
                  <Tag
                    size="md"
                    variant="subtle"
                    colorScheme={company.status === 'active' ? 'green' : 'red'}
                    cursor="pointer"
                    onClick={() => handleStatusToggle(company.email)}
                  >
                    {company.status}
                  </Tag>
                </Td>
                <Td>{company.maxminutes}</Td>
                <Td>{company.total_time_used}</Td>
                <Td>{new Date(company.created_at).toLocaleDateString()}</Td>
                <Td>
                  <Tooltip label="Manage Prompt Types">
                    <IconButton
                      aria-label="Manage prompt types"
                      icon={<Settings2 size={16} />}
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedCompanyEmail(company.email);
                        onOpen();
                      }}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {selectedCompanyEmail && (
        <PromptTypesDialog
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedCompanyEmail(null);
          }}
          companyEmail={selectedCompanyEmail}
        />
      )}
    </Box>
  );
}