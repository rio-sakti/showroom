import { create } from "zustand"; 
import { persist } from "zustand/middleware"; 

const transaksiStore = create( 
    persist( (set) => ({ 
        dataTrx: [],
        upsertTrx: (val) => set({ dataTrx: val }), 
    }), 
    { 
       name: "dataTrx-storage", // Key di local storage 
    })
);

export default transaksiStore;
