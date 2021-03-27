import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { ScrollView } from 'react-native-gesture-handler';
import BackContainer from '../../../shared/back-container/back-container';
import styles from './service.style';
import TopPadding from '../../../shared/top-padding/top-padding';
import DynamicSmallHeader from '../../../shared/header/dynamic-small-header';
import { Entypo } from '@expo/vector-icons';


export default function Services() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const navigate = ( params: any ) => {
        navigation.navigate( 'ShowServices', { data: params } );
    }


    const [ show, setShow ] = React.useState( false )
    function scrollHandler( event: any ) {
        if ( event.nativeEvent.contentOffset.y < 1 ) {
            setShow( false )
        } else {
            setShow( true )
        }
    }

    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />

            <View style={show == true ? {} : { position: 'absolute', left: -500 }}>
                <DynamicSmallHeader text="Services Offered" />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={( event ) => {
                    scrollHandler( event )
                }}
                style={[ styles.container, { backgroundColor: Colors[ colorScheme ].homeBG, }, ]}>

                <View style={show != true ? {} : { position: 'absolute', left: -500 }}>
                    <BackContainer hidden={true} />
                    <Text
                        style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                        Services Offered
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        navigate( 1 );
                    }}
                    style={[
                        styles.button,
                        { backgroundColor: Colors[ colorScheme ].background },
                    ]}>
                    <FontAwesome5 style={{ width: 40 }} name='people-carry' size={24} color='red' />
                    <View style={styles.separator} />
                    <Text
                        style={[
                            styles.buttonText,
                            { color: Colors[ colorScheme ].text },
                        ]}>
                        Responsible Parenthood and Family Planning
                    </Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigate( 2 );
                    }}
                    style={[
                        styles.button,
                        { backgroundColor: Colors[ colorScheme ].background },
                    ]}>
                    <FontAwesome style={{ width: 40 }} name='stethoscope' size={35} color='#02A1C7' />
                    <View style={styles.separator} />

                    <Text
                        style={[
                            styles.buttonText,
                            { color: Colors[ colorScheme ].text },
                        ]}>
                        Adolescent Health and Youth Development
                    </Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigate( 4 );
                    }}
                    style={[
                        styles.button,
                        { backgroundColor: Colors[ colorScheme ].background },
                    ]}>
                    <MaterialIcons
                        style={{ width: 40 }}
                        name='data-usage'
                        size={24}
                        color='#3EA662'
                    />
                    <View style={styles.separator} />

                    <Text
                        style={[
                            styles.buttonText,
                            { color: Colors[ colorScheme ].text },
                        ]}>
                        Population Data Managment
                    </Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigate( 3 );
                    }}
                    style={[
                        styles.button,
                        { backgroundColor: Colors[ colorScheme ].background },
                    ]}>
                    <Ionicons style={{ width: 40 }} name='ios-people' size={24} color='orange' />
                    <View style={styles.separator} />
                    <Text
                        style={[
                            styles.buttonText,
                            { color: Colors[ colorScheme ].text },
                        ]}>
                        Population Development and Integration
                    </Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
