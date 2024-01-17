import { InventoryProvider } from "./InventoryContext";
import { GDisplayProvider } from "./GameDisplayContext";

export function GameContext({ children }) {  
    return (
      <InventoryProvider>
        <GDisplayProvider>
          {children}
        </GDisplayProvider>
      </InventoryProvider>
    );
  }