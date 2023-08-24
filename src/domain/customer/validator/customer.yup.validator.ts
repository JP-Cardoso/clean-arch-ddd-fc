//Implementação concreta de um validador especifica para o customer
//Aqui estou gerando um acoplamento, mas é um acoplamento conhecido

import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from 'yup'

export default class CusotmerYupValidator implements ValidatorInterface<Customer> {

    validate(entity: Customer): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                })
                .validateSync(
                    {
                        id: entity.id,
                        name: entity.name
                    }, {
                    //espera todos os erros acontecerem
                    //para depois retornar todos
                    abortEarly: false
                }
                )
        } catch (errors) {
            const err = errors as yup.ValidationError;
            err.errors.forEach((error) => {
                entity.notification.addError({
                    context: "customer",
                    message: error
                })
            })
        }
    }
}