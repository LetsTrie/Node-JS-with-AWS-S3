const joi = require("@hapi/joi");

module.exports.postValidation = (data) => {
    console.log("In Validation: =>", data);
    return joi.validate(data, {
        username: joi.string().min(5).required()
    })
}