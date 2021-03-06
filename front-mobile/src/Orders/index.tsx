import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';

import Header from '../Header';
import OrderCard from '../OrderCard';

import { Order } from '../types';

export default function Orders() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    // change it state when out the page
    const isFocused = useIsFocused();

    const fetchData = () => {
        setIsLoading(true);
        fetchOrders()
            //change the state to the fetched orders
        .then(response => setOrders(response.data))
            // Error message
        .catch(error => Alert.alert("Houve um erro ao buscar pedidos"))
        .finally(() => setIsLoading(false));
    }

    // when the state changes, fetch data again
        // useful to update when order's status changes
    useEffect(()=>{
        if(isFocused)
            fetchData();
    }, [isFocused])

    // navigate to order's datail, passing the order
    const handleOnPress = (order: Order) => {
        navigation.navigate('OrderDetails',{
            order
        });
        
    }
    
    return (
        <>
            <Header/>
            <ScrollView style={styles.container}>
            {isLoading ? (
                <Text>Buscando pedidos...</Text> 
                ) : (
                orders.map(order =>
                    <TouchableWithoutFeedback 
                        key={order.id} 
                        onPress={() => handleOnPress(order)}
                    >
                        <OrderCard order={order}/>
                    </TouchableWithoutFeedback>
                )   )
            }
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({ 
    container:{
        paddingRight:'5%',
        paddingLeft:'5%',

    }
})
