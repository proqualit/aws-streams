import * as Ajv from 'ajv'

export interface ApplicationOptions {
  streamArn: string
}

export class AWSStreamsApplicationOptionsValidationError extends Error {
  private _errors: Array<Ajv.ErrorObject>
  constructor(errors: Array<Ajv.ErrorObject>) {
    super('An error occurred validating the application options.')
    this._errors = errors
    Object.setPrototypeOf(this, AWSStreamsApplicationOptionsValidationError.prototype)
  }
  get errors(): Array<Ajv.ErrorObject> {
    return this._errors
  }
}