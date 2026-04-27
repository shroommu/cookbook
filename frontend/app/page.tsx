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

type RequiredField = "title" | "ingredients" | "directions";

const requiredFields: RequiredField[] = ["title", "ingredients", "directions"];

export default function Home() {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    subtitle: "",
    ingredients: "",
    directions: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<RequiredField, boolean>>({
    title: false,
    ingredients: false,
    directions: false,
  });
  const [submitError, setSubmitError] = useState(false);

  const validateForm = (data: RecipeFormData) => {
    const nextErrors = requiredFields.reduce(
      (acc, field) => {
        acc[field] = data[field].trim() === "";
        return acc;
      },
      {
        title: false,
        ingredients: false,
        directions: false,
      } as Record<RequiredField, boolean>,
    );

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const isFormValid = requiredFields.every(
    (field) => formData[field].trim() !== "",
  );

  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "subtitle" | "ingredients" | "directions" | "notes",
  ) => {
    const nextValue = e.target.value;

    setFormData({
      ...formData,
      [field]: nextValue,
    });

    if (field in errors) {
      setErrors({
        ...errors,
        [field]: nextValue.trim() === "",
      });
    }

    if (submitError) {
      const nextFormData = {
        ...formData,
        [field]: nextValue,
      };

      setSubmitError(
        requiredFields.some(
          (requiredField) => nextFormData[requiredField].trim() === "",
        ),
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      setSubmitError(true);
      return;
    }

    setSubmitError(false);

    console.log("Recipe Data:", formData);
    // Add your submission logic here
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 3 }}>
          Submit a Recipe
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
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
              error={errors.title}
              helperText={errors.title ? "Title is required" : " "}
              required
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
              error={errors.ingredients}
              helperText={errors.ingredients ? "Ingredients are required" : " "}
              multiline
              minRows={5}
              required
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
              error={errors.directions}
              helperText={errors.directions ? "Directions are required" : " "}
              multiline
              minRows={5}
              required
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
              sx={{ mr: 2 }}
            >
              Submit Recipe
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setFormData({
                  title: "",
                  subtitle: "",
                  ingredients: "",
                  directions: "",
                  notes: "",
                });
                setErrors({
                  title: false,
                  ingredients: false,
                  directions: false,
                });
                setSubmitError(false);
              }}
            >
              Reset
            </Button>
            {submitError ? (
              <Typography color="error" sx={{ mt: 2 }}>
                Title, ingredients, and directions are required before
                submitting.
              </Typography>
            ) : null}
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
