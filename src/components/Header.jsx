import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import { MotionConfig, motion } from 'framer-motion'

export default function Header() {
  return (
    <MotionConfig>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ backdropFilter: 'blur(6px)', borderBottom: '1px solid rgba(16,24,40,0.04)' }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
              >
                QuizLab
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* 👇 Works same as Get Started */}
              <Button
                component={RouterLink}
                to="/"
                state={{ openDifficulty: true }}   // flag for Home
                variant="contained"
                color="primary"
                size="small"
              >
                Take Quiz
              </Button>
            </motion.div>
          </Toolbar>
        </Container>
      </AppBar>
    </MotionConfig>
  )
}
