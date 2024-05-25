import { FC } from "react";
import { Potion } from "../model/potion";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

interface PotionListProps {
    potions: Potion[];
  }
  
  export const PotionList: FC<PotionListProps> = ({ potions }) => {
    return (
      <Stack spacing={4}>
        {potions.map(potion => (
          <Box key={potion.potionId} borderWidth="2px" borderRadius="lg" overflow="hidden" p={4} borderColor="yellow" background="purple.900" >
            <Stack direction="row" spacing={4}>
              { potion.image && (
                <Image boxSize="100px" src={potion.image} alt={potion.name} />
              )}
              <Box>
                <Text fontWeight="bold" fontSize="xl" textColor="yellow.300">
                  {potion.name}
                </Text>
                <Text textColor="yellow.300" mt={2}>{potion.effect}</Text>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  };