import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import BarraPesquisa from '../components/BarraPesquisa/BarraPesquisa';
import CardAtleta from '../components/CardAtleta/CardAtleta';
import PainelFavoritos from '../components/PainelFavoritos/PainelFavoritos';

export default function Home() {
  const [atletas, setAtletas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const adicionarAosFavoritos = (atleta) => {
    if (!favoritos.find(f => f.id === atleta.id)) {
      setFavoritos([...favoritos, atleta]);
    } else {
      Alert.alert('Já está nos favoritos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Busca de Atletas da NBA</Text>

      <View style={styles.pesquisa}>
        <BarraPesquisa onSearch={setAtletas} />
      </View>

      <Text style={styles.subtitulo}>Resultados da Busca</Text>

      <FlatList
        data={atletas}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.cardsGrid}
        renderItem={({ item }) => (
          <CardAtleta atleta={item} onFavoritar={adicionarAosFavoritos} />
        )}
      />

      <PainelFavoritos favoritos={favoritos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  pesquisa: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardsGrid: {
    gap: 12,
  },
});
