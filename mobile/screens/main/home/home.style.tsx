import { StyleSheet } from 'react-native';

export default StyleSheet.create( {
    container: {
        flex: 1,
    },
    nav: {
        padding: 15,
    },

    textInputWrapper: {
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 50,
    },
    menu: {
        fontWeight: '700',
        fontSize: 35,
        marginTop: 50,
        marginLeft: 20,
    },

    menuButton: {
        marginRight: 20,
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
    },
    menuButtonActive: {
        backgroundColor: '#426FC3',
        shadowColor: "rgba(113,111,139,1)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.57,
        shadowRadius: 4.65,
        elevation: 6,
    },
    menuButtonText: {
        color: 'gray'
    },
    menuButtonActiveText: {
        color: 'white',
        fontWeight: 'bold'
    }

} );
