import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Switch
} from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

export default function TransactionsScreen() {
    const { backgroundCardsColor, textsColor, barNotificationColor, textTitleCards } = useDynamicColors();

    return (
        <View style={{ paddingTop: StatusBar.currentHeight || 0 }}>
            <StatusBar
                backgroundColor={barNotificationColor}
                hidden={false}
            />
            <View style={[styles.barTop, { backgroundColor: backgroundCardsColor }]}>
                <Text style={[styles.barTopText, { color: textsColor }]}>
                    Contas
                </Text>
            </View>
            <View style={styles.container}>
                <Text style={[styles.titleCardText, { color: textTitleCards, fontSize: 30 }]}>Tela de Contas</Text>
            </View>
        </View>
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
    },
    barTop: {
        backgroundColor: '#000',
        marginBottom: 20,
        padding: 10
    },
    barTopText: {
        fontFamily: 'Kanit',
        fontWeight: '400',
        fontSize: 23,
        color: '#fff'
    },
});