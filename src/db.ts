import { Pool } from "pg";

const connectionString = 'postgres://xlrbledf:YqAJDkvjEOlV3y2yIhuy2givsXDUh8if@mel.db.elephantsql.com/xlrbledf';

const db = new Pool({connectionString});

export default db;