import React, { useState, useEffect } from 'react';
import { ScoresList, Score } from '../styled/HighScores';

export default function HighScores() {
  // Use the fetch API to call getHighScores function
  // Display those scores
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch('/.netlify/functions/getHighScores');
        const scores = await res.json();
        setHighScores(scores);
      } catch (err) {
        console.log(err);
      }
    };
    loadHighScores();
  }, []);

  return (
    <div>
      <h1>HighScores</h1>
      <ScoresList>
        {highScores.map((score) => (
          <Score key={score.id}>
            {score.fields.Name} - {score.fields.Score}
          </Score>
        ))}
      </ScoresList>
    </div>
  );
}
