import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setTiTitleTo } from "../../../static/js/helpers/utils";
import CustomToast from "../../shared/toast/toast";
import Constants from "../../../static/js/helpers/constants";
import MyModal from "../../shared/modal/modal";
import { saveObj, updateObj, deleteObj } from "../../../static/js/helpers/axios-functions";
import axios from "axios";
import { validateClotheForm } from "./clothes-functions";
import Header from "../../shared/header/header";

const Clothes = () => {
    useEffect(() => {
        queryClothes();
    }, [])

    setTiTitleTo("Clothes");

    // clothes
    let [clothes, setClothes] = useState([]);
    let [clothe, setClothe] = useState(Constants.DEFAULT_PRODUCT);
    // modal
    let [showForm, setShowForm] = useState(false);
    let [editForm, setEditForm] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [msgBtn, setmsgBtn] = useState("");
    let [selectSiNo, setSelectSiNo] = useState(true);
    // toast
    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    const queryClothes = () => {
        axios.get(`${Constants.URL_BASE_PROD}/clothe/all`)
            .then(response => {
                setClothes(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                console.log(error.stack);
            })
    }

    const addClothe = () => {
        setClothe(Constants.DEFAULT_PRODUCT);
        setEditForm(false);
        setShowForm(true);
        setModalTitle("New Clothe")
        setmsgBtn("Save")
    }

    const openEditModalForm = (clothe) => {
        setSelectSiNo(clothe.availability);
        setClothe(clothe);
        setEditForm(true);
        setShowForm(true);
        setModalTitle("Edit Clothe")
        setmsgBtn("Modify")
    }

    const deleteClothe = (clothe) => {
        deleteObj(`${Constants.URL_BASE_PROD}/clothe/${clothe.reference}`, mostrarToast, `Clothe delete "${clothe.name}"`, queryClothes);
    }

    const save = () => {
        if (validateClotheForm(clothe, mostrarToast) === true) {
            if (editForm) {
                updateObj(
                    `${Constants.URL_BASE_PROD}/clothe/update`, clothe, mostrarToast,
                    `edited correctly `, setShowForm,
                    queryClothes);
            } else {
                saveObj(
                    `${Constants.URL_BASE_PROD}/clothe/new`, clothe, mostrarToast,
                    `saved correct  "${clothe.name}"`, setShowForm,
                    queryClothes);
            }
        }

    }

    const handleInputChange = (e) => {
        setSelectSiNo(e.currentTarget.value);
        setClothe({
            ...clothe,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    const mostrarToast = (title, message, variant) => {
        setTitlet(title);
        setMessaget(message);
        setVariantt(variant);
        setShowt(true);
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="text-center m-2">
                    <h2><b><i>Clothes</i></b></h2>
                    <Button variant="primary" size="sm" onClick={() => addClothe()}>
                        Add Clothe
                    </Button>
                </div>
                <hr />
                {clothes.length > 0 ?
                    <Table variant="light" className="text-center" striped bordered hover responsive="md" size="sm" >
                        <thead>
                            <tr>
                                <th>reference</th>
                                <th>category</th>
                                <th>size</th>
                                <th>description</th>
                                <th>availability</th>
                                <th>price</th>
                                <th>quantity</th>
                                <th>photography</th>
                                <th colSpan={2}>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clothes.map((clothe, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{clothe.reference}</td>
                                        <td>{clothe.category}</td>
                                        <td>{clothe.size}</td>
                                        <td>{clothe.description}</td>
                                        <td>{clothe.availability ? "YES" : "NOT"}</td>
                                        <td>{clothe.price}</td>
                                        <td>{clothe.quantity}</td>
                                        <td><img src={clothe.photography} alt={clothe.name} height={50} /></td>
                                        <td><Button variant="warning" onClick={() => openEditModalForm(clothe)}>Modify</Button></td>
                                        <td><Button variant="danger" onClick={() => deleteClothe(clothe)}>Delete</Button></td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </Table> : null}
                <MyModal show={showForm} title={modalTitle} onClick={() => setShowForm(false)} onClose={() => setShowForm(false)} onSave={() => save()} message_btn={msgBtn}>
                    <div className="row">
                        <div >
                            <label>reference</label>
                            <input type="text" className="form-control" id="reference"
                                placeholder="reference" onChange={handleInputChange} value={clothe.reference}  />
                        </div>
                        <div >
                            <label>category</label>
                            <input type="text" className="form-control" id="category"
                                placeholder="category" onChange={handleInputChange} value={clothe.category} />
                        </div>
                        <div >
                            <label>size</label>
                            <input type="text" className="form-control" id="size"
                                placeholder="size" onChange={handleInputChange} value={clothe.size} />
                        </div>
                        <div >
                            <label>description</label>
                            <textarea rows={3} className="form-control" id="description"
                                placeholder="Descripcion" onChange={handleInputChange} value={clothe.description}></textarea>
                        </div>
                        <div >
                            <label>availability</label>
                            <select value={selectSiNo} onChange={handleInputChange} className="form-control" id="availability">
                                <option value="true">YES</option>
                                <option value="false">NOT</option>
                            </select>
                        </div>
                        <div >
                            <label>price</label>
                            <input type="number" min="0" className="form-control" id="price"
                                placeholder="price" onChange={handleInputChange} value={clothe.price} />
                        </div>
                        <div>
                            <label>quantity</label>
                            <input type="number" min="0" className="form-control" id="quantity"
                                placeholder="quantity" onChange={handleInputChange} value={clothe.quantity} />
                        </div>
                        <div >
                            <label>photography</label>
                            <input type="text" className="form-control" id="photography"
                                placeholder="URL Photo" onChange={handleInputChange} value={clothe.photography} />
                        </div>
                    </div>
                </MyModal>
            </div>
            <CustomToast show={showt} title={titlet} variant={variantt} message={messaget} onClose={() => setShowt(false)}></CustomToast>
        </div>
    );
}
export default Clothes;