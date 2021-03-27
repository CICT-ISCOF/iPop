import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    scrollview: {
        height: 210,
        width: '100%',
    },
    image: {
        height: '100%',
        width: 300,
        resizeMode: 'stretch',
        borderRadius: 10,
    },
    placeholder: {
        alignSelf: 'center',
        marginTop: '75%',
    },
    stepTab: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        zIndex: 999,
        position: 'relative'
    },
    stepper: {
        width: 10,
        height: 10,
        borderRadius: 50,
        margin: 5,
        opacity: .5,
        backgroundColor: '#426FC3',

    },
    stepperActive: {
        width: 10,
        height: 10,
        borderRadius: 50,
        margin: 5,
        backgroundColor: '#426FC3',
        borderWidth: 1,
        borderColor: 'white'
    },
    buttons: {
        position: 'absolute',
        zIndex: 999,
        height: 250,
        justifyContent: 'center',
    }

} );