const jwt = require("jsonwebtoken")

const key = process.env.ENCRYPTIONKEY

let UsersModel = postgresModel.users

exports.create_jwt_token = (payload) => {
	let expire = process.env.JWT_TOKEN_EXPIRATION + 'h'
	return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: expire });
};

exports.require_auth_encrypted = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
        let data
        try {
            data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch (error) {
            throw error
        }
        let userdata = await UsersModel.findOne({ where: { email: data.email}, raw: true })
        req.user = userdata;
        return next();
	} catch (error) {
		return next({
			type: `error`,
			content: error.message ? error : `Unauthorized`,
			status: 400
		})
	}
}