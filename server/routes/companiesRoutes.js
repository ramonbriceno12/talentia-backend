const express = require('express');
const { 
    getAllCompanies, 
    getCompanyById, 
    createCompany, 
    updateCompany, 
    deleteCompany 
} = require('../controllers/companiesController');

const router = express.Router();

// Get all companies
router.get('/', getAllCompanies);

// Get company by ID
router.get('/:id', getCompanyById);

// Create a new company
router.post('/', createCompany);

// Update a company by ID
router.put('/:id', updateCompany);

// Delete a company by ID
router.delete('/:id', deleteCompany);

module.exports = router;
