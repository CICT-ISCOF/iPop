import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    scrollview: {
        height: 350,
        width: '100%',
        position: 'relative',
        zIndex: 99
    },
    image: {
        height: '100%',
        width: 380,
        resizeMode: 'stretch',
    },
    placeholder: {
        alignSelf: 'center',
        marginTop: '75%',
    },
} );