import { StyleSheet } from 'react-native';
export default StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
    },
    topContainer: {
        marginTop: 20,
        flexDirection: 'row',
        margin: 10,
        backgroundColor: 'rgba(113,111,139,.2)',
        height: 60,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center'
    },
    backContainer: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 10,
        minWidth: 40,
        alignItems: 'center',
        shadowColor: "rgba(113,111,139,1)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.57,
        shadowRadius: 4.65,
        elevation: 6,
    },
    textINputContainer: {
        height: '100%',
        flexDirection: 'row',
        flex: 4,
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "rgba(113,111,139,1)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.57,
        shadowRadius: 4.65,
        elevation: 6,
    },
    iconCOntainer: {
        height: '100%',
        justifyContent: 'center',
        flex: 1,
        maxWidth: 40,
        alignItems: 'center',
        borderRadius: 10,
    },
    menuContainer: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10,
        minWidth: 40,
        alignItems: 'center',
        shadowColor: "rgba(113,111,139,1)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.57,
        shadowRadius: 4.65,
        elevation: 6,
    },
    textInput: {
        flex: 4,
        borderRadius: 10,
        paddingRight: 10

    }

} );
