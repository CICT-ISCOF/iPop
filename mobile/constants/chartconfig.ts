import Colors from './Colors';
import useColorScheme from './../hooks/useColorScheme';

export default function chartConfig( color: any ) {

    const colorScheme = useColorScheme();
 
    return {
            
            backgroundGradientFrom: Colors[ colorScheme ].background,
            backgroundGradientTo: Colors[ colorScheme ].background,
            decimalPlaces: 2,
            fillShadowGradient: color,
            fillShadowGradientOpacity:1,
            labelColor: ( ) => Colors[ colorScheme ].text,
            color: ( ) => color,
            barPercentage: .4,
            barRadius:5,
        };
}