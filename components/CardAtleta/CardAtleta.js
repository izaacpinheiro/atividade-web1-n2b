import { useState } from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

export default function CardAtleta({ atleta, onFavoritar }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const [imageSource, setImageSource] = useState({
    uri: `https://cdn.nba.com/headshots/nba/latest/260x190/${atleta?.id || '000'}.png`,
  });

  const [isFavorited, setIsFavorited] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const safeAtleta = {
    firstname: atleta?.firstname || 'Desconhecido',
    lastname: atleta?.lastname || 'Desconhecido',
    id: atleta?.id || '000',
    leagues: {
      standard: {
        jersey: atleta?.leagues?.standard?.jersey || '00',
      },
    },
    birth: {
      country: atleta?.birth?.country || 'Não informado',
    },
    weight: {
      kilograms: atleta?.weight?.kilograms || '--',
    },
  };

  const toggleFavorito = () => {
    setIsFavorited(!isFavorited);
    onFavoritar(atleta);
  };

  return (
    <Animated.View 
      style={[
        styles.card, 
        { 
          transform: [{ scale: scaleAnim }],
          width: isLargeScreen ? '31%' : '100%',
          margin: isLargeScreen ? 5 : 10,
        }
      ]}>
      <Text style={styles.name}>
        {safeAtleta.firstname} {safeAtleta.lastname}
      </Text>

      <Image
        source={imageSource}
        style={styles.photo}
        onError={() =>
          setImageSource({
            uri: 'https://via.placeholder.com/260x190?text=Sem+Imagem',
          })
        }
      />

      <View style={styles.info}>
        <Text style={styles.infoText}>Camisa: {safeAtleta.leagues.standard.jersey}</Text>
        <Text style={styles.infoText}>Nacionalidade: {safeAtleta.birth.country}</Text>
        <Text style={styles.infoText}>Peso(kg): {safeAtleta.weight.kilograms}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.favoriteBtn,
          isFavorited && styles.favorited,
        ]}
        onPress={toggleFavorito}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.favoriteBtnText}>
          {isFavorited ? '★ Remover dos Favoritos' : '★ Adicionar aos Favoritos'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    maxWidth: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  photo: {
    width: '100%',
    height: 95,
    borderRadius: 5,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  info: {
    marginVertical: 10,
  },
  infoText: {
    marginVertical: 2,
    color: '#555',
    fontSize: 14,
  },
  favoriteBtn: {
    width: '100%',
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    alignItems: 'center',
  },
  favoriteBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  favorited: {
    backgroundColor: '#f44336',
  },
});
