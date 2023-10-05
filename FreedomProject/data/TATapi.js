import React, { useState, useEffect } from "react";

export const TATapi = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [serch, setSerch] = useState("");

    const apiKey = 'GBlAR1kAdZLNcsEPOzvbb6chWCSSoyX2qORdP5ifIdceDVTo2crn)n0yJHoUqvj4V=2';

    useEffect(() => {
        fetch('https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword=' + serch, {
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
    }, []);

    return {
        data,
        loading,
    };
};