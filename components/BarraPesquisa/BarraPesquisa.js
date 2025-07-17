import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { buscarAtletas } from '../api'; // ajuste o caminho se necessário

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Digite um nome para buscar.');
      return;
    }

    setError('');
    try {
      const players = await buscarAtletas(searchTerm);
      onSearch(players);
    } catch (e) {
      setError('Erro ao buscar atletas.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Buscar atleta..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>
      {error !== '' && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 32,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 16,
    marginRight: 10,
  },
  errorMessage: {
    color: '#f44336',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SearchBar;
