import {Router} from 'express';
import {check} from 'express-validator';
import {validateFields} from '../middlewares/validate-fields.js';
import {validateJWT} from '../middlewares/validate-jwt.js';

import {
    companyPost,
    companyGet,
    companyPut,
    reportExcel
} from '../Company/company.controller.js'

const router = Router();

router.get("/", companyGet)

router.get("/report", reportExcel)

router.post("/new",
[
    validateJWT,
    check("nCompany", "The name of the company is obligatory"),
    check("tarjectory", "The trajectory is obligatory"),
    check("levelImpact", "The level impact is obligatory"),
    check("category", "The category is obligatory"),
    validateFields,
], companyPost);

router.put(
    "/:id",
    [
        validateJWT,
        check("nCompany", "The name of the company is obligatory"),
        check("tarjectory", "The trajectory is obligatory"),
        check("levelImpact", "The level impact is obligatory"),
        check("category", "The category is obligatory"),
        validateFields,
    ],
    companyPut
);

export default router;