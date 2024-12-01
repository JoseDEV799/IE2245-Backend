export const validateSchema = (schema) => async(req, res, next) => {
    try {
        if (req.params && req.params.id) {
            req.body.iduser = req.params.iduser
        }
        // console.log(req.body);
        await schema.parseAsync(req.body)
        next()
    } catch (error) {
        const formattedError = error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));
        return res.status(400).json({error: formattedError});
    }
}