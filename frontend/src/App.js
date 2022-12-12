// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// components
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <NotistackProvider>
            <GlobalStyles />
            <ProgressBarStyle />

            <ScrollToTop />
            <GoogleAnalytics />
            {isInitialized ? <Router /> : <LoadingScreen />}
          </NotistackProvider>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
