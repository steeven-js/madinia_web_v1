import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector/cjs';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { getStorage } from '@/hooks/use-local-storage';

import { fallbackLng, i18nOptions, storageConfig, i18nResourceLoader } from './locales-config';

// ----------------------------------------------------------------------

// Nettoyer et initialiser le localStorage avec la langue par défaut
const cleanupLanguageStorage = () => {
    const currentLang = localStorage.getItem(storageConfig.localStorage.key);

    // Si la langue stockée n'est pas valide ou absente, utiliser la langue par défaut
    if (!currentLang || !['fr', 'en', 'es'].includes(currentLang)) {
        localStorage.setItem(storageConfig.localStorage.key, fallbackLng);
    }
};

// Nettoyer au démarrage
cleanupLanguageStorage();

const i18nextLng = getStorage(storageConfig.localStorage.key, storageConfig.localStorage.autoDetection ? undefined : fallbackLng) || fallbackLng;

/**
 * Initialize i18next
 */
const initOptions = {
    ...i18nOptions(i18nextLng),
    detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: storageConfig.localStorage.key,
        checkWhitelist: true,
    },
};

i18next.use(LanguageDetector).use(initReactI18next).use(i18nResourceLoader).init(initOptions);

// ----------------------------------------------------------------------

type I18nProviderProps = {
    children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
    return <Provider i18n={i18next}>{children}</Provider>;
}
