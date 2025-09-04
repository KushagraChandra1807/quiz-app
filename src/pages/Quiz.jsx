import React, { useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import QuestionCard from "../components/QuestionCard";
import questionsData from "../data/questions.json";
import { useLocation, useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.difficulty || "easy";

  const questions = useMemo(() => {
    return questionsData.filter(
      (q) => q.difficulty?.toLowerCase() === difficulty.toLowerCase()
    );
  }, [difficulty]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [locked, setLocked] = useState(Array(questions.length).fill(false));
  const [score, setScore] = useState(0);

  if (questions.length === 0) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          No questions available for <b>{difficulty.toUpperCase()}</b> mode.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Container>
    );
  }

  const q = questions[current];

  function handleSelect(index) {
    setSelected((s) => {
      const copy = [...s];
      copy[current] = index;
      return copy;
    });
  }

  function lockAnswer() {
    if (locked[current]) return;

    setLocked((prev) => {
      const updated = [...prev];
      updated[current] = true;
      return updated;
    });

    if (selected[current] === q.answerIndex) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (!locked[current]) return;
    if (current < questions.length - 1) setCurrent((c) => c + 1);
    else finish();
  }

  function prev() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  function finish() {
    navigate("/results", { state: { score, questions, selected, difficulty } });
  }

  // ✅ Progress based on current question (whether attempted or not)
  const attemptedCount = locked.filter(Boolean).length;
  const progress = Math.round(((current + 1) / questions.length) * 100);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="h5">
          Quiz ({difficulty.toUpperCase()})
        </Typography>
        {/* <Typography variant="subtitle2" color="text.secondary">
          Score: {score} / {questions.length}
        </Typography> */}
      </Box>

      {/* Progress reflects current question */}
      {/* <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 8, borderRadius: 4, mb: 1 }}
      /> */}
      {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Question {current + 1} / {questions.length} • {attemptedCount} attempted
      </Typography> */}

      <Box sx={{ mt: 2 }}>
        <QuestionCard
          q={q}
          selectedIndex={selected[current]}
          onSelect={handleSelect}
        />
      </Box>

      {/* <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={prev} disabled={current === 0}>
          Previous
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={lockAnswer}
            disabled={selected[current] === null || locked[current]}
          >
            Lock Answer
          </Button>
          <Button
            variant="contained"
            onClick={next}
            disabled={!locked[current]}
          >
            {current < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </Box>
      </Box> */}
    </Container>
  );
}
