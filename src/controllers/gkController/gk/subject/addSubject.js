const GkSubject = require('../../../../models/gkModels');

const addSubject = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate required field
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Subject name is required.'
            });
        }

        const subject = new GkSubject({
            name,
            description: description || '',
            headings: []
        });

        await subject.save();

        res.status(201).json({
            success: true,
            message: "Subject created successfully!",
            data: subject
        });
    } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating subject.',
            error: error.message
        });
    }
};

module.exports =  addSubject ;
