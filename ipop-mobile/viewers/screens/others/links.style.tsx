import { View, Text, StyleSheet } from 'react-native';
export default StyleSheet.create({
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
    title: { fontWeight: '600', fontSize: 25, marginBottom: 20 },
    subTitle: {
        fontWeight: '600',
        fontSize: 16,

        marginTop: 20,
    },
    link: {
        textDecorationLine: 'underline',
        color: 'gray',
    },

    date: {
        fontSize: 25,
        textAlign: 'center',
        color: '#02A1C7',
        marginTop: 50,
    },
});
