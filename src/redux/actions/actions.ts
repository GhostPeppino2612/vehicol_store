import {VeicoliState} from "../../types/types";
import {Utente, Veicolo} from "../../DB";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_VEICOLI = "SET_VEICOLI";
export const SET_FILTERS = "SET_FILTERS";
export const UPDATE_VEICOLO = "UPDATE_VEICOLO";

export interface LoginAction {
  type: typeof LOGIN;
  payload: Utente;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface SetVeicoliAction {
  type: typeof SET_VEICOLI;
  payload: Veicolo[];
}

export interface SetFiltersAction {
  type: typeof SET_FILTERS;
  payload: VeicoliState["filters"];
}


export type AuthActionTypes = LoginAction | LogoutAction;
export type VeicoliActionTypes = SetVeicoliAction | SetFiltersAction;