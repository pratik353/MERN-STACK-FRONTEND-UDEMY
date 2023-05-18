import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import useHttpClient from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/loading/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/loading/LoadingSpinner';

// const DUMMY_PLACES = [
//     {
//         id:'p1',
//         title:'Empire State Building',
//         description:'One of the most famouse sky scrapers in the world',
//         imageUrl:'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_334,q_75,w_579/https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg',
//         address:'Empire State Building 20 W 34th St., New York, NY 10001, United States',
//         location:{
//             lat:40.7484405,
//             lng:-73.9856644
//         },
//         creator:'u1'
//     },
//     {
//         id:'p2',
//         title:'Empi. State Building',
//         description:'One of the most famouse sky scrapers in the world',
//         imageUrl:'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_334,q_75,w_579/https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/GettyImages-486334510_CC36FC20-0DCE-7408-77C72CD93ED4A476-cc36f9e70fc9b45_cc36fc73-07dd-b6b3-09b619cd4694393e.jpg',
//         address:'Empire State Building 20 W 34th St., New York, NY 10001, United States',
//         location:{
//             lat:40.7484405,
//             lng:-73.9856644
//         },
//         creator:'u2'
//     }
// ]

const UserPlaces = () => {
    const userId = useParams().userId;
    const { error, isLoading, sendRequest, clearError} = useHttpClient();
    const [userPlaces, setUserPlaces] = useState([]);

    // const loadedPlaces = DUMMY_PLACES.filter( place => place.creator === userId);

    useEffect(()=>{
        const getUserPlaces = async () => {
            try {
                // const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
                setUserPlaces(responseData.places)
            } catch (error) {
                console.log(error);
            }
        };

        getUserPlaces();
    },[sendRequest, userId]);

    const placesDeletedHandler = ( deletedPlaceId ) => {
        setUserPlaces( prev => prev.filter( place => place.id !== deletedPlaceId));
    }
  return (
    <>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className='center'>
                <LoadingSpinner asOverlay/>
            </div>
        )}
        <PlaceList items={userPlaces} onDeletePlace={placesDeletedHandler}/>
    </>
  );
}

export default UserPlaces