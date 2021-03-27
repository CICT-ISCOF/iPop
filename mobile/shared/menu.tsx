import * as React from 'react';
import styles from './menu.style';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { View, Text, Image, ScrollView } from 'react-native';
import Menus from './menus';
import TopPadding from './top-padding/top-padding';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenuScreen() {
    const colorScheme = useColorScheme();
    const [ user, setUser ] = React.useState( {
        fullname: '',
        profile_picture: { uri: '' },
    } );


    React.useEffect( () => {
        async function fetchAndSetUser() {
            let userToSet: any = await AsyncStorage.getItem( 'user' );
            let user = JSON.parse( userToSet );
            setUser( user );
            console.log( user.profile_picture );
        }

        fetchAndSetUser();
    }, [] );


    function splitName( fullname: any ) {
        let name = fullname.split( " " )
        return name[ 0 ]
    }


    return (
        <View style={[ styles.container, { padding: 0 } ]}>
            <TopPadding />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                    styles.container,
                    {
                        backgroundColor: Colors[ colorScheme ].homeBG,
                    },
                ]}>
                <SearchNav />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'stretch',
                            borderRadius: 50,
                            marginRight: 20,

                        }}
                        source={user.profile_picture == null
                            ? require( '../assets/IPOP/Iloilo-Provincial-Capitol-Panay-News-2.jpg' )
                            : { uri: user.profile_picture.uri }}
                    />
                    <Text style={[ styles.menu, { color: Colors[ colorScheme ].text } ]}>
                        Howdy, {splitName( user.fullname )}
                    </Text>
                </View>
                <Menus />
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}
