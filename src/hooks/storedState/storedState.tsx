import { Dispatch, SetStateAction, useState } from "react";

export function useStoredState<T>(
  key: string,
  initialValue?: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const [state, setState] = useState<T>(
    JSON.parse(
      localStorage.getItem(key) ?? JSON.stringify(initialValue) ?? "{}"
    )
  );
  localStorage.setItem(key, JSON.stringify(state));
  function reset() {
    localStorage.removeItem(key);
    setState(
      JSON.parse(
        localStorage.getItem(key) ?? JSON.stringify(initialValue) ?? "{}"
      )
    );
  }
  return [state, setState, reset];
}
