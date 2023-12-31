import React, { useState, useEffect } from "react";

const TripApi = () => {

    const [loadingTrip, setLoadingTrip] = useState(true);
    const [dataTrip, setDataTrip] = useState([]);

    const apiKey = 'GBlAR1kAdZLNcsEPOzvbb6chWCSSoyX2qORdP5ifIdceDVTo2crn)n0yJHoUqvj4V=2';

    useEffect(() => {
        fetch('https://tatapi.tourismthailand.org/tatapi/v5/routes', {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Accept-Language": "TH"
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setDataTrip(json);
                setLoadingTrip(false);
            })
            .catch((error) => console.error(error));
    }, []);

    return {
        dataTrip,
        loadingTrip,
    };

}

const PlaceApi = (searchPlace) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const apiKey = 'GBlAR1kAdZLNcsEPOzvbb6chWCSSoyX2qORdP5ifIdceDVTo2crn)n0yJHoUqvj4V=2';

    useEffect(() => {
        fetch('https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword=' + searchPlace, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Accept-Language": "TH"
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, [searchPlace]);

    return {
        data,
        loading,
    };
};

export {
    PlaceApi,
    TripApi
}