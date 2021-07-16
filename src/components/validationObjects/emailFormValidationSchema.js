import * as Yup from 'yup'

const validationSchema = Yup.object({
    to: Yup.string().email('Invalid Email'),    
    from : Yup.string().required('Title is required.'),
    subject: Yup.string().required('Name with Initials is required.'),
    body : Yup.string()
})

export default validationSchema


