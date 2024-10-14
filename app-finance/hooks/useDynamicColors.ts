import { useColorScheme } from '@/hooks/useColorScheme';

export function useDynamicColors() {
    const colorScheme = useColorScheme();

    let backgroundCardsColor = '';
    let generalBackgroundColor = '';
    let textsColor = '';
    let barNotificationColor = '';
    let buttonsColors = '';

    // Definir cores com base no esquema de cores
    if (colorScheme === 'dark') {
        backgroundCardsColor = '#393943';
        generalBackgroundColor = '#18171c';
        textsColor = '#e4e5e8';
        barNotificationColor = '#2f2f39';
        buttonsColors = '#8858ce';

    } else if (colorScheme === 'light') {
        backgroundCardsColor = '#ffffff';
        generalBackgroundColor = '#ecf3fb';
        textsColor = '#4a4564';
        barNotificationColor = '#dad7cd';
        buttonsColors = '#6615de';

    }

    return { backgroundCardsColor, generalBackgroundColor, textsColor, barNotificationColor, buttonsColors };
}