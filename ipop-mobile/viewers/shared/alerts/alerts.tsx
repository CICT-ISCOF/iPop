import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlertComponent(props: any) {
    const [backgroundColor, setBackgroundColor] = useState('#323232');
    const [user, setUser] = useState({
        fullname: '',
        profile_picture: { uri: '' },
    });

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        async function fetchAndSetUser() {
            let userToSet: any = await AsyncStorage.getItem('user');
            let user = JSON.parse(userToSet);
            setUser(user);
            setTimeout(() => {
                setHidden(true);
            }, 5000);
        }

        fetchAndSetUser();
    }, []);

    return (
        <TouchableOpacity
            onPress={() => {
                setHidden(true);
            }}
            style={[
                {
                    height: 38,
                    position: 'absolute',
                    zIndex: 999,
                    width: '90%',
                    top: 50,
                    backgroundColor: backgroundColor,
                    flexDirection: 'row',
                    margin: '5%',
                    borderRadius: 10,
                    alignItems: 'center',
                    padding: 10,
                },
                props.hidden == false ? {} : { display: 'none' },
                hidden == false ? {} : { display: 'none' },
            ]}>
            <Image
                style={{
                    height: 28,
                    width: 28,
                    marginRight: 20,
                    borderRadius: 50,
                    marginLeft: 20,
                }}
                source={
                    user.profile_picture == null
                        ? require('../../assets/IPOP/Iloilo-Provincial-Capitol-Panay-News-2.jpg')
                        : { uri: user.profile_picture.uri }
                }
            />
            <Text
                style={{
                    color: 'white',
                    fontSize: 20,
                }}>
                Howdy ! {user.fullname}
            </Text>
        </TouchableOpacity>
    );
}
