import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import Header from '../Header';
import OrderCard from '../OrderCard';

export default function Orders() {

    const handleOnPress = () => {
        
    }

    return (
        <>
            <Header/>
            <ScrollView style={styles.container}>
                <Text>Listagem de pedidos</Text>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </ScrollView>
        </>
    );
    }

const styles = StyleSheet.create({ 
    container:{
        paddingRight:'5%',
        paddingLeft:'5%',

    }
 });
