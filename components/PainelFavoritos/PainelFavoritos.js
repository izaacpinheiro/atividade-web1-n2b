import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardAtleta from '../CardAtleta/CardAtleta';

const PainelFavoritos = ({ favoritos, onRemoveFavorito }) => {
  if (favoritos.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Favoritos ⭐</Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <CardAtleta atleta={item} />
            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => onRemoveFavorito(item)}
            >
              <Text style={styles.textoBotao}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  lista: {
    paddingHorizontal: 8,
  },
  card: {
    marginRight: 16,
    alignItems: 'center',
  },
  botaoRemover: {
    marginTop: 8,
    backgroundColor: '#e53935',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default PainelFavoritos;
