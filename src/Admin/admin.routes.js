import { Router } from "express";
import { check } from "express-validator";
import {
    getAdmin,
    createAdmin,
    putAdmin,
    deleteAdmin
} from "./admin.controller.js";
import { fieldsValidator } from "../middlewares/validate-filds.js";

const router = Router();
router.get("/", getAdmin);

router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existAdminById),
    ])