import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Switch
} from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import { useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

export default function TransactionsScreen() {
    const { textsColor, barNotificationColor, textTitleCards } = useDynamicColors();

    const [darkMode, setDarkMode] = useState(false)

    return (
        <View style={{ paddingTop: StatusBar.currentHeight || 0 }}>
            <StatusBar
                backgroundColor={barNotificationColor}
                hidden={false}
            />
            <View style={styles.container}>
                <Text style={[styles.titleCardText, { color: textTitleCards, fontSize: 30 }]}>Tela de Contas</Text>
            </View>

            <Switch
                value={darkMode}
                onValueChange={(value) => {
                    setDarkMode(value);
                    EventRegister.emit('ChangeTheme', value)
                }}
            />
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