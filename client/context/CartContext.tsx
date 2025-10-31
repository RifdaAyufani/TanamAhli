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

  const addItem = (
    item: Omit<CartItem, "quantity" | "checked" | "section">,
  ) => {
    const existingItem = readyItems.find((i) => i.id === item.id);

    if (existingItem) {
      // If item already exists, increase quantity
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      // Add new item to ready items
      const newItem: CartItem = {
        ...item,
        quantity: 1,
        checked: true,
        section: "ready",
      };
      setReadyItems([...readyItems, newItem]);
    }
  };

  const removeItem = (id: string, section: "ready" | "saved") => {
    if (section === "ready") {
      setReadyItems(readyItems.filter((item) => item.id !== id));
    } else {
      setSavedItems(savedItems.filter((item) => item.id !== id));
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setReadyItems(
      readyItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const toggleItemCheckbox = (id: string) => {
    setReadyItems(
      readyItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const saveItemForLater = (id: string) => {
    const item = readyItems.find((item) => item.id === id);
    if (item) {
      const savedItem: CartItem = {
        ...item,
        checked: false,
        section: "saved",
      };
      setSavedItems([...savedItems, savedItem]);
      removeItem(id, "ready");
    }
  };

  const moveToCart = (id: string) => {
    const item = savedItems.find((item) => item.id === id);
    if (item) {
      const readyItem: CartItem = {
        ...item,
        checked: true,
        section: "ready",
      };
      setReadyItems([...readyItems, readyItem]);
      removeItem(id, "saved");
    }
  };

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
