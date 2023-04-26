import Api from "../utils/api_copy"
import { useLocalStorage } from "./useLocalStorage";

export const useApi = () => {
    const { readLS } = useLocalStorage()

    const config = {
        url: 'https://mariavaht.pythonanywhere.com/api',
        token: readLS("token")
    }

    return new Api(config);
}