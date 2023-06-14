import CheckBox from "@react-native-community/checkbox";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { MaterialIcons } from "@expo/vector-icons";
import { storage } from "../utils/storage";
import { Text } from "./text";
import { colors, fontsVariant } from "./theme";

type ListItem = {
  id: string;
  title: string;
  completed: boolean;
};

export function Main() {
  const [newItemList, setNewItemList] = React.useState<string>("");
  const [editingItem, setEditingItem] = React.useState<ListItem | undefined>();

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

  function updateListItemName(id: string, title: string) {
    setData((prevData) => {
      const item = prevData.find((item) => item.id === id);

      if (!item) {
        return prevData;
      }

      item.title = title;

      return prevData;
    });
  }

  const completedItemsCount = data.filter(({ completed }) => completed).length;
  const totalItemsCount = data.length;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <Text
          style={{
            color: "white",
            fontFamily: fontsVariant.body.fontFamily,
            fontSize: fontsVariant.body.fontSize,
          }}
        >
          Lista de compras
        </Text>

        <Text style={{ color: "white" }}>
          {completedItemsCount} / {totalItemsCount}
        </Text>
      </View>

      <FlashList
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 2,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: colors.gray,
              marginTop: 10,
              padding: 18,
              alignItems: "center",
              backgroundColor: item.completed ? colors.lightgreen : "white",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <CheckBox
              style={styles.checkbox}
              boxType="square"
              disabled={false}
              value={item.completed}
              onChange={() => {
                setData((prevData) =>
                  prevData.map((itemToToggle) => {
                    if (item.id === itemToToggle.id) {
                      return {
                        ...itemToToggle,
                        completed: !itemToToggle.completed,
                      };
                    }

                    return itemToToggle;
                  })
                );
              }}
            />

            <Text
              style={{
                flex: 1,
                color: colors.gray,
                textDecorationLine: item.completed ? "line-through" : "none",
              }}
            >
              {item.title}
            </Text>

            <View style={{ flexDirection: "row", gap: 4 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setEditingItem(item)}
              >
                <MaterialIcons name="edit" size={24} color={colors.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Alert.alert(
                    "Excluir item da lista",
                    "Você realmente deseja deletar esse item da lista?",
                    [
                      {
                        text: "Excluir",
                        style: "destructive",
                        onPress: () => removeListItemById(item.id),
                      },
                      {
                        text: "Cancelar",
                        style: "cancel",
                      },
                    ],
                    { cancelable: true }
                  );
                }}
              >
                <MaterialIcons name="highlight-remove" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        estimatedItemSize={62}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>A lista está vazia</Text>
        )}
      />

      <View style={styles.newItemInputContainer}>
        <TextInput
          style={styles.newItemInput}
          returnKeyType="send"
          placeholder="Novo item da lista"
          onChange={(e) => setNewItemList(e.nativeEvent.text)}
        />
        <MaterialIcons
          onPress={(e) =>
            addListItem({
              title: newItemList,
              completed: false,
              id: uuidv4(),
            })
          }
          style={styles.addItemButton}
          name="add"
          size={24}
          color={colors.primary}
        />
      </View>

      <Modal
        presentationStyle="formSheet"
        animationType="slide"
        visible={!!editingItem}
        onRequestClose={() => {
          setEditingItem(undefined);
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput defaultValue={editingItem?.title} />

          <Pressable onPress={() => setEditingItem(undefined)}>
            <Text>Close Editing</Text>
          </Pressable>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  checkbox: {
    height: 20,
  },
  emptyList: {
    textAlign: "center",
  },
  newItemInputContainer: {
    backgroundColor: colors.primary,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  newItemInput: {
    backgroundColor: "white",
    padding: 6,
    paddingVertical: 14,
    borderRadius: 4,
    width: "85%",
  },
  addItemButton: {
    padding: 6,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
