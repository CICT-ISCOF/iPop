import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    scrollview: {
        height: 200,
        width: '100%',
    },
    image: {
        height: '100%',
        width: 300,
        resizeMode: 'stretch',
        borderWidth: 3,
        borderColor: 'rgba(150,150,150,0.9)',
    },
    placeholder: {
        alignSelf: 'center',
        marginTop: '75%',
    },
} );