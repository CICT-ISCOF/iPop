import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
    },
    welcome: {
        marginTop: 20,
        fontSize: 30,
    },
    apptitle: {
        fontSize: 40,
        color: '#426FC3',
        fontWeight: '500',
        width: '70%',
        textAlign: 'center',
    },
    TextInputContianer: {
        width: '100%',
        paddingHorizontal: 40,
        alignItems: 'center',
        marginTop: '60%',
    },
    TextInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        borderColor: 'lightgray',
        paddingLeft: 20,
    },
    button: {
        backgroundColor: '#426FC3',
        padding: 15,
        width: '100%',
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    profileContainerMain: {
        borderRadius: 100,
        height: 205,
        width: 205,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -50,
        marginTop: 50,
        borderWidth: 2,
    },
    profileContainer: {
        borderRadius: 100,
        borderWidth: 10,
        borderColor: 'gray',
        height: 198,
        width: 198,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        height: 190,
        width: 190,
        borderRadius: 100,
        borderWidth: 4,
    },
    iconHolder: {
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [ { translateY: -60 }, { translateX: 70 } ],
        borderWidth: 3,
        borderColor: 'white',
    },
    ghostBtn: {
        marginTop: 20
    },
    ghostBtnText: {},
} );
