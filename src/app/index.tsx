import { SafeAreaView } from "react-native-safe-area-context";
import CoursesList from "../components/CoursesList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Course } from "../types/course";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import TopicSelectorModal from "../components/TopciSelectorModal";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const filteredCourses = useMemo(() => {
    return selectedTag
      ? courses.filter((course) => course.tags.includes(selectedTag))
      : courses;
  }, [courses, selectedTag]);

  const allTags = useMemo(() => {
    return Array.from(new Set(courses.flatMap((c) => c.tags)));
  }, [courses]);

  const handleOpenModal = useCallback(() => setModalVisible(true), []);
  const handleCloseModal = useCallback(() => setModalVisible(false), []);
  const handleSelectTag = useCallback((tag: string | null) => {
    setSelectedTag(tag);
    setModalVisible(false);
  }, []);

  useEffect(() => {
    fetch("https://logiclike.com/docs/courses.json")
      .then((res) => res.json())
      .then(setCourses)
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "#FFF" }}>Что-то пошло не так.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.container}>
      <Header currentTag={selectedTag} onPress={handleOpenModal} />
      <CoursesList courses={filteredCourses} />
      <TopicSelectorModal
        visible={modalVisible}
        topics={allTags}
        selected={selectedTag}
        onSelect={handleSelectTag}
        onClose={handleCloseModal}
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
