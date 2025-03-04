import AxioService from "./AxioService";

const service = new AxioService();

export default class AddressBookServices {
    addressRegistration(requestData) {
        return service.Post('/create', requestData)
    }

    getAllAddressess() {
        return service.Get('/');
    }

    deleteAddress(data) {
        return service.Delete('/delete/' + data)
    }

    updateAddress(id, data) {
        return service.Put('/update/' + id, data);
    }

    getAddressById(id) {
        return service.Get('/get/' + id);
    }
}