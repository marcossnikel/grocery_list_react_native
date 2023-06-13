import { FlashList } from "@shopify/flash-list";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../utils/storage";
import { Text } from "./text";

type ListItem = {
  id: string;
  title: string;
  completed: boolean;
};

export function Main() {
  const [data, setData] = React.useState<ListItem[]>(() => {
    const savedData = storage.getString("groceryList");

    if (savedData) {
      return JSON.parse(savedData);
    }

    return [];
  });

  React.useEffect(() => {
    storage.set("groceryList", JSON.stringify(data));
  }, [data]);

  const addListItem = React.useCallback((newItem: ListItem) => {
    setData((prevData) => [...prevData, newItem]);
  }, []);

  function removeListItemById(id: string) {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
              <Text>
                {item.title} - {item.completed && "Completo"}
                {item.id}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeListItemById(item.id)}>
              <Text> Remove Item</Text>
            </TouchableOpacity>
          </View>
        )}
        estimatedItemSize={200}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>A lista está vazia</Text>
        )}
      />

      <TextInput
        onSubmitEditing={(e) =>
          addListItem({
            title: e.nativeEvent.text,
            completed: false,
            id: uuidv4(),
          })
        }
        returnKeyType="send"
        placeholder="Novo item"
      />
    </KeyboardAvoidingView>
  );
}
