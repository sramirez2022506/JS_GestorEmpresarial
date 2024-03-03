import mongoose from "mongoose"

const companySchema = mongoose.Schema({
    nCompany:{
        type: String,
        required: [true, "The company name is obligatory"]
    },

    trajectory: {
        type: String,
        required: [true, "The trajectory is obligatory"]
    },

    levelImpact: {
        type: String,
        required: [true, "The impcat level is obligatory"]
    },

    category: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

companySchema.methods.joJson = function(){
    const {__v,_id,...company} = this.toObject();
    company.uid = _id;
    return company;
}

export default mongoose.model("company", companySchema);