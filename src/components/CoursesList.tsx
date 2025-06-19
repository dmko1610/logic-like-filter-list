import { FlatList, StyleSheet, Text } from "react-native";
import { Course } from "../types/course";
import CourseCard from "./CourseCard";

type Props = {
  courses: Course[];
};

export default function CoursesList({ courses }: Props) {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CourseCard course={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      initialNumToRender={5}
      ListEmptyComponent={
        <Text style={styles.empty}>Нет доступных курсов</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    alignItems: "center"
  },
  empty: { fontSize: 20, fontWeight: "700", color: "#FFF" }
});
