"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

interface RecipeFormData {
  title: string;
  subtitle: string;
  ingredients: string;
  directions: string;
  notes: string;
}

export default function Home() {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    subtitle: "",
    ingredients: "",
    directions: "",
    notes: "",
  });

  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "subtitle" | "ingredients" | "directions" | "notes",
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recipe Data:", formData);
    // Add your submission logic here
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 3 }}>
          Submit a Recipe
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Title and Subtitle */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Recipe Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Marinara Sauce"
              value={formData.title}
              onChange={(e) => handleBasicChange(e, "title")}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Recipe Subtitle (Optional)
            </Typography>
            <TextField
              fullWidth
              placeholder="A delicious homemade version"
              value={formData.subtitle}
              onChange={(e) => handleBasicChange(e, "subtitle")}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Ingredients
            </Typography>
            <TextField
              fullWidth
              placeholder="Separate each ingredient with a new line"
              value={formData.ingredients}
              onChange={(e) => handleBasicChange(e, "ingredients")}
              multiline
              minRows={5}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Directions
            </Typography>
            <TextField
              fullWidth
              placeholder="Separate each step with a new line"
              value={formData.directions}
              onChange={(e) => handleBasicChange(e, "directions")}
              multiline
              minRows={5}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Notes
            </Typography>
            <TextField
              fullWidth
              value={formData.notes}
              onChange={(e) => handleBasicChange(e, "notes")}
              placeholder="Tips, variations, serving suggestions, etc."
              multiline
              minRows={3}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!formData.title}
              sx={{ mr: 2 }}
            >
              Submit Recipe
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setFormData({
                  title: "",
                  subtitle: "",
                  ingredients: "",
                  directions: "",
                  notes: "",
                })
              }
            >
              Reset
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
