const formidable = require('formidable');

class FormHelper {

    async formParser(request) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.parse(request, (error, fields, files) => {
                if (error) {
                    return reject(error);
                }

                return resolve([fields, files]);
            })
        });
    }
}

module.exports = new FormHelper();
