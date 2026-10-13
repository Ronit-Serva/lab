---
title: Handwriting & generalization
question: How do we know a handwriting model really generalizes?
summary: Looking beyond a single accuracy number to the characters, conditions and failure cases a model struggles with.
status: Exploring
topics: [Machine Learning]
visibility: public
draft: false
featured: true
order: 2
openQuestions:
  - How does the model behave on handwriting outside its training distribution?
  - Which letters and digits are most often confused?
  - How do image quality and normalization affect predictions?
  - What does per-class evaluation reveal that aggregate accuracy hides?
related:
  - collection: projects
    id: handwriting-recognition
    reason: The planned recognition pipeline is where these evaluation questions can be tested.
references: []
---
## Why handwriting?

A handwritten character is a small input with a surprisingly difficult interpretation problem. Styles vary, letters resemble digits, and the conditions in a dataset may differ from those in a real uploaded image.

I'm interested in that gap: the distance between recognizing familiar benchmark samples and being useful on unfamiliar handwriting.

## My working approach

I've specified a ResNet-based pipeline using EMNIST ByClass, with normalization, augmentation and regularization. The intended workflow keeps source and configuration local while using Google Colab GPU resources for training and evaluation.

These are pipeline choices to investigate. They are not evidence of a successful trained model.

## What I want to measure

The evaluation plan includes loss and accuracy over training steps, a confusion matrix, per-class accuracy, and examples of both correct predictions and failures. I want to understand which errors are hidden by a single overall score.

## Where the work stands

The requirements and evaluation direction are defined. Training logs, model weights and measured results are not available on this site yet. A working inference demonstration will follow only when a trained model and real prediction pipeline are ready.
