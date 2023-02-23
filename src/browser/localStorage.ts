import { Repos } from "../types/types";

export const SetRepoToLocalStorage = (data: Repos[]) =>{
    localStorage.setItem('favorites', JSON.stringify(data))
}