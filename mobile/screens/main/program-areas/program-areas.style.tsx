import { View, Text, StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
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
    button: {
        borderRadius: 7,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        width: '80%',
        flex: 4
    },
    separator: {
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(150,150,150,.2)',
        height: '100%',
        marginHorizontal: 10,
    },
    icon: {
    },
    title: {
        margin: 10,
        fontWeight: '700',
        fontSize: 25,
        color: 'red',
        marginTop: 50,
    },
    description: {
        padding: 10,
        lineHeight: 30,
    },
    article: {
        marginTop: 20,
        borderBottomWidth: 5,
        borderBottomColor: 'rgba(150,150,150,.2)',
        width: Dimensions.get( 'screen' ).width,
        marginLeft: -20,
        padding: 10
    },
    title1: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: -5,
        marginBottom: 15,
        textAlign: 'center'
    },

} );
