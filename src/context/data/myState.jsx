import React, { useEffect } from 'react'
import MyContext from './myContext';
import { useState } from 'react';
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

function MyState(props) {
    const [mode, setMode] = useState('light')
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }

        )
    })

    const toggleMode = () => {
        if (mode == 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }


    // ********************** Add Product Section  **********************

    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error('Please fill all fields')
        }


        setLoading(true)
        try {
            const productRef = collection(fireDB, 'products')
            await addDoc(productRef, products)
            toast.success("Product added Successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProduct();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [product, setProduct] = useState([]);

    const getProduct = async () => {
        setLoading(true)

        try {
            const q = query(collection(fireDB, 'products'),
                orderBy("time")
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id })
                });
                setProduct(productArray)
                setLoading(false)
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct();
    }, [])



    const editHandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async (item) => {
        setLoading(true)

        try {
            await setDoc(doc(fireDB, "products", products.id), products)
            toast.success("Product Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProduct();
            setLoading(false)


        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    const deleteProduct = async (item) => {
        setLoading(true)

        try {
            await deleteDoc(doc(fireDB, 'products', item.id));
            toast.success('Product Deleted successfully')
            setLoading(false)
            getProduct()
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }
    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, 'orders'))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data())
                setLoading(false)
            });
            setOrder(ordersArray);
            setLoading(false)


        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }



    const [user, setuser] = useState([]);
    const getUserData = async () => {
        setLoading(true)

        try {
            const result = await getDocs(collection(fireDB, 'users'))
            const userArray = [];
            result.forEach((doc) => {
                userArray.push(doc.data());
                setLoading(false)
            });
            setuser(userArray)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    useEffect(() => {
        getOrderData();
        getUserData();
    }, [])

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')


    return (
        <MyContext.Provider value={{ mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, editHandle, deleteProduct, updateProduct, order, user, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState