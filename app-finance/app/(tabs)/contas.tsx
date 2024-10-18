import { StyleSheet, ImageBackground, Text, View, StatusBar } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

export default function TransactionsScreen() {
    const image = require('../../assets/images/yu13.jpg');
    const { textsColor, barNotificationColor } = useDynamicColors();

    return (
        //<ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={{ paddingTop: StatusBar.currentHeight || 0 }}>
            <StatusBar
                animated={false}
                backgroundColor={barNotificationColor}
                hidden={false}
            />
            <View style={styles.container}>
                <Text style={[styles.titleCardText, { color: 'white', fontSize: 30 }]}>Tela de Contas</Text>
            </View>

        </View>
        //</ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    titleCardText: {

        fontFamily: 'Kanit',
        fontWeight: '400',
        fontSize: 25,
    }
});