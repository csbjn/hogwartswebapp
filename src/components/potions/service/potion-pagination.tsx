import { FC } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';



interface PotionPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PotionPagination: FC<PotionPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button 
          key={i}
          onClick={() => handlePageChange(i)}
          isDisabled={i === currentPage}
          colorScheme="yellow"
          rounded="50px"
          mb={4}
          mt={4}
          textColor="orange.900"
          variant="solid">
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
      <Button 
      onClick={() => handlePageChange(currentPage - 1)} 
      isDisabled={currentPage === 1}  
      rounded="50px" 
      mb={4}
      mt={4}
      textColor="orange.900"
      colorScheme="yellow"
      variant="solid">
        <ArrowBackIcon/>
      </Button>
      {renderPageNumbers()}
      <Button 
      onClick={() => handlePageChange(currentPage + 1)} 
      isDisabled={currentPage === totalPages}  
      rounded="50px" 
      mb={4}
      mt={4}
      textColor="orange.900"
      colorScheme="yellow"
      variant="solid">
      <ArrowForwardIcon/>
      </Button>
    </Stack>
  );
};

