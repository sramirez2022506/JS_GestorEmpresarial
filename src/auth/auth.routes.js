import {Router} from 'express';
import {check} from 'express-validator';

import {login} from './auth.controller.js';
import {validateFields} from '../middlewares/validate-fields.js';

const router = Router();

router.post(
    "/login",
    [
        check("email", "The email is obligatory").isEmail(),
        check("password", "the password is obligatory").not().isEmpty(),
        validateFields
    ],
    login
);

export default router