import TaskComponent from '@/components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Task as TaskType } from '@/models/Task'; // Import the correct Task type

export default function HomeScreen() {


  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((res) => setTasks(res))
      .catch((error) => console.error(error));
  }
  , []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList 
      horizontal={false} 
      data={tasks}
      renderItem={({ item }) => (
        <View style={styles.stepContainer}>
          <TaskComponent id={item.id} title={item.title} />
        </View>
      )}
      >
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
