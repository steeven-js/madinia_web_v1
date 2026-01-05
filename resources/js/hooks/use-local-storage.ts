import { useMemo, useState, useEffect, useCallback } from 'react';

import { isEqual } from '@/utils/helper';
import { localStorageGetItem } from '@/utils/storage-available';

// ----------------------------------------------------------------------

export function useLocalStorage<T>(key: string, initialState: T) {
    const [state, set] = useState<T>(initialState);

    const multiValue = initialState && typeof initialState === 'object';

    const canReset = !isEqual(state, initialState);

    useEffect(() => {
        const restoredValue = getStorage(key);

        if (restoredValue) {
            if (multiValue) {
                set((prevValue) => ({ ...prevValue, ...restoredValue }) as T);
            } else {
                set(restoredValue);
            }
        }
    }, [key, multiValue]);

    const setState = useCallback(
        (updateState: Partial<T>) => {
            if (multiValue) {
                set((prevValue) => {
                    const newValue = { ...prevValue, ...updateState } as T;
                    setStorage(key, newValue);
                    return newValue;
                });
            } else {
                setStorage(key, updateState);
                set(updateState as T);
            }
        },
        [key, multiValue],
    );

    const setField = useCallback(
        (name: string, updateValue: unknown) => {
            if (multiValue) {
                setState({
                    [name]: updateValue,
                } as Partial<T>);
            }
        },
        [multiValue, setState],
    );

    const resetState = useCallback(() => {
        set(initialState);
        removeStorage(key);
    }, [initialState, key]);

    const memoizedValue = useMemo(
        () => ({
            state,
            setState,
            setField,
            resetState,
            canReset,
        }),
        [canReset, resetState, setField, setState, state],
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------

export function getStorage(key: string, defaultValue?: unknown) {
    try {
        const result = localStorageGetItem(key);

        if (result) {
            // Si la clé est i18nextLng, retourner directement la valeur
            if (key === 'i18nextLng') {
                return result;
            }
            // Sinon, essayer de parser JSON
            return JSON.parse(result);
        }
    } catch (error) {
        console.error('Error while getting from storage:', error);
        // Si JSON.parse échoue et c'est i18nextLng, retourner la valeur brute
        if (key === 'i18nextLng') {
            const result = localStorageGetItem(key);
            return result;
        }
    }

    return defaultValue || null;
}

// ----------------------------------------------------------------------

export function setStorage(key: string, value: unknown) {
    try {
        const serializedValue = JSON.stringify(value);
        window.localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Error while setting storage:', error);
    }
}

// ----------------------------------------------------------------------

export function removeStorage(key: string) {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error('Error while removing from storage:', error);
    }
}
