import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Admin from './admin.model';

export const getAdmin = async (req = request, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true };

    const [total, admins] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
    ]);

    res.status(200).json({
        total,
        admins,
    });
}

export const createAdmin = async (req, res) => {
    const { nAdmin, email, password, role } = req.body;
    const admin = new Admin({ nAdmin, email, password, role });

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);

    await admin.save();
    res.status(200).json({
        admin
    });
}

export const putAdmin = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    await Admin.findByIdAndUpdate(id, rest);

    const admin = await Admin.findOne({ _id: id });

    res.status(200).json({
        msg: 'Admin update completed',
        admin
    });
}

export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findByIdAndUpdate(id, { state: false });
    const authenticatedAdmin = req.admin;

    res.status(200).json({ msg: 'Admin user temporaly off', admin, authenticatedAdmin });
}