import { Theme } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { useDynamicColors } from "@/hooks/useDynamicColors";

export function useGeneralTheme(): Theme {
  const { backgroundCardsColor, generalBackgroundColor } = useDynamicColors();

  return {
    dark: true, // ou use uma lógica dinâmica para detectar se é dark ou light
    colors: {
      primary: 'rgb(10, 132, 255)',
      background: generalBackgroundColor, // usa o valor retornado pelo hook
      card: 'rgb(18, 18, 18)',
      text: 'rgb(229, 229, 231)',
      border: 'rgb(39, 39, 41)',
      notification: 'rgb(255, 69, 58)',
    },
  };
}