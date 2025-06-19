import { Feather } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

type Props = {
  visible: boolean;
  topics: string[];
  selected: string | null;
  onSelect: (tag: string | null) => void;
  onClose: () => void;
};

export default function TopicSelectorModal({
  visible,
  topics,
  selected,
  onSelect,
  onClose
}: Props) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>Выбор темы</Text>
          <Pressable onPress={() => onClose()} style={styles.button}>
            <Feather name="x" size={24} color="#9AA5B5" />
          </Pressable>
        </View>

        <ScrollView style={styles.scroll}>
          <Pressable
            onPress={() => onSelect(null)}
            style={[styles.tag, selected === null && styles.selected]}
          >
            <Text
              style={[
                styles.tagText,
                selected === null && styles.tagTextSelected
              ]}
            >
              Все темы
            </Text>
          </Pressable>

          {topics.map((tag) => (
            <Pressable
              onPress={() => onSelect(tag)}
              key={tag}
              style={[styles.tag, selected === tag && styles.selected]}
            >
              <Text
                style={[
                  styles.tagText,
                  selected === tag && styles.tagTextSelected
                ]}
              >
                {tag}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 60,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },
  title: { fontSize: 20, fontWeight: "700", color: "#2D3748" },
  button: {},
  scroll: { flex: 1 },
  tag: {
    borderWidth: 2,
    borderColor: "#CBD5E0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  tagText: { fontSize: 16, fontWeight: "600", color: "#2D3748" },
  selected: { backgroundColor: "#48BB78", borderColor: "#48BB78" },
  tagTextSelected: { color: "#FFF" }
});
