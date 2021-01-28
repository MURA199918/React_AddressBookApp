import AxiosService from './AxioService';

const service = new AxiosService();
export default class AddressBookService {

    contactRegistration(requestData) {
        return service.Post('/create', requestData);
    }

    getAllContactData() {
        return service.Get('/');
    }

    deleteContactData(data) {
        return service.Delete('/delete/' + data);
    }

    updateContactData(id, requestData) {
        return service.Put('/update/' + id, requestData);
    }

    getContactById(id) {
        return service.Get('/get/' + id);
    }
}