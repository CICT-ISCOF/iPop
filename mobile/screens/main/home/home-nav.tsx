import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './home.style';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

export default function HomeNav( props: any ) {
    const colorScheme = useColorScheme();

    const [ menu, setmenu ] = React.useState( 'All' )

    function setMenu( menuName: any ) {
        setmenu( menuName )
        props.menu( menuName )
    }
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: Colors[ colorScheme ].background,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 28,
                    marginTop: -20
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setMenu( 'All' )
                    }}
                    style={[ styles.menuButton, menu == 'All' ? styles.menuButtonActive : {} ]}
                >
                    <Text style={[ styles.menuButtonText, menu == 'All' ? styles.menuButtonActiveText : {} ]}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setMenu( 'Today' )
                    }}
                    style={[ styles.menuButton, menu == 'Today' ? styles.menuButtonActive : {} ]}
                >
                    <Text style={[ styles.menuButtonText, menu == 'Today' ? styles.menuButtonActiveText : {} ]}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setMenu( 'This Week' )
                    }}
                    style={[ styles.menuButton, menu == 'This Week' ? styles.menuButtonActive : {} ]}
                >
                    <Text style={[ styles.menuButtonText, menu == 'This Week' ? styles.menuButtonActiveText : {} ]}>This Week</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setMenu( 'This Month' )
                    }}
                    style={[ styles.menuButton, menu == 'This Month' ? styles.menuButtonActive : {} ]}
                >
                    <Text style={[ styles.menuButtonText, menu == 'This Month' ? styles.menuButtonActiveText : {} ]}>This Month</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

