import {Router} from 'express';
import {check} from 'express-validator';
import {validateFields} from '../middlewares/validate-fields.js';
import {validateJWT} from '../middlewares/validate-jwt.js'