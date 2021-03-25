import { View, Text, StyleSheet } from 'react-native';
export default StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
    },
    menu: {
        fontWeight: '700',
        fontSize: 35,
        width: '70%',
        marginBottom: 50,
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
        textAlign: 'center',
        color: 'gray',
        marginTop: 50,
    },
} );
