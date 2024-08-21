import { Pressable, StyleSheet, Text } from "react-native";
import { primary } from '@/constants/Colors';

declare type Props = {
    title: string,
    width: number,
    backgroundColor: string,
    fontSize: number,
    onPress: () => void
};

export default function Button({ title, width,backgroundColor, fontSize, onPress }: Props) {

    return <Pressable
        onPress={onPress}
        style={{
            ...styles.button,
            width,
            backgroundColor,
        }}>
        <Text style={{ ...styles.textButton, fontSize }}>{title}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        padding: 5,
        margin: 5,
        justifyContent: 'center',
        borderRadius: 5,

    },
    textButton: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        
    }
})