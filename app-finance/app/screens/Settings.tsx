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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
    const { textsColor, barNotificationColor, textTitleCards, backgroundCardsColor, buttonsColors } = useDynamicColors();
    const [darkMode, setDarkMode] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState('light');

    const themes = [
        { name: 'Light', icon: 'sun' },
        { name: 'Dark', icon: 'moon' },
    ];

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme !== null) {
                    setDarkMode(storedTheme === 'dark');
                    setSelectedTheme(storedTheme)
                }
            } catch (error) {
                console.log('Erro ao carregar tema:', error);
            }
        };

        loadTheme();
    }, []);

    const handleThemeChange = async (themeName: string) => {
        const normalizedThemeName = themeName.toLowerCase();

        // Atualiza o estado imediatamente para evitar atrasos visuais
        setSelectedTheme(normalizedThemeName);

        if (normalizedThemeName === 'dark') {
            setDarkMode(true);
            await AsyncStorage.setItem('theme', 'dark'); // Armazena o tema no AsyncStorage
            EventRegister.emit('ChangeTheme', true); // Emite o evento de alteração do tema
        } else if (normalizedThemeName === 'light') {
            setDarkMode(false);
            await AsyncStorage.setItem('theme', 'light'); // Armazena o tema no AsyncStorage
            EventRegister.emit('ChangeTheme', false); // Emite o evento de alteração do tema
        }
    };

    //Remove email e password do AsyncStorage para servir como logout
    const handleLogout = async () => {
        await AsyncStorage.removeItem('email');
        EventRegister.emit('Authenticating', false);
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
                                        <View style={[styles.selectedCircle, { backgroundColor: textTitleCards }]} />
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

            <View >
                <Text style={[styles.titleCardText, { color: textTitleCards }]}>
                    Sair da conta
                </Text>
                <View style={[styles.cardLogout, { backgroundColor: backgroundCardsColor }]}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: buttonsColors }]}
                        onPress={() => handleLogout()}>
                        <Text style={[{color: '#fff'}]}>
                            Sair da conta
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    button: {
        borderRadius: 20,
        margin: 20,
        width: 300,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    barTop: {
        marginBottom: 20,
        padding: 10
    },
    barTopText: {
        fontFamily: 'Kanit',
        fontWeight: '400',
        fontSize: 23,
        textAlign: 'center'
    },
    cardTheme: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'flex-start'
    },
    cardLogout: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        borderRadius: 6
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