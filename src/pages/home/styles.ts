import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.background,
        padding: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: themas.colors.primary,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: themas.colors.lightgray,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginRight: 10,
        color: themas.colors.secondary,
    },
    addButton: {
        width: 50,
        height: 50,
        backgroundColor: themas.colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: themas.colors.lightgray,
        borderRadius: 10,
        marginBottom: 10,
        minHeight: 50,
    },
    checkbox: {
        marginRight: 10,
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        color: themas.colors.secondary,
        flexWrap: 'wrap',
    },
    taskCompleted: {
        textDecorationLine: 'line-through',
        color: themas.colors.gray,
    },
    taskEditInput: {
        flex: 1,
        fontSize: 16,
        color: themas.colors.secondary,
        backgroundColor: themas.colors.background,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    iconButton: {
        marginLeft: 10,
    }
}); 