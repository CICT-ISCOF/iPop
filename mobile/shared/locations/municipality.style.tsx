import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
    container: { flex: 1, borderRadius: 20 },
    header: { height: 5, backgroundColor: 'rgba(150,150,150,.2)', width: 50, marginTop: 10, alignSelf: 'center', borderRadius: 30 },
    title: {
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: "bold",
        fontSize: 20,
        textTransform: 'capitalize'
    },
    separator: {
        borderBottomColor: 'rgba(150,150,150,.2)',
        borderBottomWidth: 1,
        width: '100%',
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        paddingVertical: 15
    },

    roundedButton: {
        alignItems: 'center',
        minHeight: 95,
        margin: 25,
    },
    roundedButtonIcon: {
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'rgba(250,250,250,.5)',
        padding: 18
    },
    roundedButtonText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 10
    },

} )