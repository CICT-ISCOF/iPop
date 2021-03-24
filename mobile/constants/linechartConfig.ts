
import Colors from './Colors';
import useColorScheme from './../hooks/useColorScheme';

export default function chartConfig(color:any) {
    
    const colorScheme = useColorScheme();

    return {
        backgroundGradientFrom: Colors[ colorScheme ].BottomSheetBG,
        backgroundGradientTo: Colors[ colorScheme ].BottomSheetBG,
        decimalPlaces: 0,
        fillShadowGradient: color,
        fillShadowGradientOpacity: .3,
        labelColor: (  ) =>'rgba(150,150,150,.5)',
        color: ( ) => color,
        propsForDots: {
            strokeWidth: '1',
            stroke: color,
        },
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0.5,
        strokeWidth:5, 
        useShadowColorFromDataset: true 
       
    }
}