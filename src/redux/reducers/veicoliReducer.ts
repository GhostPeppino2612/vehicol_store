import {VeicoliState} from "../../types/types";
import {Veicolo} from "../../DB";
import {Db} from "../../DB";
import {VeicoliActionTypes, SET_VEICOLI, SET_FILTERS} from "../actions/actions"

const initialState: VeicoliState = {
  veicoli: Db.veicoli,
  filteredVeicoli: [],
  filters: {}
};

export const veicoliReducer = (state = initialState, action: VeicoliActionTypes): VeicoliState => {
  switch (action.type) {
    case SET_VEICOLI:
      return {
        ...state,
        veicoli: action.payload,
        filteredVeicoli: filterVeicoli(action.payload, state.filters)
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
        filteredVeicoli: filterVeicoli(state.veicoli, action.payload)
      };
    default:
      return state;
  }
};

const filterVeicoli = (veicoli: Veicolo[], filters: VeicoliState["filters"]): Veicolo[] => {
  return veicoli.filter(veicolo => {
    if (filters.brand && !veicolo.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;
    if (filters.modello && !veicolo.modello.toLowerCase().includes(filters.modello.toLowerCase())) return false;
    if (filters.tipo && veicolo.tipo !== filters.tipo) return false;
    if (filters.annoMin && veicolo.anno < filters.annoMin) return false;
    if (filters.annoMax && veicolo.anno > filters.annoMax) return false;
    if (filters.kmMin && veicolo.kilometri < filters.kmMin) return false;
    if (filters.kmMax && veicolo.kilometri > filters.kmMax) return false;
    if (filters.alimentazione && veicolo.alimentazione !== filters.alimentazione) return false;
    if (filters.prezzoMin && veicolo.prezzo < filters.prezzoMin) return false;
    if (filters.prezzoMax && veicolo.prezzo > filters.prezzoMax) return false;
    return true;
  });
};
