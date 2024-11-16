import { TipoVeicolo, Alimentazione, Utente, Veicolo} from "../DB";  
  export interface AuthState {
    user: Utente | null;
    isAuthenticated: boolean;
  }
  
  export interface VeicoliState {
    veicoli: Veicolo[];
    filteredVeicoli: Veicolo[];
    filters: {
      brand?: string;
      modello?: string;
      tipo?: TipoVeicolo;
      annoMin?: number;
      annoMax?: number;
      kmMin?: number;
      kmMax?: number;
      alimentazione?: Alimentazione;
      prezzoMin?: number;
      prezzoMax?: number;
    };
  }
  
  export interface RootState {
    auth: AuthState;
    veicoli: VeicoliState;
  }
  
