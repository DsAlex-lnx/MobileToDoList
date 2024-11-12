import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: themas.colors.background,
    },
    boxTop: {
        height: Dimensions.get('window').height/4,
        width: '100%',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMid: {
        height: Dimensions.get('window').height/3,
        width: '100%',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxBottom: {
        height: Dimensions.get('window').height/3,
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    logo: {
        marginTop: 100,
        width: 80,
        height: 80,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 40,
        color: themas.colors.primary,
        textShadowColor: themas.colors.primary,
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 10,
    },
    titleInput: {
        color: themas.colors.secondary,
        marginTop: 15,
    },
    boxInput: {
        width: '100%',
        height: 45,
        borderWidth: 2,
        borderRadius: 20,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.lightgray,
        borderColor: themas.colors.primary,
    },
    inputField: {
        height: '100%',
        width: '85%',
        color: themas.colors.secondary,
        paddingLeft: 15,
    },
    button: {
        backgroundColor: themas.colors.primary,
        borderRadius: 999,
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        shadowColor: themas.colors.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 8,
        borderWidth: 0,
    },
    textButton: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
        textTransform: 'uppercase'
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        color: themas.colors.secondary,
    },
    textFooter: {
        fontSize: 16,
        color: themas.colors.accent,
        fontWeight: 'bold',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
    },
    input: {
        flex: 1,
        height: '100%',
        color: themas.colors.secondary,
        paddingLeft: 15,
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    }
})