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
        paddingHorizontal: 20,
        paddingBottom: 14,
    },
    menuButtonActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#5B80F3',
    },
    menuButtonText: {
        color: 'gray'
    },
    menuButtonActiveText: {
        fontWeight: 'bold'
    }

} );
