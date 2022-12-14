import React, { useEffect, useState } from "react";
import "./ItemDetailContainer.css";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { collection, getDoc, getFirestore, doc } from "firebase/firestore";

export const ItemDetailContainer = () => {

    const [producto, setProducto] = useState([]);
    const [carga, setCarga] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const getProductos = async () => {
            const db = getFirestore();

            try {
                const docBuscar = doc(collection(db, "productos"), id);

                getDoc(docBuscar).then((prod) => {
                    setProducto({ id: prod.id, ...prod.data() });
                });

            } catch (error) {
                console.log(error);
            } finally {
                setCarga(false);
            }
        }
        getProductos();

    }, [id]);


    return (
        <div id="itemDetailContainer">
            {<>
                {carga ?
                    <h1>Cargando...</h1> : <ItemDetail producto={producto} />}
            </>}
        </div>
    )
}