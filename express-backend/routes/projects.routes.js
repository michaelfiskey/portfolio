import { Router } from 'express';
import { pool } from '../database/railwaydb.js';

const projectRouter = Router();

projectRouter.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dev_and_data_projects');
        const projects = result.rows;
        
        res.json(projects);

    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});
export default projectRouter;