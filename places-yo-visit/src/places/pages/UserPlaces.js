import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UserPlaces = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [placesByUser, setPlacesByUser] = useState([]);
    const userId = useParams().userId;
    console.log(userId);

    useEffect(() => {
        console.log(userId);
        const fetchPlacesByUser = async () => {
            try {
                let response = await sendRequest(
                    `http://localhost:5000/api/places/users/${userId}`
                );
                console.log("response from the http", response);
                setPlacesByUser(response.places);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlacesByUser();
    }, [userId, sendRequest]);

    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <ErrorModal error={error} onCLear={clearError} />
            {placesByUser && !isLoading && <PlaceList items={placesByUser} />}
        </React.Fragment>
    );
};

export default UserPlaces;
