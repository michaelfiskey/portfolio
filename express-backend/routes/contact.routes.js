import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

const contactRouter = Router();

const validateContactForm = [
    body('firstName')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('First name is required and must be less than 100 characters'),
    body('lastName')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Last name is required and must be less than 100 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('message')
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('Message is required and must be less than 500 characters'),
    body('phoneNumber')
        .optional()
        .isLength({min: 0, max:100})
        .withMessage('Please provide a valid phone number'),
    body('company')
        .optional()
        .trim()
        .isLength({ min: 0, max: 100 })
        .withMessage('Company name must be less than 100 characters')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

const createTransport = () => {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS 
        }
    });
};

contactRouter.post('/send-message', validateContactForm, handleValidationErrors, async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, company, message } = req.body;
        
        const transporter = createTransport();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact Submission: ${firstName} ${lastName}`,
            html: `
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phoneNumber ? `<p><strong>Phone:</strong> ${phoneNumber}</p>` : ''}
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        
        res.json({
            message: 'Email sent successfully!'
        });
        
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            error: 'Failed to send email. Please try again later.'
        });
    }
});

export default contactRouter;
