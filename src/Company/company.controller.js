import {response} from 'express';
import Company from './company.model.js';
import Excel from 'excel4node';

export const companyPost = async (req, res) =>{
    const {nCompany, trajectory, levelImpact, category, status} = req.body;
    const company = new Company({nCompany, trajectory, levelImpact, category, status});

    await company.save();

    res.status(200).json({
        company
    });
}

export const companyGet = async (req, res) =>{
    try{
        const query = {status: true};
        const categories = await Company.distinct('category', query);

        categories.sort();

        res.status(200).json({
            categories: categories
        });
    }catch(e){
        console.log(e);
        res.status(400).json({
            msg: "Listing error, please communicate with an admin"
        })
    }
}

export const companyPut = async (req, res = response) =>{
    try{
        const {id} = req.params;
        const {_id, ...resto} = req.body;

        await Company.findByIdAndUpdate(id, resto);

        const company = await Company.findOne({_id: id});

        res.status(200).json({
            msg: "The company has been updated",
            company
        });
    }catch(e) {
        console.log(e);
    }
}

export const reportExcel = async (req, res) =>{
    try{
        const query = {status: true};

        const companiesE = await Company.find(query);

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('CompaniesE');

        const headers = ['Name of the company', 'Trajectory', 'level impact', 'category'];
        headers.forEach((header, index) =>{
            worksheet.cell(1, index + 1).string(header);
        });

        companiesE.forEach((companiesE, index) =>{
            worksheet.cell(index + 2, 1).string(companiesE.nCompany);
            worksheet.cell(index + 2, 2).string(companiesE.trajectory);
            worksheet.cell(index + 2, 3).string(companiesE.levelImpact);
            worksheet.cell(index + 2, 4).string(companiesE.category);
        });

        const excelBuffer = await workbook.writeToBuffer();

        res.setHeader('content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-disposition', 'attachment; filename=report_companies.xlsx');

        res.send(excelBuffer);
    } catch(e){
        console.log(e);
        res.status(500).json({
            msg: "The excel has not been generated correctly, please communicate with an admin"
        });
    }
}