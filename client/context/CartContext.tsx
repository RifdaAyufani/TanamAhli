import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  suitability?: string;
  quantity: number;
  checked: boolean;
  section: "ready" | "saved";
}

interface CartContextType {
  readyItems: CartItem[];
  savedItems: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "checked" | "section">) => void;
  removeItem: (id: string, section: "ready" | "saved") => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleItemCheckbox: (id: string) => void;
  saveItemForLater: (id: string) => void;
  moveToCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [readyItems, setReadyItems] = useState<CartItem[]>([
    {
      id: "monstera",
      name: "Monstera Deliciosa",
      price: 150000,
      image:
        "https://images.pexels.com/photos/17925249/pexels-photo-17925249.jpeg",
      suitability: "Cocok untuk kamar remang",
      quantity: 1,
      checked: true,
      section: "ready",
    },
    {
      id: "spider-plant",
      name: "Spider Plant",
      price: 70000,
      image:
        "https://images.pexels.com/photos/3692746/pexels-photo-3692746.jpeg",
      suitability: "100% Aman untuk Peliharaan",
      quantity: 1,
      checked: true,
      section: "ready",
    },
  ]);

  const [savedItems, setSavedItems] = useState<CartItem[]>([
    {
      id: "cactus",
      name: "Kaktus Mini",
      price: 45000,
      image:
        "https://images.pexels.com/photos/3873389/pexels-photo-3873389.jpeg",
      suitability: "",
      quantity: 1,
      checked: false,
      section: "saved",
    },
  ]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity" | "checked" | "section">) => {
      setReadyItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id);

        if (existingItem) {
          // If item already exists, increase quantity
          toast.success(`${item.name} ditambahkan. Total: ${existingItem.quantity + 1}`, {
            description: "Item sudah ada di keranjang",
          });
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        } else {
          // Add new item to ready items
          const newItem: CartItem = {
            ...item,
            quantity: 1,
            checked: true,
            section: "ready",
          };
          toast.success(`${item.name} ditambahkan ke keranjang! 🌿`, {
            description: "Buka keranjang untuk melihat pesananmu",
          });
          return [...prevItems, newItem];
        }
      });
    },
    [],
  );

  const removeItem = useCallback(
    (id: string, section: "ready" | "saved") => {
      if (section === "ready") {
        setReadyItems((prevItems) =>
          prevItems.filter((item) => item.id !== id),
        );
      } else {
        setSavedItems((prevItems) =>
          prevItems.filter((item) => item.id !== id),
        );
      }
    },
    [],
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setReadyItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const toggleItemCheckbox = useCallback((id: string) => {
    setReadyItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }, []);

  const saveItemForLater = useCallback((id: string) => {
    setReadyItems((prevReadyItems) => {
      const item = prevReadyItems.find((item) => item.id === id);
      if (item) {
        const savedItem: CartItem = {
          ...item,
          checked: false,
          section: "saved",
        };
        setSavedItems((prevSavedItems) => [...prevSavedItems, savedItem]);
        return prevReadyItems.filter((item) => item.id !== id);
      }
      return prevReadyItems;
    });
  }, []);

  const moveToCart = useCallback((id: string) => {
    setSavedItems((prevSavedItems) => {
      const item = prevSavedItems.find((item) => item.id === id);
      if (item) {
        const readyItem: CartItem = {
          ...item,
          checked: true,
          section: "ready",
        };
        setReadyItems((prevReadyItems) => [...prevReadyItems, readyItem]);
        return prevSavedItems.filter((item) => item.id !== id);
      }
      return prevSavedItems;
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        readyItems,
        savedItems,
        addItem,
        removeItem,
        updateQuantity,
        toggleItemCheckbox,
        saveItemForLater,
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
