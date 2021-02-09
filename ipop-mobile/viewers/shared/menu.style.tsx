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
    },
    listContianer: {
        height: 70,
        flexDirection: 'row',
        marginTop: 20,
    },
    image: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginRight: 15,
        marginTop: 5,
    },
    texts: {
        height: 55,
        borderBottomWidth: 1,
        width: '80%',
        borderBottomColor: 'rgba(150,150,150,0.3)',
    },
    name: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    position: {
        fontWeight: '500',
    },
});
