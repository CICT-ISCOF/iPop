import Colors from './Colors';
import useColorScheme from './../hooks/useColorScheme';

export default function chartConfig( textColor: any ) {

    const colorScheme = useColorScheme();

        return {
            backgroundGradientFrom: Colors[ colorScheme ].background,
            backgroundGradientTo: Colors[ colorScheme ].background,
            decimalPlaces: 0,
            fillShadowGradient: textColor,
            fillShadowGradientOpacity: 1,
            color: ( opacity = 1 ) => textColor,
            style: {
                borderRadius: 1,
            },

            strokeWidth: 0.5,
            barPercentage: 0.17,
            labelColor: ( opacity = 1 ) => Colors[ colorScheme ].text,
            propsForDots: {
                r: '3',
                strokeWidth: '15',
                stroke: 'red',
            },
        };
}