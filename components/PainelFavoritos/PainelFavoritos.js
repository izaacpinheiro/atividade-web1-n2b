import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function PainelFavoritos({ favoritos, onRemoveFavorito }) {
  if (favoritos.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Image
          source={{ uri: 'https://via.placeholder.com/200?text=Sem+Favoritos' }}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyText}>Nenhum atleta favoritado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <Text style={styles.panelTitle}>Atletas Favoritos</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{favoritos.length}</Text>
        </View>
      </View>

      <FlatList
        data={favoritos}
        numColumns={Math.floor(screenWidth / 220)}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.favoritosGrid}
        renderItem={({ item }) => (
          <View style={styles.favoritoCard}>
            <Image
              source={{
                uri: `https://cdn.nba.com/headshots/nba/latest/260x190/${item.id}.png`,
              }}
              style={styles.avatar}
              onError={(e) => {
                e.nativeEvent.target.setNativeProps({
                  src: [{ uri: 'https://via.placeholder.com/50x50?text=Img' }],
                });
              }}
            />
            <View style={styles.favoritoInfo}>
              <Text style={styles.name}>
                {item.firstname} {item.lastname}
              </Text>
              <Text style={styles.country}>ID: {item.id}</Text>
            </View>

            <TouchableOpacity 
              style={styles.removeBtn}
              onPress={() => onRemoveFavorito(item)}  
            >
              <Text style={styles.removeText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    marginTop: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 15,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a84ff',
  },
  badge: {
    backgroundColor: '#f57c00',
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  favoritosGrid: {
    gap: 12,
  },
  favoritoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    margin: 6,
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    borderLeftWidth: 4,
    borderLeftColor: '#f57c00',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    marginRight: 12,
  },
  favoritoInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  country: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyImage: {
    width: 200,
    height: 120,
    opacity: 0.6,
    marginBottom: 16,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
  },
  removeBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#d32f2f',
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  removeText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
  },
});
