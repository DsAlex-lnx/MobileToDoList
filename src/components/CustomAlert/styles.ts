import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: themas.colors.background,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '80%',
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themas.colors.secondary,
        marginTop: 15,
    },
    message: {
        fontSize: 16,
        color: themas.colors.gray,
        textAlign: 'center',
        marginVertical: 15,
    },
    button: {
        backgroundColor: themas.colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 25,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
}); 