import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
    },
    menu: {
        fontWeight: '700',
        fontSize: 35,
        width: '70%',
    },
    image: {
        height: '100%',
        width: 300,
        resizeMode: 'stretch',
        borderWidth: 3,
        borderColor: 'rgba(150,150,150,0.9)',
    },
    scrollview: {
        height: 200,
        width: '100%',
        marginTop: 20,
    },
    article: {
        marginTop: 20,
        padding: 20,
        borderRadius: 3,
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: -5,
        marginBottom: 15,
    },
});
