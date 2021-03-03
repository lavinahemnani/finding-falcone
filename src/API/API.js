/**
 * Author: Lavina Hemnani
 * Description: This class component is used to make API calls
 */
import { GET_PLANETS, GET_AUTH_TOKEN,GET_VEHICLES,FIND_FALCONE } from "./Common";
import httpService from "./Services/httpService";

/**
 * This class component is exported and used to make API calls
 */
export class API {

    /**
     * call to get planets
     */
    async getPlanets(){
        const {data} = await httpService.get(GET_PLANETS);
        return data;
    }
    /**
     * call to get vehicles
     */
    async getVehicles(){
        const {data} = await httpService.get(GET_VEHICLES);
        return data;
    }
    /**
     * call to get token
     */
    async getAuthToken(){
        const {data} = await httpService.post(GET_AUTH_TOKEN);
        return data;
    }

    /**
     * call to find falcone
     * @param {*} vehicle_names 
     * @param {*} planet_names 
     * @param {*} token 
     */
    async findFalcone(vehicle_names, planet_names,token){
        const {data} = await httpService.post(FIND_FALCONE,{
            token,vehicle_names,planet_names
        })
        return data;
    }
}