import React,{useState, useEffect} from 'react'
import {server} from '../../server.js'
import { useParams } from "react-router-dom";
import axios from 'axios'

const SellerActivationPage = () => {

    const { activationToken } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activationToken) {
            const activationEmail = async () => {
                try {
                    const decodedToken = decodeURIComponent(activationToken);
                    const res = await axios.post(`${server}/shop/activation`, { activationToken: decodedToken })
                    console.log(res.message);

                } catch (error) {
                    console.log(error.message);
                    setError(true)


                }
            }
            activationEmail();

        }



    }, [])

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {error ? (
                <p>Your token is expired!</p>
            ) : (
                <p>Your account has been created suceessfully!</p>
            )}
        </div>

    )
}

export default SellerActivationPage;