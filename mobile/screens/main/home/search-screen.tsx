import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { search } from './search.service'
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';


export default function SearchScreen( props: any ) {

    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const [ focus, setfocus ] = React.useState( false )
    const [ keyword, setkeyword ] = React.useState( '' )
    const [ type, settype ] = React.useState( 'plant' )
    const [ data, setsearchResults ]: any = React.useState( { resultsArray: [] } )
    let inputRef: any = React.createRef();

    useEffect( () => {
        if ( props.show == true ) {
            setfocus( true )
            inputRef.focus()
        } else {
            inputRef.blur()
        }

    }, [ props.show ] )

    useEffect( () => {


    }, [ keyword ] )


    return (
        <View style={[ {
            position: 'absolute',
            zIndex: 999999,
            width: '100%',
            height: '100%',
            backgroundColor: Colors[ colorScheme ].homeBG,
        },
        props.show == false ? { left: -500 } : {}
        ]
        }>
            <View style={[ { padding: 10, position: 'relative', zIndex: 3, flexDirection: 'row', paddingTop: 50, alignItems: 'center', backgroundColor: '#426FC3', }
            ]}>
                <View style={[
                    styles.searchContainer,
                    { backgroundColor: Colors[ colorScheme ].background, width: '85%', marginRight: 10 },
                    props.show != true ? { marginTop: -10, } : { marginTop: 10 } ]
                }>
                    <TextInput
                        autoFocus={focus}
                        ref={ref => inputRef = ref}
                        selectionColor='#426FC3'
                        style={[ styles.input,
                        {
                            color: Colors[ colorScheme ].text,
                            width: '97%',
                        }
                        ]}
                        onChangeText={async ( text ) => {
                            if ( text != null || text == "" ) {
                                setkeyword( text )
                                await search( text ).then( ( data ) => {
                                    setsearchResults( data )
                                } )
                            }
                        }}
                        returnKeyType="search"
                        clearButtonMode="always"
                        value={keyword}
                        onSubmitEditing={() => {
                            setkeyword( '' )
                            setfocus( false )
                            props.showSearch()

                        }}
                        placeholder='Search' />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setkeyword( '' )
                        setfocus( false )
                        props.showSearch()
                    }}>
                    <Text style={{ color: 'white', marginTop: 5 }}>Cancel</Text>
                </TouchableOpacity>
            </View>


            <ScrollView>
                {
                    data.resultsArray.map( ( result: any, index: any ) => (
                        <TouchableOpacity
                            onPress={() => {
                                setkeyword( '' )
                                setfocus( false )
                                props.showSearch()
                                navigation.navigate( data.routesArray[ index ] )
                            }}
                            style={styles.list}
                            key={index}>
                            <Ionicons name="md-search-outline" size={19} color="gray" />
                            <Text style={{ color: 'gray', marginLeft: 10 }}>
                                {result}
                            </Text>
                        </TouchableOpacity>
                    ) )
                }
                <View style={{ height: 250 }} />
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create( {
    searchContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#426FC3',
        height: 35,
        borderRadius: 15,
        flexDirection: 'row'
    },

    input: {
        paddingLeft: 20,
        height: '100%',
        width: '78%'
    },
    list: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,.2)'
    }
} )