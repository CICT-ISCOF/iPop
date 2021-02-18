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
    province: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 30,
        marginBottom: 20,
    },
    label: {
        margin: 5,
        marginTop: 20,
    },
    select: {
        flex: 1,
    },

    tr: {
        flexDirection: 'row',
        borderBottomWidth: 1,

        padding: 10,
    },
    th: {
        flex: 1,
        padding: 2,
    },
    td: {
        flex: 1,
        padding: 2,
        paddingLeft: 20,
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
        fontSize: 20,
        marginBottom: 5,
        marginTop: 40,
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
