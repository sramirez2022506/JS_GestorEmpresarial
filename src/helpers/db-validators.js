import Admin from '../Admin/admin.model.js';

export const validRole = async (role = '') => {
    const existentRol = await role.findOne({ role });

    if (!existentRol) {
        throw new Error(`The role ${role} does'nt exist in the database`);
    }
}

export const existentEmail = async (email = '') => {
    const existsEmail = new Admin.findOne({ email });

    if (existsEmail) {
        throw new Error(`The email ${email} is alredy register`);
    }
}

export const existentAdminById = async (id = '') => {
    const existsAdmin = await Admin.findById(id);

    if (!existsAdmin) {
        throw new Error(`The admin id ${id} does'nt exist`);
    }
}