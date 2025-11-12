import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useState, useEffect } from "react";
import { itemsStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<any>([]);

  function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar");
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    setItems((prevState: any) => [...prevState, newItem]);
  }

  async function getItems() {
    try {
      const response = await itemsStorage.get();
      setItems(response);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={description}
          onChangeText={setDescription}
        />
        <Text>{description}</Text>
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => {
            return (
              <Filter
                key={status}
                status={status}
                isActive={status === filter}
                onPress={() => setFilter(status)}
              />
            );
          })}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              key={item.id}
              data={{ status: item.status, description: item.description }}
              onRemove={() => {}}
              onStatus={() => {}}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}
