import { Router } from 'express';
import { pool } from '../database/railwaydb.js';
import multer from 'multer';
import path from 'path';
import { authenticateToken, requireRole } from './auth.routes.js';
import { fileURLToPath } from 'url';

const projectRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/assets/images/project-images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

projectRouter.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dev_and_data_projects');
        const projects = result.rows;
        
        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

projectRouter.get('/:project_id', async (req, res) => {
    try {
        const { project_id } = req.params;

        const result = await pool.query(
            'SELECT * FROM dev_and_data_projects WHERE project_id = $1', 
            [project_id]);
        
        if (result.rows.length === 0) {
            res.status(404).json({error: 'Project not found!'})
        }
        const project = result.rows[0];

        res.status(200).json(project);

    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

projectRouter.post('/add', authenticateToken, requireRole('owner'), upload.single('image'), async (req, res) => {
    try {
        const { project_title, project_description, 
                project_date, project_authors, project_path, 
                project_image_path
              } = req.body;

        const result = await pool.query(
            `INSERT INTO dev_and_data_projects (
                project_title, project_description, project_date, 
                project_authors, project_path, project_image_path
            ) VALUES (
                $1, $2, $3, $4, $5, $6
            ) RETURNING project_id, project_title, project_description, project_date, 
                project_authors, project_path, project_image_path, created_at`,
            [project_title, project_description, project_date, project_authors, project_path, project_image_path]
        );

        const project = result.rows[0];

        res.status(200).json({message: 'Project added successfully!', project: project})

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

projectRouter.put('/update', authenticateToken, requireRole('owner'), async (req, res) => {
    try {
        const { project_id } = req.body;
        
        const projectResult = await pool.query(
            `SELECT * FROM dev_and_data_projects WHERE project_id = $1`,
            [project_id]
        );

        if (projectResult.rows.length === 0) {
            res.status(404).json({error: 'Project does not exist!'})
        };

        const variables = [];
        const projectInfo = projectResult.rows[0];

            for (const item in req.body) {
                if (Array.isArray(req.body[item]) && Array.isArray(projectInfo[item])) {
                    if (JSON.stringify(req.body[item]) !== JSON.stringify(projectInfo[item])) {
                        variables.push(item);
                    };
                } else if (req.body[item] && req.body[item] !== projectInfo[item]) {
                    variables.push(item);
                };
            };
        
        if (variables.length === 0) {
            return res.status(204).end();
        };

        let variableString = variables.map((item, index) => `${item} = $${index + 1}`).join(', ');
        const variableValues = variables.map(item => req.body[item]);
        const query = `UPDATE dev_and_data_projects SET ${variableString} WHERE project_id = $${variables.length + 1}
                RETURNING project_id, project_title, project_description, project_date, 
                project_authors, project_path, project_image_path, created_at`;
        
        const result = await pool.query(
            query,
            [...variableValues, project_id]
        );

        const project = result.rows[0];

        res.status(200).json({message: 'Project updated successfully!', project: project});

    } catch(error) {
        res.status(500).json({ error: error.message });
    };
});

projectRouter.delete('/:project_id', authenticateToken, requireRole('owner'), async (req, res) => {
    try {
        const { project_id } = req.params;

        console.log(project_id);

        const deleteRequest = await pool.query(
            'DELETE FROM dev_and_data_projects WHERE project_id = $1 RETURNING project_id, project_title, project_description, project_date, project_authors, project_path, project_image_path, created_at',
            [project_id]
        );

        const project = deleteRequest.rows[0];

        res.status(200).json({message: 'Project deleted successfully!', project: project});


    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

export default projectRouter;