import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
    },
    menu: {
        fontWeight: '700',
        fontSize: 35,
        marginBottom: 50,
    },
    button: {
        borderRadius: 7,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.17,
        shadowRadius: 5.49,
        elevation: 5,
        width: '100%',
        marginVertical: 10,
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 20,
        paddingLeft: 20,
        width: '80%',
    },
    icon: {
        marginRight: 10,
    },
    article: {
        marginTop: 20,
        padding: 20,
        borderRadius: 3,
        paddingBottom: 0,
    },
    title1: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: -5,
        marginBottom: 15,
    },
    scrollview: {
        height: 200,
        width: '100%',
        marginTop: 20,
    },
    image: {
        height: '100%',
        width: 300,
        resizeMode: 'stretch',
        borderWidth: 3,
        borderColor: 'rgba(150,150,150,0.9)',
    },
} );
