import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Switch,
    TouchableOpacity
} from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import { useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { Feather } from '@expo/vector-icons';

export default function SettingsScreen() {
    const { textsColor, barNotificationColor, textTitleCards, backgroundCardsColor } = useDynamicColors();
    const [darkMode, setDarkMode] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState('automatic');

    const themes = [
        { name: 'Light', icon: 'sun' },
        { name: 'Dark', icon: 'moon' },
    ];

    const handleThemeChange = (themeName: String) => {
        setSelectedTheme(themeName.toLowerCase());

        if (themeName.toLowerCase() === 'dark') {
            setDarkMode(true);
            EventRegister.emit('ChangeTheme', true);
        } else if (themeName.toLowerCase() === 'light') {
            setDarkMode(false);
            EventRegister.emit('ChangeTheme', false);
        } else {
            if (selectedTheme === 'dark') {
                setDarkMode(true)
            }
            else if (selectedTheme === 'light') {
                setDarkMode(false)
            }
            EventRegister.emit('ChangeTheme', darkMode)
            const isSystemDarkMode = darkMode
            setDarkMode(isSystemDarkMode);
            EventRegister.emit('ChangeTheme', isSystemDarkMode);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: StatusBar.currentHeight || 0 }]}>
            <StatusBar backgroundColor={barNotificationColor} hidden={false} />

            <View style={[styles.barTop, { backgroundColor: backgroundCardsColor }]}>
                <Text style={[styles.barTopText, { color: textsColor }]}>
                    Cofigurações
                </Text>
            </View>

            <Text style={[styles.titleCardText, { color: textTitleCards }]}>Tema do aplicativo</Text>
            <View style={[styles.cardTheme, { backgroundColor: backgroundCardsColor }]}>
                {themes.map((theme, index) => (
                    <View key={theme.name}>
                        <TouchableOpacity
                            key={theme.name}
                            style={styles.option}
                            onPress={() => handleThemeChange(theme.name)}
                        >
                            <Feather
                                name={
                                    theme.icon === 'sun' ? 'sun' :
                                        theme.icon === 'moon' ? 'moon' : 'circle'
                                }
                                size={24}
                                color={textTitleCards}
                            />
                            <Text
                                style={[
                                    styles.optionText, { color: textTitleCards },
                                    selectedTheme === theme.name.toLowerCase() && styles.selectedText, { color: textTitleCards },
                                    selectedTheme !== theme.name.toLowerCase() && { color: 'gray' },
                                ]}
                            >
                                {theme.name === 'Dark' ? 'Escuro' : 'Claro'}
                            </Text>
                            <View style={styles.circleTheme}>
                                <View style={styles.radioIcon}>
                                    {selectedTheme === theme.name.toLowerCase() && (
                                        <View style={styles.selectedCircle} />
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                        {index < themes.length - 1 && (
                            <View style={styles.separator} />
                        )}
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    barTop: {
        marginBottom: 20,
        padding: 10
    },
    barTopText: {
        fontFamily: 'Kanit',
        fontWeight: '400',
        fontSize: 23
    },
    cardTheme: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'flex-start'
    },
    title: {
        fontFamily: 'Kanit',
        fontWeight: '400',
        fontSize: 23,
        marginBottom: 10,
    },
    buttonDarkLight: {
        margin: 10,
        alignItems: 'center'
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16
    },
    selectedText: {
        fontWeight: 'bold',
    },
    radioIcon: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    separator: {
        height: .8, // Define a espessura da linha
        backgroundColor: '#ddd', // Cor da linha
        marginVertical: 10,
    },
    circleTheme: {
        alignItems: 'flex-end',
        flex: 1
    },
    titleCardText: {
        fontFamily: 'Kanit',
        fontWeight: '400',
        fontSize: 22,
        paddingLeft: 18
    },
});