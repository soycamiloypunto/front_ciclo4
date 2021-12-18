import "../../static/css/orders.css";
import { useEffect, useState } from "react";
import Header from "../shared/header/header";
import { setTiTitleTo } from "../../static/js/helpers/utils";
import { Button, Table } from "react-bootstrap";
import CustomToast from "../../../src/components/shared/toast/toast";
import Constants from "../../static/js/helpers/constants";
import MyModal from "../../../src/components/shared/modal/modal";
import { saveObj } from "../../../src/static/js/helpers/axios-functions";
import axios from "axios";

const Orders = () => {
    useEffect(() => {
        queryOrdersAndClothes();
    }, [])

    let [myOrders, setMyOrders] = useState([]);
    let [clothes, setClothes] = useState([]);
    let [clothesTable, setClothesTable] = useState([]);
    let [quantity, setQuantities] = useState({});
    let [user, setUser] = useState(Constants.DEFAULT_USER);
    // modal
    let [showForm, setShowForm] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [msgBtn, setmsgBtn] = useState("");
    // toast
    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    setTiTitleTo("Orders");

    const mostrarToast = (title, message, variant) => {
        setTitlet(title);
        setMessaget(message);
        setVariantt(variant);
        setShowt(true);
    }

    const openModal = () => {
        setShowForm(true);
        setModalTitle("Select Clothe")
        setmsgBtn("OK")
    }
    const showOrders = () => {
        console.log("SHOW ORDERS")
    }

    const selectClothe = (clothe) => {
        setShowForm(false);
        setClothesTable([...clothesTable, clothe]);
        let newClothes = clothes.filter(g => g !== clothe);
        setClothes(newClothes);
    }

    const queryOrdersAndClothes = () => {
        console.log("Id en LocalStorage")
        console.log(localStorage.getItem("id"))
        axios.get(`${Constants.URL_BASE_PROD}/order/salesman/${localStorage.getItem("id")}`)
            .then(response => {
                setMyOrders(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "Orders Not Found", Constants.TOAST_DANGER);
            })

        axios.get(`${Constants.URL_BASE_PROD}/clothe/all`)
            .then(response => {
                const clothesFilter = response.data;
                let availablesClothes = clothesFilter.filter(p => p.availability === true);
                setClothes(availablesClothes);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "Clothes not found", Constants.TOAST_DANGER);
            })

            axios.get(`${Constants.URL_BASE_DEV}/user/${localStorage.getItem("id")}`)
            .then(response => {
                console.log(response.data)
                setUser(response.data);
            })

            setClothesTable([]);
    }

    const save = () => {
        
        let order = { salesMan: user, quantities: quantity, registerDay: new Date(), status: Constants.ORDER_PENDING, products: {} };

        for (let i = 0; i < clothesTable.length; i++) {
            order.products[i + 1] = clothesTable[i];
        }

        console.log("order.quantities");
        console.log(order.quantities[1]);
        order.id=(Math.floor(Math.random()*1000)+1)       //generar numero aleatorio entero para la orden

        if (order.quantities[1] === undefined){
            mostrarToast("Error", "Debe especificar la cantidad a pedir", Constants.TOAST_DANGER);
        } else { 
            console.log("Order Total");
            console.log(order);
            saveObj(`${Constants.URL_BASE_DEV}/order/new`, order, mostrarToast, `Su pedido se ha registrado exitosamente`,setShowForm, queryOrdersAndClothes);
        }
    }
    
    const handleQuantityChange = (e) => {
        setQuantities({ ...quantity, [e.target.id]: e.target.value });
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row h-100">
                    <div className="m-3">
                        <Button variant="secondary" size="sm" onClick={() => showOrders()}>
                            My Orders
                        </Button>
                        <div className="text-center">
                            <h3><b><i>Orders</i></b></h3>
                            <Button variant="primary" onClick={() => openModal()}>
                                Add Clothe
                            </Button>
                            <hr />
                            <span>
                                {
                                    clothesTable.length > 0 ?
                                        <div>
                                            <Table variant="light" striped bordered hover responsive="md" size="sm" >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">reference</th>
                                                        <th scope="col">price</th>
                                                        <th scope="col">quantity</th>
                                                        <th scope="col">photography</th>
                                                        <th scope="col">add</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {clothesTable.map((clothe, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{clothe.reference}</td>
                                                                <td>{clothe.price}</td>
                                                                <td>{clothe.quantity}</td>
                                                                <td><img src={clothe.photography} alt={clothe.name} height="50" /> </td>
                                                                <td><input type="number" min={1} id={index + 1} max={clothe.quantity} onChange={handleQuantityChange} /></td>
                                                                {/* <td><button className="btn btn-outline-primary" onClick={() => addClothe(clothe)}>Select</button></td> */}
                                                            </tr>
                                                        );
                                                    })
                                                    }
                                                </tbody>
                                            </Table>
                                            <Button variant="primary" onClick={() => save()}>
                                                Generate Order
                                            </Button>
                                        </div> : null
                                }
                            </span>

                            <MyModal show={showForm} title={modalTitle} onClick={() => setShowForm(false)} onClose={() => setShowForm(false)} onSave={() => setShowForm(false)} message_btn={msgBtn}>
                                {
                                    clothes.length > 0 ?
                                        <div className="text-center">
                                            <Table variant="light" striped bordered hover responsive="md" size="sm" >
                                                <thead>
                                                    <tr>
                                                        <th scope="col">reference</th>
                                                        <th scope="col">price</th>
                                                        <th scope="col">quantity</th>
                                                        <th scope="col">photography</th>
                                                        <th scope="col">add</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {clothes.map((clothe, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{clothe.reference}</td>
                                                                <td>{clothe.price}</td>
                                                                <td>{clothe.quantity}</td>
                                                                <td><img src={clothe.photography} alt={clothe.name} height="50" /> </td>
                                                                <td><button className="btn btn-outline-primary" onClick={() => selectClothe(clothe)}>Select</button></td>
                                                            </tr>
                                                        );
                                                    })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                        : <small className="text-muted">No Clothes available</small>}
                            </MyModal>

                        </div >
                        <CustomToast show={showt} title={titlet} variant={variantt} message={messaget} onClose={() => setShowt(false)}></CustomToast>
                    </div >
                </div>
            </div>
        </div>
    );
}

export default Orders;