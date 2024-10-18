import { createContext } from 'react';
import theme from './Theme';

const themeContext = createContext(theme.dark)

export default themeContext