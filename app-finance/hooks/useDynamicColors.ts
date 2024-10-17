import { useColorScheme } from '@/hooks/useColorScheme';

export function useDynamicColors() {
    const colorScheme = useColorScheme();

    let backgroundCardsColor = '';
    let generalBackgroundColor = '';
    let textsColor = '';
    let textTitleCards = '';
    let barNotificationColor = '';
    let buttonsColors = '';
    let barTabs = '';
    let activeBarTab = '';

    // Definir cores com base no esquema de cores
    if (colorScheme === 'dark') {
        generalBackgroundColor = '#18171c';
        backgroundCardsColor = 'rgba(57, 57, 67, 0.9)';
        textsColor = '#e4e5e8';//#e4e5e8
        barNotificationColor = '#2f2f39';
        buttonsColors = '#8858ce';
        barTabs = '#393943';
        activeBarTab = '#fff';
        textTitleCards = '#4a4564';

    } else if (colorScheme === 'light') {
        generalBackgroundColor = '#ecf3fb';
        backgroundCardsColor = 'rgba(255, 255, 255, 0.8)';
        textsColor = '#4a4564';
        barNotificationColor = '#dad7cd';
        buttonsColors = '#6615de';
        barTabs = '#fff';
        activeBarTab = '#6615de';
        textTitleCards = '#4a4564';

    }

    return {
        backgroundCardsColor,
        generalBackgroundColor,
        textsColor,
        barNotificationColor,
        buttonsColors,
        barTabs,
        activeBarTab,
        textTitleCards
    };
}