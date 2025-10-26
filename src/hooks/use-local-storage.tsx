import { useCallback, useEffect, useState } from "react";

/**
 * A hook to use local storage. It returns a tuple with the value and a function to update the value.
 *
 * @param key The key to store the value in local storage
 * @param initialValue The initial value to use if the key is not found in local storage
 * @returns A tuple with the value and a function to update the value
 */
export const useLocalStorage = (key: string, initialValue: number) => {
  const [value, setValue] = useState<number>(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(Number.parseInt(storedValue, 10));
      }
    }
  }, [key]);

  const updateValue = useCallback(
    (newValue: number) => {
      setValue(newValue);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, newValue.toString());
      }
    },
    [key]
  );

  return [value, updateValue] as const;
};
