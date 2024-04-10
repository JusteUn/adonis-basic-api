import BadRequestException from '#exceptions/bad_request_exception'
import { errors, VineObject, VineValidator } from "@vinejs/vine";

export default function validator(validatorObject: VineValidator<VineObject<any, any, any>, any>) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const childFunction = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const { request } = args[0]
      const data = request.body()
      let validateData = {}
      try {
        validateData = await validatorObject.validate(data)
      } catch (err) {
        if (err instanceof errors.E_VALIDATION_ERROR) {
          throw new BadRequestException('Bad request')
        }
      }
      const newParam = validateData
      return childFunction.apply(this, [...args, newParam])
    }
    return descriptor
  }
}
