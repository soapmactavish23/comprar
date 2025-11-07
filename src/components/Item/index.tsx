import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";

import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type Props = {
  data: ItemData;
  onStatus: () => void,
  onRemove: () => void,
};

export function Item({ data, onRemove, onStatus }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <StatusIcon status={data.status}></StatusIcon>
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>
      <TouchableOpacity onPress={onStatus}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
}
