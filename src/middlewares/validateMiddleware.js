export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        return  res.json(error);
    }
}