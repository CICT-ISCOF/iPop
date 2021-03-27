import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export default function TopPadding( color: any = undefined ) {
    const colorScheme = useColorScheme();

    return (
        <View
            style={{
                height: 48,
                backgroundColor:
                    color == undefined
                        ? Colors[ colorScheme ].bg1
                        : Colors[ colorScheme ].homeBG,
                position: 'absolute',
                zIndex: 8,
                width: '100%',
                top: 0,
            }}></View>
    );
}
