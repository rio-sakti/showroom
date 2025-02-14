import { create } from "zustand"; 
import { persist } from "zustand/middleware"; 

const useStore = create( 
    persist( (set) => ({ 
        dataTrx: [],
        upsertTrx: (val) => set({ dataTrx: val }), 
    }), 
    { 
       name: "dataTrx-storage", // Key di local storage 
    })
);

export default useStore;
