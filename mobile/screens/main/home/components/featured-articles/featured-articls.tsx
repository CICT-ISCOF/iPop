
import React, { useState, useEffect } from 'react';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


export default function FeautredArticles( props: any ) {

    const colorScheme = useColorScheme();
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
                    <View
                        key={index}
                        style={[
                            styles.featuredArticle,
                            {
                                backgroundColor: feedBackground,
                            },
                        ]}>
                        <ScrollView
                            decelerationRate={0}
                            snapToInterval={Dimensions.get( 'screen' ).width + 20 - ( 0 + 0 )}
                            style={{
                                marginLeft: -20,
                                width: Dimensions.get( 'screen' ).width,
                            }}
                            horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                article.photos.map( ( photo: any, index: any ) => (
                                    <Image
                                        key={index}
                                        style={[ styles.image, ]}
                                        source={{ uri: photo.file.uri }}
                                    />
                                ) )
                            }
                        </ScrollView>

                        <View style={styles.texts}>
                            <Text
                                style={[
                                    styles.title,

                                    { color: Colors[ colorScheme ].text },
                                ]}>
                                {article.title}
                            </Text>
                            <Text style={[ { color: Colors[ colorScheme ].text, lineHeight: 25, fontSize: 14 } ]}>
                                {truncate.includes( index ) ? article.body : formatText( article.body, 200 )}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    let array = truncate
                                    for ( let i of array ) {
                                        if ( array.includes( index ) ) {
                                            array.splice( i, 1 )
                                            settruncate( array )
                                            props.refresh()
                                            return
                                        }
                                    }
                                    array.push( index )
                                    settruncate( array )
                                    props.refresh()

                                }}
                                style={{ marginTop: 20 }}>
                                <Text style={{ color: Colors[ colorScheme ].text1, fontSize: 16, marginBottom: 20 }}>
                                    {truncate.includes( index ) ? 'See less' : 'See more'}
                                    ....

                                    </Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                ) )
            }
        </View>
    );
}


const styles = StyleSheet.create( {
    featuredArticle: {
        marginTop: 7,
        padding: 20,
        borderWidth: 2,
        borderColor: 'rgba(150,150,150,.2)'
    },
    image: {
        height: 200,
        marginTop: 10,
        marginLeft: -20,
        width: Dimensions.get( 'screen' ).width + 20,
    },
    texts: {
        width: '100%',
    },
    title: {
        fontWeight: '700',
        fontSize: 13,
        marginBottom: 15,
        marginTop: 20
    },
} );
