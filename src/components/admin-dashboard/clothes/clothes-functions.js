import { isEmpty } from "../../../static/js/helpers/utils";
import Constant from "../../../static/js/helpers/constants";

const validateClotheForm = (clothe, msgToast) => {
    console.log(clothe)
    if (isEmpty(clothe.reference) 
        || isEmpty(clothe.category) 
        || isEmpty(clothe.size)
        || isEmpty(clothe.description) 
        || isEmpty(clothe.photography)
        || isEmpty(clothe.price) 
        || isEmpty(clothe.quantity)) {
        msgToast("Error", "All Required fields", Constant.TOAST_DANGER);
        return false;
    }

    if (clothe.price <= 0) {
        msgToast("Error", "Price > 0", Constant.TOAST_DANGER);
        return false;
    }

    if (clothe.quantity <= 0) {
        msgToast("Error", "Quantity > 0", Constant.TOAST_DANGER);
        return false;
    }

    if (!Constant.REGEX_URL.test(clothe.photography)) {
        msgToast("Error", "Photo URL Invalid", Constant.TOAST_DANGER);
        return false;
    }

    return true;
}

export { validateClotheForm };