import resourcesToBackend from 'i18next-resources-to-backend';

// MUI Core Locales
import { esES as esESCore, frFR as frFRCore } from '@mui/material/locale';
// MUI Date Pickers Locales
import { enUS as enUSDate, esES as esESDate, frFR as frFRDate } from '@mui/x-date-pickers/locales';

// ----------------------------------------------------------------------

// Supported languages
export const supportedLngs = ['fr', 'en', 'es'];

// Fallback and default namespace
export const fallbackLng = 'fr';
export const defaultNS = 'common';

// Storage config
export const storageConfig = {
    cookie: { key: 'i18next', autoDetection: false },
    localStorage: { key: 'i18nextLng', autoDetection: false },
};

export const allLangs = [
    {
        value: 'fr',
        label: 'Français',
        countryCode: 'FR',
        adapterLocale: 'fr',
        numberFormat: { code: 'fr-FR', currency: 'EUR' },
        systemValue: {
            components: {
                ...frFRCore.components,
                ...frFRDate.components,
            },
        },
    },
    {
        value: 'en',
        label: 'English',
        countryCode: 'GB',
        adapterLocale: 'en',
        numberFormat: { code: 'en-US', currency: 'USD' },
        systemValue: {
            components: { ...enUSDate.components },
        },
    },
    {
        value: 'es',
        label: 'Español',
        countryCode: 'ES',
        adapterLocale: 'es',
        numberFormat: { code: 'es-ES', currency: 'EUR' },
        systemValue: {
            components: {
                ...esESCore.components,
                ...esESDate.components,
            },
        },
    },
];

// ----------------------------------------------------------------------

export const i18nResourceLoader = resourcesToBackend((lang, namespace) => import(`./langs/${lang}/${namespace}.json`));

export function i18nOptions(lang: string = fallbackLng, namespace: string = defaultNS) {
    return {
        // debug: true,
        supportedLngs,
        fallbackLng,
        lng: lang,
        /** ***** */
        fallbackNS: defaultNS,
        defaultNS,
        ns: namespace,
    };
}

export function getCurrentLang(lang: string) {
    const fallbackLang = allLangs.find((l) => l.value === fallbackLng) ?? allLangs[0];

    if (!lang) {
        return fallbackLang;
    }

    return allLangs.find((l) => l.value === lang) ?? fallbackLang;
}
