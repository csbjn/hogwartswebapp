
const API_URL = 'http://localhost:5000/potions';

export const PotionService = {
  searchPotions: async (params: any, authToken: string) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_URL}?${queryString}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Hálózati kérésre érkező válasz nem volt megfelelő.');
      }
      return await response.json();
    } catch (error) {
      console.error('Hiba a bájitalok lekérése közben::', error);
      return null;
    }
  }
};
