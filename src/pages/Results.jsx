import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()
  if (!state) {
    navigate('/quiz')
    return null
  }

  const { questions, selected, score } = state

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Results</Typography>
        <Box>
          <Button variant="outlined" onClick={() => navigate('/quiz')}>
            Restart
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        You scored {score} / {questions.length}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <List>
        {questions.map((q, i) => {
          const picked = selected[i]
          const correct = q.answerIndex
          const isCorrect = picked === correct
          return (
            <ListItem key={q.id} sx={{ mb: 2, borderRadius: 2, bgcolor: isCorrect ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.04)' }}>
              <ListItemText
                primary={`${i + 1}. ${q.question}`}
                secondary={
                  <span>
                    <strong>Your answer:</strong> {picked !== null ? q.options[picked] : 'No answer'} <br />
                    <strong>Correct:</strong> {q.options[correct]}
                  </span>
                }
              />
            </ListItem>
          )
        })}
      </List>
    </Container>
  )
}
