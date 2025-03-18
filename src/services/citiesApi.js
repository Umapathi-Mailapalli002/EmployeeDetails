import axios from 'axios';

export const fetchCities = async () => {
    try {
        const response = await axios.get(
            'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=cou_name_en%3A%22India%22'
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching city names:", error);
        throw new Error(`Error fetching city names: ${error.message}`);
    }
};
