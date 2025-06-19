import { SafeAreaView } from "react-native-safe-area-context";
import CoursesList from "../components/CoursesList";
import { useEffect, useState } from "react";
import { Course } from "../types/course";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import TopicSelectorModal from "../components/TopciSelectorModal";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const filteredCourses = selectedTag
    ? courses.filter((course) => course.tags.includes(selectedTag))
    : courses;

  const allTags = Array.from(new Set(courses.flatMap((c) => c.tags)));

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
      <Header currentTag={selectedTag} onPress={() => setModalVisible(true)} />
      <CoursesList courses={filteredCourses} />
      <TopicSelectorModal
        visible={modalVisible}
        topics={allTags}
        selected={selectedTag}
        onSelect={(tag) => {
          setSelectedTag(tag);
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
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
