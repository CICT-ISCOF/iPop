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
        width: '90%',
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
    teenCenter: {
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 7,
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.17,
        shadowRadius: 5.49,
        elevation: 5,
        alignItems: 'center',
    },
});
