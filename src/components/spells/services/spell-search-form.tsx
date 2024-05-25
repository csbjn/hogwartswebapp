import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Select, Stack, Text, useToast } from '@chakra-ui/react';
import { SpellService } from './spell-service';
import { SpellSearchOrder } from '../model/spell-search-order';
import { SpellCategory } from '../model/spell-category';
import { useNavigate } from 'react-router-dom';
import { SpellList } from './spell-list';
import { Spell } from '../model/spell';
import queryString from 'query-string';
import { Pagination } from './spell-pagination'; 

interface SearchParams {
  orderBy?: SpellSearchOrder;
  category?: SpellCategory;
  query?: string;
  limit: number;
  offset: number;
  page: number;
}

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    orderBy: SpellSearchOrder.NAME_ASC,
    offset: 0,
    limit: 20,
    page: 1,
  });
  const [spells, setSpells] = useState<Spell[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');


  useEffect(() => {
    if (!authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    
    setSearchParams(beforeParams => {
      if (name === "category" && value === "All") {
        const { category, ...leftParams } = beforeParams;
        return leftParams;
      } else {
        return { ...beforeParams, [name]: value };
      }
    });
  };


 const handleSearch = async (resetOffAndPage = true) => {
  const params = resetOffAndPage
    ? { ...searchParams, offset: 0, page: 1 }
    : searchParams;

    if (params.offset < 0) {
      toast({
        title: 'Hibás offset érték!',
        description: 'Az offset nem lehet kisebb nullánál.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (params.limit < 1 || params.limit > 100) {
      toast({
        title: 'Túl lépted a limitet!',
        description: 'A megjelenített varázslatszám, minimum 1 és maximum 100 lehet.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (params.offset % params.limit !== 0) {
      toast({
        title: 'Hibás offset érték!',
        description: 'Az offset értéknek oszthatónak kell lennie a limit értékével.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }


  try {
    const searchResults = await SpellService.searchSpells(params, authToken!!);
    setSpells(searchResults.results);
    setTotalPages(Math.ceil(searchResults.total / params.limit));
    updateUrlParams(params);
    if (resetOffAndPage) {
      setSearchParams(params); 
    }
  } catch (error) {
    console.error('Hiba a varázslatok betöltése közben:', error);
  }
};


const updateUrlParams = (params: SearchParams) => {
  const { page, ...leftParams } = params;
  const queryString = Object.entries(leftParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
  const url = `${window.location.pathname}?${queryString}`;
  //const url = vagy így `${window.location.pathname}?${queryString}&page=${page}`;
  window.history.replaceState(null, '', url);
};


useEffect(() => {
  if (authToken) {
    const urlParams = queryString.parse(window.location.search) as unknown as SearchParams;
    const bothParams = { ...searchParams, ...urlParams };
    setSearchParams(bothParams);
    handleSearch(false); 
  }
}, [authToken]);


useEffect(() => {
  if (authToken) {
    handleSearch(false); 
  }
}, [searchParams.offset, authToken]);


const handlePageChange = (page: number) => {
  setSearchParams(beforeParams => ({
    ...beforeParams,
    page,
    offset: (page - 1) * beforeParams.limit,
  }));
};


if (!authToken) {
  return <Text>Bejelentkezés szükséges a kereséshez.</Text>;
}
return (
  <Container>
    <Box mt={8}>
    <Box  background="yellow.500" padding={2} rounded="30px" textAlign="center" mb={4}> 
    <Heading fontSize="xl" color="orange.900">
      <Text as="span" fontWeight="black">Varázslatok</Text>
    </Heading>
    </Box>
      <Stack spacing={15} direction="row" justifyContent="center" alignItems="center">
      <FormControl>
          <FormLabel htmlFor="query">Keresőkifejezés:</FormLabel>
          <Input
            type="text"
            name="query"
            onChange={handleChange}
            value={searchParams.query || ''}
            textColor='black'
            backgroundColor='purple.100'
          />
        </FormControl>  
        <FormControl>
          <FormLabel htmlFor="orderBy">Rendezés:</FormLabel>
          <Select
            name="orderBy"
            onChange={handleChange}
            value={searchParams.orderBy || ''}
            color='black'
            background='purple.100'
          >
              {Object.values(SpellSearchOrder).map(searchOrder => (
                    <option key={searchOrder} value={searchOrder}>{searchOrder}</option>
                ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="category">Kategória:</FormLabel>
          <Select
            name="category"
            onChange={handleChange}
            value={searchParams.category || ''}
            color='black'
            background='purple.100'
          >
            <option value={"All"}>All</option>
            {Object.values(SpellCategory).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="limit">Varázslatszám:</FormLabel>
          <Select
            name="limit"
            onChange={handleChange}
            value={searchParams.limit}
            color='black'
            background='purple.100'
          >
            {[10, 20, 40, 60, 80, 100].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack spacing={10} direction="row" justifyContent="center" alignItems="center">
        <Button mt={4} colorScheme="yellow" textColor="orange.900" variant="solid" onClick={() => handleSearch(true)}>
          Keresés
        </Button>
      </Stack>
    </Box>
    {spells.length > 0 ? (
      <Box mt={8}>
        <SpellList spells={spells} />
        <Pagination
          currentPage={searchParams.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    ) : (
      <Box mt={8}>
        <Text>A keresett feltételre nincs egy találat sem a varázsigék között.</Text>
      </Box>
    )}
  </Container>
);
};