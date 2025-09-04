import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CircularProgress,
  Box,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import questionsData from "../data/questions.json";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

// 🔔 tick sound for last 5s
const tickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4386");

export default function QuestionCard() {
  const navigate = useNavigate();
  const location = useLocation();

  const difficulty = location.state?.difficulty || "easy";

  // ✅ filter 10 questions by difficulty
  const questions = questionsData
    .filter((q) => q.difficulty === difficulty)
    .slice(0, 10);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [locked, setLocked] = useState(Array(questions.length).fill(false));
  const [skipped, setSkipped] = useState(Array(questions.length).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const q = questions[current];

  function handleSelect(index) {
    if (!locked[current]) {
      setSelected((s) => {
        const copy = [...s];
        copy[current] = index;
        return copy;
      });
    }
  }

  function lockAnswer(auto = false) {
    if (locked[current]) return;

    setLocked((l) => l.map((val, i) => (i === current ? true : val)));

    if (selected[current] === q.answerIndex) {
      setScore((s) => s + 1);
    }

    if (auto) {
      setTimeout(() => next(), 500);
    }
  }

  function next() {
    tickSound.pause();
    tickSound.currentTime = 0;

    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setTimeLeft(30);
    } else {
      finish();
    }
  }

  function prev() {
    tickSound.pause();
    tickSound.currentTime = 0;

    if (current > 0) {
      setCurrent((c) => c - 1);
      setTimeLeft(30);
    }
  }

  function finish() {
    tickSound.pause();
    tickSound.currentTime = 0;
    navigate("/results", { state: { score, questions, selected } });
  }

  // ⏱ Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      if (selected[current] !== null && !locked[current]) {
        lockAnswer(true);
      } else {
        setSkipped((s) => s.map((val, i) => (i === current ? true : val)));
        next();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft <= 5) {
      tickSound.play();
    }

    return () => {
      clearInterval(timer);
      tickSound.pause();
      tickSound.currentTime = 0;
    };
  }, [timeLeft, current]);

  // ✅ Progress calculation
  const attemptedCount = locked.filter(Boolean).length + skipped.filter(Boolean).length;
  const progress = Math.round((attemptedCount / questions.length) * 100);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Progress: {attemptedCount} / {questions.length}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side - Question + Options */}
        <Grid item xs={12} md={8}>
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              {q.question}
            </Typography>

            <Grid container spacing={2}>
              {q.options.map((opt, idx) => {
                const isSelected = idx === selected[current];
                return (
                  <Grid item xs={12} key={idx}>
                    <Button
                      fullWidth
                      variant={isSelected ? "contained" : "outlined"}
                      color={isSelected ? "success" : "inherit"}
                      onClick={() => handleSelect(idx)}
                      disabled={locked[current]}
                      sx={{
                        justifyContent: "flex-start",
                        borderRadius: 2,
                        p: 2,
                        fontWeight: 600,
                      }}
                    >
                      {String.fromCharCode(65 + idx)}. {opt}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>

            {/* Navigation Buttons */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={prev}
                  disabled={current === 0}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Previous
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => lockAnswer()}
                  disabled={locked[current] || selected[current] === null}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Lock Answer
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={next}
                  disabled={current === questions.length - 1}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </motion.div>
        </Grid>

        {/* Right Side - Timer + Question List */}
        <Grid item xs={12} md={4}>
          {/* Timer */}
          <Card
            elevation={3}
            sx={{ borderRadius: 4, p: 3, textAlign: "center", mb: 3 }}
          >
            <div style={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={(timeLeft / 30) * 100}
                size={120}
                thickness={4}
                sx={{ color: "#4caf50" }}
              />
              <div
                style={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {timeLeft}s
              </div>
            </div>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Timer Remaining
            </Typography>
          </Card>

          {/* Question List */}
          <Card elevation={3} sx={{ borderRadius: 4, p: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Questions ({difficulty.toUpperCase()})
            </Typography>
            <Grid container spacing={2}>
              {Array.from({ length: questions.length }, (_, i) => {
                const isCurrent = i === current;
                const isLocked = locked[i];
                const isSkipped = skipped[i];
                return (
                  <Grid item key={i}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: isCurrent
                          ? "primary.main"
                          : isLocked
                          ? "success.light"
                          : isSkipped
                          ? "error.light"
                          : "white",
                        color: isCurrent
                          ? "white"
                          : isLocked
                          ? "success.dark"
                          : isSkipped
                          ? "error.main"
                          : "text.primary",
                        border: "1px solid",
                        borderColor: isCurrent
                          ? "primary.main"
                          : isLocked
                          ? "success.main"
                          : isSkipped
                          ? "error.main"
                          : "grey.300",
                        boxShadow: isCurrent
                          ? "0px 4px 12px rgba(103,58,183,0.3)"
                          : "none",
                        transition: "all 0.2s ease",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      {isLocked ? (
                        <CheckCircleIcon fontSize="small" />
                      ) : isSkipped ? (
                        <CloseIcon fontSize="small" />
                      ) : (
                        i + 1
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
