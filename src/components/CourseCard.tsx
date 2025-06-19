import { Image, StyleSheet, Text, View } from "react-native";
import { Course } from "../types/course";

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <View style={styles.footer}>
        <Text style={styles.title}>{course.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 210,
    height: 180,
    borderRadius: 24,
    backgroundColor: "#FFF",
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  image: { width: "100%", height: '85%', resizeMode: "contain" },
  footer: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8
  },
  title: { fontWeight: "bold", fontSize: 14, textAlign: "center" }
});
