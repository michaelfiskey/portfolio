CREATE TABLE IF NOT EXISTS dev_and_data_projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_title VARCHAR(200) NOT NULL,
    project_description VARCHAR(3000),
    project_date DATE,
    project_authors TEXT[],
    project_path VARCHAR(1000) NOT NULL,
    project_image_path VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);