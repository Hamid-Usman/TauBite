import * as yup from 'yup'

export const productSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string(),
    tags: yup.array().of(yup.string()).required('At least one tag is required'),
    image: yup.mixed().required("Image is required"),
    price: yup.number().required('Price is required').positive('Price must be a positive')

})