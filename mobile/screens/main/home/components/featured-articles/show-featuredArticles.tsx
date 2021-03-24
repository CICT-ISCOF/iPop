import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from '../carousel/carousel';
import { Entypo } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TopPadding from '../../../../../shared/top-padding/top-padding';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import toDate from '../../../../../constants/date-converter';


export default function ShowArticle( { route }: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const article = route.params.article

    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].homeBG
        }}>
            <TopPadding />
            <ScrollView style={{ paddingTop: 50, height: '100%' }} showsVerticalScrollIndicator={false}>

                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                    <Entypo name="chevron-thin-left" size={24} color={Colors[ colorScheme ].text} />
                </TouchableOpacity>

                <Carousel
                    data={article.photos}
                    type="Show"
                />

                <Text
                    style={[
                        styles.title,

                        { color: Colors[ colorScheme ].text },
                    ]}>
                    {article.title}
                </Text>

                <Text style={{ color: 'gray', marginLeft: 20 }}>{toDate( article.updated_at )}</Text>


                <Text
                    style={[
                        styles.body,
                        { color: Colors[ colorScheme ].text1 },
                    ]}>
                    {article.body}
                </Text>


            </ScrollView >
        </View>
    );
}
const styles = StyleSheet.create( {

    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 15,
        padding: 20,
        lineHeight: 35
    },

    body: {
        fontSize: 17,
        padding: 20,
        lineHeight: 30,
        color: 'gray'
    }
} );