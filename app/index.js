import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import BarraPesquisa from '../components/BarraPesquisa/BarraPesquisa';
import CardAtleta from '../components/CardAtleta/CardAtleta';
import PainelFavoritos from '../components/PainelFavoritos/PainelFavoritos';

export default function Home() {
  const [atletas, setAtletas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const { width } = useWindowDimensions();

  const numColumns = Math.floor(width / 180);

  const adicionarAosFavoritos = (atleta) => {
    if (!favoritos.find(f => f.id === atleta.id)) {
      setFavoritos([...favoritos, atleta]);
    } else {
      Alert.alert('Este atleta já está nos favoritos!');
    }
  };

  const removeFavorito = (atleta) => {
    setFavoritos(favoritos.filter(f => f.id !== atleta.id));
  };

  const limparPesquisa = () => {
    setAtletas([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BUSCA DE ATLETAS DA NBA 🏀</Text>

      <View style={styles.pesquisa}>
        <BarraPesquisa onSearch={setAtletas} />
        {atletas.length > 0 && (
          <View style={styles.limparContainer}>
            <TouchableOpacity style={styles.limparButton} onPress={limparPesquisa}>
              <Text style={styles.limparButtonText}>Limpar Pesquisa</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.subtitulo}>Resultados da Busca</Text>

      <FlatList
        data={atletas}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.cardsContainer}
        columnWrapperStyle={styles.rowLayout}
        renderItem={({ item }) => (
          <CardAtleta atleta={item} onFavoritar={adicionarAosFavoritos} />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhum atleta pesquisado.</Text>
        }
      />

      <PainelFavoritos favoritos={favoritos} onRemoveFavorito={removeFavorito} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
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
  cardsContainer: {
    paddingBottom: 20,
  },
  rowLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    flex: 1 / 3,
    marginHorizontal: 4,
  },
  listaVazia: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  pesquisaContainer: {
    marginBottom: 20,
  },
  limparContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  limparButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 150,
  },
  limparButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
