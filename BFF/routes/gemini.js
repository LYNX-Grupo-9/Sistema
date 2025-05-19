import express from 'express';
import pkg from '@google-cloud/vertexai';
import dotenv from 'dotenv';

// Destructure the required classes from the default import
const { VertexAI } = pkg;

// Load environment variables
dotenv.config();

const router = express.Router();

// Initialize VertexAI client
const vertexAI = new VertexAI({
  project: process.env.VITE_PROJECT_ID, // Use 'project' instead of 'projectId'
  location: process.env.VITE_REGION,
});

// Load the text generation model
const model = vertexAI.textGenerationModel('text-bison@001'); // Correct usage

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const [result] = await model.predict({
      instances: [{ content: prompt }],
    });
    const text = result?.predictions?.[0]?.content || '';
    res.json({ text });
  } catch (error) {
    console.error('Erro na geração:', error);
    res.status(500).json({ error: 'Erro ao gerar resposta do Gemini.' });
  }
});

export default router;