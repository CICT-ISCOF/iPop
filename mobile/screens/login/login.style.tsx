import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    welcome: {
        marginTop: 20,
        fontSize: 30,
    },
    apptitle: {
        fontSize: 50,
        color: '#5B80F3',
        fontWeight: '900',
    },
    mobileApp: {},
    image: {
        marginTop: '20%',
        resizeMode: 'stretch',
        width: 100,
        height: 50,

    },
    TextInputContianer: {
        width: '100%',
        paddingHorizontal: 40,
        marginTop: 70,
        alignItems: 'center',
    },

    TextInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
    },
    button: {
        backgroundColor: '#426FC3',
        padding: 15,
        width: '100%',
        borderRadius: 5,
        marginTop: -40,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    ghostBtn: {
        marginTop: 20
    },
    ghostBtnText: {},
} );
