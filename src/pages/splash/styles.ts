import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        tintColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    }
}); 