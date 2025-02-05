const JobCategory = require('../models/jobCategoriesModel');

// Get all job categories
exports.getAllJobCategories = async (req, res) => {
    try {
        const categories = await JobCategory.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching job categories:', error);
        res.status(500).json({ message: 'Error fetching job categories' });
    }
};

// Get job category by ID
exports.getJobCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await JobCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Job category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching job category:', error);
        res.status(500).json({ message: 'Error fetching job category' });
    }
};

// Create new job category
exports.createJobCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await JobCategory.create({ name });
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating job category:', error);
        res.status(500).json({ message: 'Error creating job category' });
    }
};

// Update a job category
exports.updateJobCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await JobCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Job category not found' });
        }

        category.name = name || category.name;

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        console.error('Error updating job category:', error);
        res.status(500).json({ message: 'Error updating job category' });
    }
};

// Delete a job category
exports.deleteJobCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await JobCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Job category not found' });
        }
        await category.destroy();
        res.status(200).json({ message: 'Job category deleted successfully' });
    } catch (error) {
        console.error('Error deleting job category:', error);
        res.status(500).json({ message: 'Error deleting job category' });
    }
};
