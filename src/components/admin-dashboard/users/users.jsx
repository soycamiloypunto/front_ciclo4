import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setTiTitleTo } from "../../../static/js/helpers/utils";
import CustomToast from "../../shared/toast/toast";
import Constants from "../../../static/js/helpers/constants";
import MyModal from "../../shared/modal/modal";
import { saveObj, updateObj, deleteObj } from "../../../static/js/helpers/axios-functions";
import axios from "axios";
import Moment from 'moment';
import Header from "../../shared/header/header";


const Users = () => {
    useEffect(() => {
        queryUsers();
    }, [])

    setTiTitleTo("Users");

    // users
    let [users, setUsers] = useState([]);
    let [user, setUser] = useState(Constants.DEFAULT_USER);

    // modal
    let [showForm, setShowForm] = useState(false);
    let [editForm, setEditForm] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [msgBtn, setmsgBtn] = useState("");
    // toast
    let [showt, setShowt] = useState(false);
    let [titlet, setTitlet] = useState("");
    let [messaget, setMessaget] = useState("");
    let [variantt, setVariantt] = useState("");

    const queryUsers = () => {
        axios.get(`${Constants.URL_BASE_PROD}/user/all`)
            .then(response => {
                setUsers(response.data);
            }).catch(error => {
                console.log(error.code);
                console.log(error.message);
                mostrarToast("Error", "users not found",Constants.TOAST_DANGER );
            })
    }

    const addUser = () => {
        setUser(Constants.DEFAULT_USER);
        setEditForm(false);
        setShowForm(true);
        setModalTitle("New User")
        setmsgBtn("Save")
    }

    const openEditModalForm = (user) => {
        setUser(user);
        setEditForm(true);
        setShowForm(true);
        setModalTitle("Edit User")
        setmsgBtn("Edit")
    }

    const deleteUser = (user) => {
        deleteObj(`${Constants.URL_BASE_PROD}/user/${user.id}`, mostrarToast, ` Deleted user "${user.name}"`, queryUsers);
    }

    const save = () => {

        if (editForm) {
            user.birthtDay = new Date(user.birthtDay);
            updateObj(
                `${Constants.URL_BASE_PROD}/user/update`, user, mostrarToast,
                `edited successfully `, setShowForm,
                queryUsers);
        } else {
            saveObj(
                `${Constants.URL_BASE_PROD}/user/new`, user, mostrarToast,
                `saved successfully  "${user.name}"`, setShowForm,
                queryUsers);
        }
    }

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    };


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
                    <h3><b><i>Users</i></b></h3>
                    <Button variant="primary" size="sm" onClick={() => addUser()}>
                        Add Users
                    </Button>
                    <hr />
                    {users.length > 0 ?
                        <Table variant="light" striped bordered hover responsive="md" size="sm" >
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>identification</th>
                                    <th>name</th>
                                    <th>email</th>
                                    <th>birthtDay</th>
                                    <th>address</th>
                                    <th>cellPhone</th>
                                    <th>type</th>
                                    <th>zone</th>
                                    <th colSpan={2}>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.identification}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{Moment(user.birthtDay).format("YYYY-MM-DD")}</td>
                                            <td>{user.address}</td>
                                            <td>{user.cellPhone}</td>
                                            <td>{user.type}</td>
                                            <td>{user.zone}</td>
                                            <td><Button variant="warning" onClick={() => openEditModalForm(user)}>Modify</Button></td>
                                            <td><Button variant="danger" onClick={() => deleteUser(user)}>Delete</Button></td>
                                        </tr>
                                    );
                                })
                                }
                            </tbody>
                        </Table> : null}
                    <MyModal show={showForm} title={modalTitle} onClick={() => setShowForm(false)} onClose={() => setShowForm(false)} onSave={() => save()} message_btn={msgBtn}>
                        <div className="row">
                            <div className="col-xs-12 col-lg-6">
                                <label>idID</label>
                                <input type="number" min="1" className="form-control" id="id" name="id"
                                    placeholder="ID" onChange={handleInputChange} value={user.id} disabled={editForm} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>identification</label>
                                <input type="number" className="form-control" id="identification" name="identification"
                                    placeholder="Identificacion" onChange={handleInputChange} value={user.identification} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>name</label>
                                <input type="text" min="1" className="form-control" id="name" name="name"
                                    placeholder="Nombre" onChange={handleInputChange} value={user.name} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>birthtDay</label>
                                <input type="date" className="form-control" value={user.birthtDay} onChange={handleInputChange} id="birthtDay" />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>address</label>
                                <input type="text" min="1" className="form-control" id="address" name="address"
                                    placeholder="Direccion" onChange={handleInputChange} value={user.address} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>cellPhone</label>
                                <input type="number" className="form-control" id="cellPhone" name="cellPhone"
                                    placeholder="Celular" onChange={handleInputChange} value={user.cellPhone} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>email</label>
                                <input type="text" min="1" className="form-control" id="email" name="email"
                                    placeholder="name@domain.com" onChange={handleInputChange} value={user.email} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                    placeholder="******" onChange={handleInputChange} value={user.password} />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>type</label>
                                <select value={user.type} onChange={handleInputChange} className="form-control" id="type">
                                    <option value="ADM">Admin</option>
                                    <option value="ASE">ASE</option>
                                    <option value="COORD">COORD</option>
                                </select>
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <label>zone</label>
                                <input type="text" className="form-control" id="zone" name="zone"
                                    placeholder="Zona" onChange={handleInputChange} value={user.zone} />
                            </div>
                        </div>
                    </MyModal>
                </div >
                <CustomToast show={showt} title={titlet} variant={variantt} message={messaget} onClose={() => setShowt(false)}></CustomToast>
            </div >
        </div>
    );
}
export default Users;