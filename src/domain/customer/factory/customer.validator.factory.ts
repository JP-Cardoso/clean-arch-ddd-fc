/**
 * Essa factory está responsável para retornar um validator 
 * 
 */
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CusotmerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {

    static create(): ValidatorInterface<Customer> {
        return new CusotmerYupValidator();
    }
}