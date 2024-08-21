import { View,StyleSheet, TextInput } from "react-native";
import { ThemedText } from "./ThemedText";
import Button from "./Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { ThemedView } from "./ThemedView";
import { Task } from "@/models/Task";

declare type Props = {
    id: number,
    title:string
};

export default function TaskComponent({title}:Props) {
const handleDelete = async () => {
    // Code to delete element from AsyncStorage
    try {
        await AsyncStorage.removeItem('id');
        
    }
    catch (e) {
        // error reading value
        console.error(e);
    }
};
const handleUpdate = async (v:string) => {
    // Code to update element to AsyncStorage
    try {
        await AsyncStorage.setItem('id', v);
    }
    catch (e) {
        // error reading value
        console.error(e);
    }
}

const [task, setTask] = useState('');
const size = 30;
return (
    <ThemedView style={styles.task}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <View style={styles.buttons}>
        <Button title="edit" width={50} backgroundColor="lightblue" fontSize={18} onPress={() => handleUpdate(task)} />
        <Button title="-" width={50} backgroundColor="red" fontSize={size} onPress={handleDelete} />
        </View>
    </ThemedView>
);
}

const styles = StyleSheet.create({
    title:{
        width: '60%',
    },
    buttons:{
        flexDirection: 'row',
    },
    task: {
        // modern task style
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    button: {
        // modern button style
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    });