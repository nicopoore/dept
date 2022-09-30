import {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  ReactElement
} from "react";

interface ModeProviderValue {
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
}

export const ModeContext = createContext<ModeProviderValue | null>(null);

export const ModeProvider = ({ children }: { children: ReactElement }) => {
  const [showAll, setShowAll] = useState<boolean>(true);

  return (
    <ModeContext.Provider value={{ showAll, setShowAll }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
