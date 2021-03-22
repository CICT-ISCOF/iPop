
import React, { useState, useEffect } from 'react';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import toDate from '../../../../../constants/date-converter';


export default function FeautredArticles( props: any ) {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();



    let feedBackground = colorScheme == 'dark' ? '#242526' : 'white';

    let articles = props.data

    const [ truncate, settruncate ]: any = useState( [] )

    function formatText( string: String, number: any ) {
        var trimmable = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
        var reg = new RegExp( '(?=[' + trimmable + '])' );
        var words = string.split( reg );
        var count = 0;
        return words.filter( function ( word: any ) {
            count += word.length;
            return count <= number;
        } ).join( '' ) + '..';
    }

    return (
        <View
            style={{
                marginTop: -40,
            }}>
            {
                articles.map( ( article: any, index: any ) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            navigation.navigate( 'ShowArticle', { article: article } )
                        }}
                        style={[
                            styles.featuredArticle,
                            {
                                backgroundColor: feedBackground,
                            },
                        ]}>
                        <Image
                            key={index}
                            style={[ styles.image, ]}
                            source={{ uri: article.photos[ 0 ].file.uri }}
                        />
                        <View style={styles.texts}>
                            <Text
                                style={[
                                    styles.title,

                                    { color: Colors[ colorScheme ].text },
                                ]}>
                                {article.title}
                            </Text>
                            <Text style={{ color: 'gray' }}>{toDate( article.updated_at )}</Text>
                        </View>
                    </TouchableOpacity>
                ) )
            }
        </View>
    );
}


const styles = StyleSheet.create( {
    featuredArticle: {
        marginTop: -2,
        padding: 15,
        borderWidth: 2,
        borderColor: 'rgba(150,150,150,.2)',
        flexDirection: 'row',
        paddingVertical: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 100,
        width: 120,
    },
    texts: {
        width: '60%',
        marginLeft: 20
    },
    title: {
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 15,
    },
} );
