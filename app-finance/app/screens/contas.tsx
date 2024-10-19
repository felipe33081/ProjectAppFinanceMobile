import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Switch
} from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

export default function TransactionsScreen() {
    const { textsColor, barNotificationColor, textTitleCards } = useDynamicColors();

    return (
        <View style={{ paddingTop: StatusBar.currentHeight || 0 }}>
            <StatusBar
                backgroundColor={barNotificationColor}
                hidden={false}
            />
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
    }
});