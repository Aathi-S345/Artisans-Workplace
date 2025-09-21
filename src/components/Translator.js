// components/Translator.js
import { useState } from 'react';

export default function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText) return; // Don't run if input is empty

    setIsLoading(true);
    setTranslatedText('');

    try {
      // Send the text to your Python Flask API
      const response = await fetch('/api/translate', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          from: 'en', // Or make these selectable
          to: 'de',
        }),
      });

      const data = await response.json();
      setTranslatedText(data.translated_text); // Set the translated text in our state
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedText('Failed to translate.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Translate Text</h2>
      <textarea
        rows="4"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
      />
      <br />
      <button onClick={handleTranslate} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
      <h3>Translation:</h3>
      <p>{translatedText}</p>
    </div>
  );
}