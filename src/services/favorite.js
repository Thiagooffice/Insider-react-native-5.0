import AsyncStorage from "@react-native-async-storage/async-storage";
import api from './api'

//buscar categoria favoritada
async function getFavorite(){
    const data = await AsyncStorage.getItem('@favCategory')

    if(data !== null){
        //achou uma categoria

        const response = await api.get(`api/categories/${data}?filds=name&populate=posts,posts.cover`)

    }else{
        return []
    }
}

//favoritar uma categoria
async function setFavorite(category){
    await AsyncStorage.setItem('@favCategory', String(category))
}