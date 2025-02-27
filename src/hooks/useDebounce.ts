import { ChangeEvent, useCallback, useEffect, useState } from "react";

export const useDebounce = (delay: number, firstValue?: string, fn?: (v: string) => void) => {
    const [initialValue, setInitialValue] = useState<string>(firstValue || "");
    const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(initialValue.trim());
            fn?.(initialValue.trim())
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [initialValue, delay, fn]);
    
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value as string;
        setInitialValue(newValue);
    }, []);

    return { value: debouncedValue, onChangeHandler };
};