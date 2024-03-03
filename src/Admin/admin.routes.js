import { Router } from "express";
import { check } from "express-validator";
import { createAdmin } from "./admin.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { existentAdminById, existentEmail } from "../helpers/db-validators.js";

const router = Router();

//router.get("/", getAdmin);

/*router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existentAdminById),
        validateFields,
    ], getAdminById);
*/
router.post(
    "/",
    [
        check("email", "The name is obligatory").not().isEmpty(),
        check("password", "The password most have 6 characters").isLength({
            min: 6,
        }),
        check("email", "This email is not valid").isEmail(),
        check("email").custom(existentEmail),
        check("role").custom(validRole),
        validateFields,
    ],
    createAdmin
);

/*router.put(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existentAdminById),
        validateFields,
    ],
    putAdmin
);

router.delete(
    "/:id",
    [
        validateJWT,
        haveRol("Admin_role", "Client_role"),
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existentAdminById),
        validateFields,
    ],
    deleteAdmin
);
*/
export default router;