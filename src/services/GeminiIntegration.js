import React, { useState } from 'react';
import { VertexAI } from '@google-cloud/vertexai';

function GeminiIntegration() {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const vertexAI = new VertexAI({
    project: 'temis-hub', // Substitua pelo ID do seu projeto
    location: 'us-central1', // Substitua pela localização correta
  });

  const model = vertexAI.preview.generativeModel({
    model: 'gemini-pro',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedText('');

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const response = result.response;
      setGeneratedText(response.candidates[0]?.content?.parts[0]?.text || 'Nenhuma resposta gerada.');
    } catch (err) {
      console.error('Erro ao gerar texto:', err);
      setError('Erro ao gerar texto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Integração Direta com a API Gemini (Não Recomendado para Produção)</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            cols={50}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Gerando...' : 'Gerar Texto'}
        </button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {generatedText && (
        <div>
          <h2>Texto Gerado:</h2>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
}

export default GeminiIntegration;