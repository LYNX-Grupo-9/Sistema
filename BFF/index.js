import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import geminiRoute from './routes/gemini.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/gemini', geminiRoute);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`BFF rodando em http://localhost:${PORT}`);
});