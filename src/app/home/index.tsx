import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => {
            return (
              <Filter
                key={status}
                status={status}
                isActive={status === FilterStatus.DONE}
              />
            );
          })}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {Array.from({ length: 100 }).map((_, index) => (
            <Item
              key={index}
              data={{ status: FilterStatus.DONE, description: "Café" }}
              onRemove={() => {}}
              onStatus={() => {}}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
