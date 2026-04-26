import express from 'express';
import cors from 'cors';
import fileroute from './routes/fileroute.js';

 const app= express();

 app.use(cors());
 app.use(express.json());
 app.use('/api/files', fileroute);

 export default app;