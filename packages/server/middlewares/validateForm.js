import { formSchema } from "@realtime-chatapp/common";

const validateForm = async (req, res, next) => {
    const formData = req.body;
    try {
        const valid = await formSchema.validate(formData)
        if (!valid) {
            console.log('form is not good')
            res.status(422).send()
        };
        return next()
    } catch (err) {
        console.log(err.errors)
        res.status(422).send()
    }
}

export default validateForm