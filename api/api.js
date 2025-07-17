// passar o arquivo api.js do projeto antigo para aqui
import axios from 'axios';

const CHAVE_API = 'c0638c53fbmsh2868ca454b8bb8ap157f12jsn6ac238ea433c';
const HOST_API = 'api-nba-v1.p.rapidapi.com';

export const buscarAtletas = async (busca) => {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players',
    params: {
      search: busca,
    },
    headers: {
      'x-rapidapi-key': CHAVE_API,
      'x-rapidapi-host': HOST_API,
    },
  };

  try {
    const response = await axios.request(options);
    console.log('Atletas encontrados:', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error('Erro ao buscar atleta:', error);
    return [];
  }
};
