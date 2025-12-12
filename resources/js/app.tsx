import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

import { LocalizationProvider } from '@/locales';
import { themeConfig, ThemeProvider } from '@/theme';
import { themeOverrides } from '@/theme/theme-overrides';

import { Snackbar } from '@/components/snackbar';
import { MotionLazy } from '@/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from '@/components/settings';

// ----------------------------------------------------------------------

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <SettingsProvider defaultSettings={defaultSettings}>
                    <LocalizationProvider>
                        <ThemeProvider
                            themeOverrides={themeOverrides}
                            modeStorageKey={themeConfig.modeStorageKey}
                            defaultMode={themeConfig.defaultMode === 'system' ? 'light' : themeConfig.defaultMode}
                        >
                            <MotionLazy>
                                <Snackbar />
                                <SettingsDrawer defaultSettings={defaultSettings} />
                                <App {...props} />
                            </MotionLazy>
                        </ThemeProvider>
                    </LocalizationProvider>
                </SettingsProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
