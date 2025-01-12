import { IAddBankAccount } from "src/domain/usecases/add-bank-account"
import { badRequest, noContent, serverError } from "../../helpers/http-helper"
import { IController } from "src/presentation/protocols/controller"
import { IHttpRequest, IHttpResponse } from "src/presentation/protocols/http"
import { IValidation } from "src/presentation/protocols/validation"

export class AddBankController implements IController {

    constructor(
        private readonly validation: IValidation,
        private readonly addBankAccount: IAddBankAccount
    ) { }

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) return badRequest(error)
            const { name, type, initialBalance } = httpRequest.body
            await this.addBankAccount.add({ name, type, initialBalance })
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}