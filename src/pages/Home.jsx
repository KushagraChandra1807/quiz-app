import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import { motion } from "framer-motion";
import { Grid, Card } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import SpeedIcon from "@mui/icons-material/Speed";
import WhatshotIcon from "@mui/icons-material/Whatshot";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selecting, setSelecting] = useState(false);

  // 👇 Auto-open difficulty if redirected from "Take Quiz"
  useEffect(() => {
    if (location.state?.openDifficulty) {
      setSelecting(true);
    }
  }, [location.state]);

  const handleDifficultySelect = (level) => {
    // ✅ Pass difficulty to quiz page
    navigate("/quiz", { state: { difficulty: level } });
  };

  const difficulties = [
    {
      level: "easy",
      color: "#4caf50",
      icon: <EmojiObjectsIcon fontSize="large" sx={{ color: "#4caf50" }} />,
      description: "Best for beginners. Warm up your skills.",
    },
    {
      level: "medium",
      color: "#ff9800",
      icon: <SpeedIcon fontSize="large" sx={{ color: "#ff9800" }} />,
      description: "A balanced challenge for regular learners.",
    },
    {
      level: "hard",
      color: "#f44336",
      icon: <WhatshotIcon fontSize="large" sx={{ color: "#f44336" }} />,
      description: "For pros who love tough questions!",
    },
  ];

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <AnimatedBackground />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 800, mb: 2 }}
          >
            Think Fast - Learn Faster
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 600 }}
          >
            Designed for learners and competitors who love style and speed
          </Typography>

          {!selecting ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* 👇 Get Started = same as Take Quiz */}
              <Button
                variant="contained"
                size="large"
                onClick={() => setSelecting(true)}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() =>
                  window.scrollTo({ top: 700, behavior: "smooth" })
                }
              >
                Learn More
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3} sx={{ mt: 3 }}>
              {difficulties.map((opt) => (
                <Grid item xs={12} md={4} key={opt.level}>
                  <Card
                    component={motion.div}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      borderRadius: 4,
                      cursor: "pointer",
                      border: `2px solid ${opt.color}`,
                      bgcolor: "white",
                      color: "text.primary",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => handleDifficultySelect(opt.level)}
                  >
                    <Box sx={{ mb: 2 }}>{opt.icon}</Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: opt.color }}
                    >
                      {opt.level.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {opt.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
