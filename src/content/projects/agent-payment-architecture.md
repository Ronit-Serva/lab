---
title: A2A + x402 agentic payments
summary: A public learning reimplementation of a research framework for agent identity and micropayments, with a local paid service walkthrough.
status: Learning reimplementation
topics: [AI & Agents, Blockchain & Payments]
visibility: public
draft: false
featured: true
order: 1
stack: [TypeScript, Solidity, Hardhat, A2A, x402]
repoUrl: https://github.com/Ronit-Serva/A2A-x402-extension-reimp
related:
  - collection: articles
    id: blockchain-agentic-payment-system
    reason: My published article shares what I learned while researching blockchain and agentic payments.
  - collection: investigations
    id: agentic-payments-and-trust
    reason: The questions about authority, payment and delivery that motivated this implementation.
references:
  - title: "Vaziry, Rodriguez Garzon & Küpper — Towards Multi-Agent Economies (arXiv:2507.19550)"
    url: https://arxiv.org/abs/2507.19550
  - title: My public reimplementation and walkthrough
    url: https://github.com/Ronit-Serva/A2A-x402-extension-reimp
  - title: Implementation comparison with the paper
    url: https://github.com/Ronit-Serva/A2A-x402-extension-reimp/blob/main/PAPER_COMPARISON.md
---
## From reading to rebuilding

I wanted to understand how agents could identify each other and pay for a service. I researched the problem, published an article about what I learned, and reimplemented a proposed framework to work through the mechanics myself.

The starting point is [Towards Multi-Agent Economies](https://arxiv.org/abs/2507.19550), by Awid Vaziry, Sandro Rodriguez Garzon and Axel Küpper. Their architecture connects ledger-based AgentCards with A2A communication and x402 micropayments. **The framework is their research; this repository is my independent reimplementation for learning.**

## What I built

The public repository contains a local prototype with a client, an A2A statistics service, a separate payment facilitator and contracts running on Hardhat. A browser dashboard steps through the interaction and exposes the request, payment and result.

The implementation uses TypeScript and Solidity, the official A2A SDK, and x402. The [paper comparison](https://github.com/Ronit-Serva/A2A-x402-extension-reimp/blob/main/PAPER_COMPARISON.md) documents adaptations to newer SDKs and the use of a deterministic statistics service instead of an LLM service.

## Follow a paid request

1. The client reads an AgentCard from a known contract address.
2. An unpaid service request receives an x402 payment challenge.
3. The client signs a TestUSD transfer authorization and retries with payment.
4. A separate facilitator verifies and settles the payment on the local chain.
5. After settlement is confirmed, the service computes and returns the result.

The documented walkthrough charges 2 TestUSD for a statistics request. For `[2, 4, 6]`, it returns a mean of 4 alongside the count, sum, minimum and maximum. **TestUSD is a local test token with no dollar backing.**

## What I learned by implementing it

A signature authorizes spending; confirmed contract execution changes the balance. The facilitator can pay gas separately from the client's token payment. Settlement and successful service delivery also need separate handling: a service error after payment is recorded as paid but undelivered.

Those details made the original questions more concrete. An agent's published identity does not establish the truth of its capabilities, and a completed payment does not establish the quality of its work.

## Try it and inspect the work

The [GitHub repository](https://github.com/Ronit-Serva/A2A-x402-extension-reimp) includes setup instructions, a local dashboard walkthrough, reproduction commands and recorded checks. The README documents authorization, retries, interrupted requests and stale chain state. These are repository-documented checks; this portfolio does not claim an independent reproduction of them.

Read my [article on designing an agentic payment system with blockchain](https://medium.com/@ronitkumar.serva/how-can-blockchain-be-used-to-design-an-agentic-payment-system-7dffb772e146) for the research and learning that accompany the build.

## Current scope

This is a local learning prototype. It uses a known AgentCard address rather than an open discovery registry. It does not demonstrate a public payment network, service-quality guarantees, automatic refunds, escrow or a validated reputation system. The repository documents these boundaries alongside the implementation.
