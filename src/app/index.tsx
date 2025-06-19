import { SafeAreaView } from "react-native-safe-area-context";
import CoursesList from "../components/CoursesList";
import { useEffect, useState } from "react";
import { Course } from "../types/course";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://logiclike.com/docs/courses.json")
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header currentTag={null} onPress={() => {}} />
      <CoursesList courses={courses} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7E4DFF",
    paddingTop: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7E4DFF"
  }
});
