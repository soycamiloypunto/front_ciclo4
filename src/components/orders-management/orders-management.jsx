import "../../static/css/order-management.css";
import { Container } from "react-bootstrap";
import Header from "../shared/header/header";
import { setTiTitleTo } from "../../static/js/helpers/utils";

const OrderManagement = () => {
    setTiTitleTo("OrderMangement");
    return (
        <>
            <Header />
            <Container></Container>
        </>
    );
}

export default OrderManagement;