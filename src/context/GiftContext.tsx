import React, { createContext, useState, useContext } from 'react';

interface Gift {
  id: string;
  name: string;
  price: string;
  recipient: string;
  image?: string;
  notes?: string;
}

interface GiftContextType {
  gifts: Gift[];
  addGift: (gift: Gift) => void;
  removeGift: (id: string) => void;
}

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gifts, setGifts] = useState<Gift[]>([]);

  const addGift = (gift: Gift) => {
    setGifts([...gifts, { ...gift, id: Date.now().toString() }]);
  };

  const removeGift = (id: string) => {
    setGifts(gifts.filter(gift => gift.id !== id));
  };

  return (
    <GiftContext.Provider value={{ gifts, addGift, removeGift }}>
      {children}
    </GiftContext.Provider>
  );
};

export const useGifts = () => {
  const context = useContext(GiftContext);
  if (context === undefined) {
    throw new Error('useGifts must be used within a GiftProvider');
  }
  return context;
};
