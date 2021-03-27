import { View, Text, StyleSheet } from 'react-native';
export default StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
    },
    menu: {
        fontWeight: 'bold',
        fontSize: 25,
        width: '100%',
        marginBottom: 50,
        marginTop: -40,
        textAlign: 'center',
        paddingHorizontal: 50
    },
    title: { fontWeight: '600', fontSize: 25, marginBottom: 20, color: 'gray' },
    subTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: '#5B80F3',
        marginTop: 20,
    },
    link: {
        textDecorationLine: 'underline',
        color: 'gray',
    },

    date: {
        fontSize: 25,
        textAlign: 'right',
        color: 'red',
        marginBottom: -20,
        marginTop: 20
    },
} );
