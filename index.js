import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CVC_WORDS = [
  "cat", "dog", "rat", "bat", "hat", "sun", "pen", "pig", "top", "mop",
  "mat", "bed", "hit", "hop", "mud", "pat", "ten", "sit", "pot", "run",
  "bag", "map", "net", "tap", "box", "jam", "fox", "log", "rug", "web","mug","jug","hand","leg","nose","hair","lamp","camp","run","fast","can","web","lid",
  "zip", "yak", "van", "jet", "wig", "lid", "rod", "bud", "chip", "frog",
  "glad", "snip", "trap", "crab", "black", "brick", "stump", "blend", "lamp", "sand",
  "clap", "tree", "drum", "brim", "snug", "slug", "trim", "grip", "brush", "crash",
  "smash", "flash", "cliff", "block", "stack", "crack", "flock", "slump", "trick", "brick",
  "brisk", "grasp", "crisp", "blimp", "stuck", "prick", "truck", "twist", "plant", "clamp",
  "brand", "grand", "stand", "flame", "frame", "chest", "crest", "spend", "trend", "blend",
  "frost", "thrust", "brunt", "grunt", "clump", "stump", "plump", "spout", "blip", "clap",
  "frog", "grap", "plan", "slip", "snap", "step", "trip", "flop","bird","third","shirt","twirl","first","Clever","Lemon","Tiger","Lion","monkey"
];

let usedWords = [];

const getRandomWord = () => {
  if (usedWords.length >= 100) {
    usedWords = [];
  }
  let availableWords = CVC_WORDS.filter(word => !usedWords.includes(word));
  let randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
  usedWords.push(randomWord);
  return randomWord;
};

const getShuffledLetters = (word) => {
  return word.split("").sort(() => Math.random() - 0.5);
};

export default function CVCSpellingGame() {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [shuffledLetters, setShuffledLetters] = useState(getShuffledLetters(currentWord));

  const handleLetterClick = (letter) => {
    setSelectedLetters([...selectedLetters, letter]);
  };

  const handleCheckAnswer = () => {
    if (selectedLetters.join("") === currentWord) {
      alert("Correct! 🎉");
      const newWord = getRandomWord();
      setCurrentWord(newWord);
      setSelectedLetters([]);
      setShuffledLetters(getShuffledLetters(newWord));
    } else {
      alert("Try again! ❌");
    }
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/jungle-theme.jpg')" }}>
      <Card className="p-6 text-center w-80 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-green-700">Spell the Word</h2>
        <Button onClick={speakWord} className="mb-4 bg-blue-500 text-white p-2 rounded-lg">
          🔊 Hear the Word
        </Button>
        <CardContent className="flex gap-2 justify-center mb-4">
          {selectedLetters.map((letter, index) => (
            <span key={index} className="text-xl font-bold bg-blue-200 p-2 rounded-lg">
              {letter}
            </span>
          ))}
        </CardContent>
        <div className="flex gap-2">
          {shuffledLetters.map((letter, index) => (
            <Button key={index} onClick={() => handleLetterClick(letter)} className="bg-yellow-500 text-white p-2 rounded-lg">
              {letter}
            </Button>
          ))}
        </div>
        <Button onClick={handleCheckAnswer} className="mt-4 bg-green-500 text-white p-2 rounded-lg">
          ✅ Check Answer
        </Button>
      </Card>
    </div>
  );
}
