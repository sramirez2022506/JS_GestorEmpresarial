import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema({
    nAdmin: {
        type: String,
        required: [true, "The admin name is obligatory"]
    },
    email: {
        type: String,
        required: [true, "The Email is obligatory"]
    },
    password: {
        type: String,
        required: [true, "The password is obligatory"]
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin_role", "Client_role"]
    },
    state: {
        type: Boolean,
        default: true
    }
});

AdminSchema.methods.toJSON = function () {
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
};

export default mongoose.model('admin', AdminSchema);