import "../../static/css/admin-dashboard.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../shared/header/header";
import { setTiTitleTo } from "../../static/js/helpers/utils";

const AdminDashboard = () => {
    setTiTitleTo("Admin");
    return (
        <>
            <Header />
            <Container>
                <div className="row">
               
                    <div className="card">
                        <div className="container">
                            <h4><b>Clothes</b></h4>
                            <Link to='./clothes' className="card-box-footer">...More <i className="fa fa-arrow-circle-right"></i></Link>
                        </div>
                    </div> 

                    <div className="card">
                        <div className="container">
                            <h4><b>Edit and Create Users</b></h4>
                            <Link to='./users' className="card-box-footer">...More<i className="fa fa-arrow-circle-right"></i></Link>
                        </div>
                    </div> 

                    
                </div>
            </Container>
        </>
    );
}

export default AdminDashboard;