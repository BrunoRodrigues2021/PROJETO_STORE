const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../logger');

const _fileName = module.filename.split("/").pop();

class AuthService {
    async generateToken(userData) {
        logger.info(`${_fileName} : Generating JWT token : Eemail: ${userData.email}`);
        try {
            const privateKey = [
                '-----BEGIN RSA PRIVATE KEY-----',
                'MIICXAIBAAKBgHUhz6IgBez6bicIp/GSjzhTyUAFUUHzIYmM6gpH4QTJODsV7RnM',
                'Zu0JRq+LWzdjNUeHTErvnvMPI0RO8CoBtUScveduVenwmrZqVFp8J/DghuWm6ylJ',
                'i3EeRkjvZJOA3dFHFecJfwjPHjlDUKods9ifImK/MQ88iCn+lxxaLv/jAgMBAAEC',
                'gYBHEosAXtn5n0MzYCc3h6xrizt0I0XY9IQHCIACWPcKhmYeRAGoQ8S4U4aWgcKJ',
                'ayMrEceTOK6D4U2O5y8G7h5kfwWKdmJNZp8R5z5uB0H0x0EDEPvKdB3oobrDRcL5',
                'l6gZcQ9oU+em9yI2Py1MiPi7F3EM+BJ7BCJlR3CwM7AZsQJBALgSBfALYvWyQ16F',
                'daCZSLUsUAr1XeaqVj4LmakLjm0PdOBBKSw8zkOqPwI5MZdT+LxApk1c0o/8mKYe',
                '1ozz0f0CQQCi5265I6h2fsPwkyGk4DjKP+EB0vu1Oj+26o4axquTstopDL2IsZg4',
                'c34GM/CjFA0nn0iwM12hgH+uhAsCs09fAkEAiQxKRXaE4MAwLsEZWlCmdNYgZnhX',
                'yLVMbve+GcHT8lmOwKVjXV+Mh47LSQGCbdSEns1XxMP2tmPw18agIeQrlQJBAIlW',
                'vE5x9ZERBnhIUtECCF7axAQZsAP1+8lmri981yJKYwrApvobX84X8GOiXnneacjB',
                'zTJf28xQ3VRwFihMq9kCQCOu+AgRk/vw1fCgLuIoIJ1R+a2MRkxvS3JndP2BUDvc',
                '8i/BceATmB0U2hYHIxuG3Y26xJUBl5PdWOCyhh+t4M4=',
                '-----END RSA PRIVATE KEY-----',
            ].join('\n');

            const publicKey = [
            '-----BEGIN PUBLIC KEY-----',
            'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHUhz6IgBez6bicIp/GSjzhTyUAF',
            'UUHzIYmM6gpH4QTJODsV7RnMZu0JRq+LWzdjNUeHTErvnvMPI0RO8CoBtUScvedu',
            'VenwmrZqVFp8J/DghuWm6ylJi3EeRkjvZJOA3dFHFecJfwjPHjlDUKods9ifImK/',
            'MQ88iCn+lxxaLv/jAgMBAAE=',
            '-----END PUBLIC KEY-----',
            ].join('\n');

            const payloadToSign = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                language: userData.language,
                userIsActive: !!userData.userActive
            };

            const token =  await jwt.sign({userData: payloadToSign}, privateKey,
                {
                    algorithm: config.jwt.algorithm,
                    issuer: config.jwt.issuer,
                    audience: config.jwt.audience,
                    expiresIn: config.jwt.expirationTime
                }
            );
            logger.info(`${_fileName} : JWT token generated successfully : Eemail: ${userData.email}`);
            return token;
        } catch (error) {
            logger.error(`${_fileName} : Error generating JWT token : Eemail: ${userData.email} : Error :${error}`);
            return '';
        }
    }
}

module.exports = new AuthService();