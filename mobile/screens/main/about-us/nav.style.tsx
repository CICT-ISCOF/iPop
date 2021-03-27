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
    },
    list: {
        flex: 1,
    },
    navs: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        height: 140,
        margin: 10,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,.2)',
    },
    navIons: {
        textAlign: 'center',
        alignSelf: 'center',
    },
    navButton: {
        width: '100%',
        backgroundColor: '#426FC3',
        padding: 10,
        position: 'absolute',
        bottom: 20,
        opacity: 0.8,
    },
    navButtonText: {
        fontSize: 9,
        textAlign: 'center',
        color: 'white',
    },
} );
