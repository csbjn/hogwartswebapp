import React, { FC } from 'react';
import { Box, Text, Image, Stack } from '@chakra-ui/react';
import { Spell } from '../model/spell';

interface SpellListProps {
  spells: Spell[];
}

export const SpellList: FC<SpellListProps> = ({ spells }) => {
  return (
    <Stack spacing={4}>
      {spells.map(spell => (
        <Box key={spell.spellId} borderWidth="2px" borderRadius="lg" overflow="hidden" p={4} borderColor="yellow" background="black" >
          <Stack direction="row" spacing={4}>
            {spell.image && (
              <Image boxSize="100px" src={spell.image} alt={spell.name} />
            )}
            <Box>
              <Text fontWeight="bold" fontSize="xl" textColor="yellow.300">
                {spell.name}
              </Text>
              <Text textColor="yellow.300" mt={2}>{spell.effect}</Text>
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};