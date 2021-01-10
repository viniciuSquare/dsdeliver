
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import AsyncSelect from 'react-select/async'
import { fetchLocalMapBox } from '../api'
import { OrderLocationData } from './types'

const initialPosition = {
    lat: 51.505,
    lng: -0.09
}

type Place = {
    label?: string;
    //select value
    value?: string;
    position: {
        lat: number;
        lng: number;
    }
}

type Props = {
    onChangeLocation: (location: OrderLocationData) => void;

}


function OrderLocation({onChangeLocation}: Props){
    const[address, setAddress] = useState<Place>({
        position: initialPosition
    })

    //search addresses from MapBox then return the value to the callback
        //the callback put its params results into the selection opitions
    const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
        const response = await fetchLocalMapBox(inputValue);
    
        const places = response.data.features.map((item: any) => {
        return ({
            label: item.place_name,
            value: item.place_name,
            position: {
            lat: item.center[1],
            lng: item.center[0]
            },
            place: item.place_name,
        });
        });
    
        callback(places);
    };
    
    //when an address is seleted, it's shown in the map 
    const handleChangeSelect = (place: Place) => {
        setAddress(place);
        onChangeLocation({
            latitude: place.position.lat,
            longitude: place.position.lng,
            address: place.label!
        });
    };

    return(
        <div className="order-location-container">
            <div className="order-location-content">
                <h3 className="order-location-title" >
                    Selecione onde o pedido deve ser entregue:
                </h3>
                <div className="filter-container">
                    <AsyncSelect 
                        placeholder="Digite um endereço para entrega"
                        className="filter"
                        loadOptions={loadOptions}
                        onChange={ value => handleChangeSelect(value as Place)}
                    />
                </div>
                
                {/* Initial Map position, zoom level, zoom with wheel */}
                <MapContainer 
                    center={address.position} 
                    zoom={19} 
                    key={address.position.lat}
                    scrollWheelZoom={false}>

                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={address.position}>
                    
                    {/* Label on map marker */}
                    <Popup>
                        {address.label}
                    </Popup>
                    </Marker>
                </MapContainer>

            </div>
        </div>
    )
}

export default OrderLocation;