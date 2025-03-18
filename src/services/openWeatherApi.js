import axios from "axios";
import { weatherApi } from "../App";
export const fetchCityWeather = async(city) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=metric`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city weather:", error);
        throw new Error(`Error fetching city weather: ${error.message}`);
    }
}