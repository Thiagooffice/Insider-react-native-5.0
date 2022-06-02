import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    SafeAreaView, 
    FlatList,
    
    } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import api from '../../services/api'

import CategoryItem from '../../components/CategoryItem'
import FavoritePosts from '../../components/FavoritePosts'
import {getFavorite, setFavorite} from '../../services/favorite'

export default function Home(){
    const navigation = useNavigation()
    const [categories, setCategories] = useState([])
    const [favCategory, setFavCategory] = useState([])

    useEffect(()=>{

        async function loadData(){
           
            const category = await api.get('api/categories?populate=icon')
            
            setCategories(category.data.data)

        }

        loadData()

    },[])

    useEffect(()=>{
        async function favorite(){

            const response = await getFavorite()
            setFavCategory(response)

        }

        favorite()
    },[])

    //favoritando uma categoria
    async function handleFavorite(id){
       const response = await setFavorite(id)

       setFavCategory(response)
       alert("Categoria favoritada")
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>DevBlog</Text>

                <TouchableOpacity onPress={()=> navigation.navigate("Search")}>
                    <Feather name="search" size={24} color='#fff' />
                </TouchableOpacity>
            </View>

            <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight:12}}
            horizontal={true}
            style={styles.categories}
            data={categories}
            keyExtractor={(item)=> String(item.id)}
            renderItem={ ({item})=> (
                <CategoryItem
                data={item}
                favorite={()=> handleFavorite(item.id)}
                />
            ) }
            />

            <View style={styles.main}>
                
                {favCategory.length !== 0 && (
                    <FlatList
                    style={{
                        marginTop: 50, 
                        minHeight: 100,
                        paddingStart: 18,

                    }}
                    contentContainerStyle={{paddingEnd: 18, }}
                    data={favCategory}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({item})=> <FavoritePosts data={item} />}
                    />
                )}

            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#232630'
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 18
    },
    name:{
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold'
    },
    categories:{
        maxHeight: 115,
        backgroundColor: '#efefef',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9
    },
    main:{
        backgroundColor: "#fff",
        flex: 1,
        marginTop: -30,
    }
})