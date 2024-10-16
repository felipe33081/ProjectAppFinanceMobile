import { StyleSheet, ImageBackground, Text, View } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

export default function TransactionsScreen() {
    const image = require('../../assets/images/1000_F_916875522_4MAi6kU4XNpdmCHLqX2R66btNzflaqgV (1).jpg');
    const { textsColor } = useDynamicColors();

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={{ color: 'white', fontSize: 50 }}>Tela de Contas</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%', // ou um valor fixo, se necessário
        height: '100%',
        justifyContent: 'center',
    },
    titleCardText: {
        fontFamily: 'Kanit',
        fontWeight: '400',
        fontSize: 22,
        paddingLeft: 18
    },
});