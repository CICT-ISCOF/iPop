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
        marginBottom: 50,
    },
    box: {
        flexDirection: 'row',
        minWidth: 150,
        minHeight: 50,
        borderRadius: 5,
        alignItems: 'center',
        padding: 20,
        margin: 20,
        marginLeft: 0,
    },
    text: {
        marginLeft: 20,
    },
    title: {
        color: 'white',
        textAlign: 'right',
    },
    value: {
        color: 'white',
        fontSize: 40,
        textAlign: 'right',
    },
    TextInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        paddingLeft: 20,
        flex: 0.5,
        marginTop: 60,
    },
    chartTitle: {
        marginLeft: 80,
        fontSize: 20,
        marginBottom: 5,
        marginTop: 20,
        opacity: 0.5,
        textAlign: 'center',
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '110%',
        borderBottomColor: 'rgba(150,150,150,.5)',
        borderBottomWidth: 1,
    },
});
