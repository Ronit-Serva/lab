---
title: Reading handwritten characters
summary: A ResNet + EMNIST recognition pipeline, with an emphasis on reproducible training and meaningful evaluation.
status: In development
topics: [Machine Learning]
visibility: private
draft: true
featured: false
order: 2
stack: [ResNet, EMNIST ByClass, Google Colab]
related:
  - collection: investigations
    id: handwriting-generalization
    reason: The central question is whether the model works beyond familiar training conditions.
---
## The problem

Build a neural network that recognizes handwritten digits and alphabetic characters, then make its predictions inspectable through an image-upload interface.

## The planned technical approach

The pipeline specifies EMNIST ByClass, a ResNet-based classifier, image normalization, augmentation and regularization. Model configuration and code are intended to live locally; training and evaluation are intended to run on Google Colab GPUs.

The stack shown above describes the **specified approach**, not a verified completed implementation.

## Evaluation before demonstration

Planned artifacts include training curves, a confusion matrix, per-class accuracy, saved model weights and examples of failure cases. Those should tell a more useful story than a headline benchmark number alone.

## Current implementation status

The training and evaluation requirements are defined. Successful training, saved weights and working inference have not been established by the available material. There is no accuracy claim or prediction demo on this page.

## Next experiments

Test preprocessing choices, inspect frequently confused classes, and evaluate on unfamiliar handwriting. Add the experiment artifacts and a real upload demonstration when they are available.
