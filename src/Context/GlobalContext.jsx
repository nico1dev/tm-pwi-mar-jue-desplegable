import { createContext, useContext, useEffect, useState } from "react";
import { eliminarProductoPorId, obtenerProductos } from "../helpers/productos";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
    const [productos, setProductos] = useState(obtenerProductos()) 
    const [searchTerm, setSearchTerm] = useState('')
    const navigation = useNavigate()


    const handleChangeSearchTerm = ( e ) => {
        setSearchTerm(e.target.value)
    }

    useEffect (() => {
        const productList = obtenerProductos()
        if(searchTerm !=''){
            const newProductList = productList.filter(product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
            setProductos(newProductList)
        }
        else {
            setProductos(productList)
        }
    }, [searchTerm])


    useEffect(() => {
        console.log("se recargo el producto")
    },[productos])

    const handleDeleteProduct = (id) => {
        setProductos(eliminarProductoPorId(id))
        navigation('/')
    }

    const getUserData = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return user
       /*  if(user){
            return user
        }
        else{
            navigation('/login')
        } */
    }

    const logout = () => {
        localStorage.removeItem('user')
        navigation('/login')
    }

    const handleCreateProduct = (e) => {
        e.preventDefault()
        console.log("Producto creado")
    }

    return (
        <GlobalContext.Provider value={
                {
                    productos: productos,
                    handleDeleteProduct: handleDeleteProduct,
                    getUserData: getUserData,
                    logout: logout,
                    handleCreateProduct: handleCreateProduct,
                    handleChangeSearchTerm,
                    searchTerm
                    
                }
            }>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    /*Esto devolvera el objeto value proveido por el GlobalContext  */
    return useContext(GlobalContext)
}

/* 
const globalContextValues = useGlobalContext()
Retorna {nombre: nombre} 
*/