import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  currentTag: string | null;
  onPress: () => void;
};

export default function Header({ currentTag, onPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text} adjustsFontSizeToFit>{currentTag || "Все темы"}</Text>
        <Feather name="chevron-down" size={18} color="#FFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  button: {
    backgroundColor: "#6D30FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  text: { color: "#FFF", fontWeight: "600" }
});
