"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function Tablecart({ id }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; // Exit early if id is not defined

        const fetchData = async () => {
            try {
                // Make a GET request using axios with the ID as a query parameter
                const response = await axios.get('http://localhost:4000/orderApi', {
                    params: { id }  // Include the ID in the query parameters
                });
                setData(response.data);  // Set the response data to state
            } catch (error) {
                setError(error); // Set the error if one occurs
            } finally {
                setLoading(false); // Set loading to false once the request is complete
            }
        };

        fetchData();
    }, [id]); // Dependency array ensures effect runs when `id` changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <h1 className="text-black">Table ID: {id}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}
        </>
    );
}
