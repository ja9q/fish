import { InventoryProvider } from "./InventoryContext";

export function GameContext({ children }) {  
    return (
      <InventoryProvider>
          {children}
      </InventoryProvider>
    );
  }