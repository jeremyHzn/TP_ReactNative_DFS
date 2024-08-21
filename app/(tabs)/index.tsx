import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Button';
import { Task } from '@/models/Task';
import Entypo from '@expo/vector-icons/Entypo';
import { Feather } from '@expo/vector-icons';

const AddScreen = () => {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      const tasksArray = tasksString ? JSON.parse(tasksString) : [];
      setTasks(tasksArray);
    } catch (e) {
      console.error('Failed to retrieve tasks from AsyncStorage', e);
    }
  };

  const addOrUpdateTask = async () => {
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      const task = { text, image };

      if (editingIndex !== null) {
        tasksArray[editingIndex] = task;
        setEditingIndex(null);
      } else {
        tasksArray.push(task);
      }

      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
      resetForm();
      fetchTasks();
    } catch (e) {
      console.error('Failed to save the task to AsyncStorage', e);
    }
  };

  const resetForm = () => {
    setText('');
    setImage(null);
  };

  const deleteTask = async (index: number) => {
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
      tasksArray.splice(index, 1);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
      fetchTasks();
    } catch (e) {
      console.error('Failed to delete the task from AsyncStorage', e);
    }
  };

  const editTask = (index: number) => {
    setText(tasks[index].text);
    setImage(tasks[index].image);
    setEditingIndex(index);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Titre de la nouvelle task</Text>
      <TextInput
        style={styles.input}
        placeholder="Tape ici pour ajouter une task"
        value={text}
        onChangeText={setText}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Prendre une Photo"
          width={150}
          backgroundColor="lightgreen"
          fontSize={18}
          onPress={pickImage}
        />
        <Button
          title={editingIndex !== null ? "Modifier Task" : "Ajouter Task"}
          width={150}
          backgroundColor="lightblue"
          fontSize={18}
          onPress={addOrUpdateTask}
        />
      </View>
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      {tasks.length > 0 && (
        <FlatList
          style={styles.flatList}
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              <View style={styles.items}>
                {item.image && <Image source={{ uri: item.image }} style={styles.taskImage} />}
                <Text style={styles.taskText}>{item.text}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => editTask(index)}>
                  <Text style={styles.editButton}><Feather name="edit" size={24} color="blue" /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <Text style={styles.deleteButton}><Feather name="trash-2" size={24} color="red" /></Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  flatList: {
    marginTop: 20,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    maxWidth: 200, // Limite la largeur du texte
    marginLeft: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
  },
  taskImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default AddScreen;
