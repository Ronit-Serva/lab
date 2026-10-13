---
title: A proposed agent-payment architecture
summary: A conceptual workflow for spending authority, agreements, conditional settlement and disputes.
status: Concept
topics: [AI & Agents, Blockchain & Payments]
visibility: public
draft: false
order: 3
related:
  - collection: investigations
    id: agentic-payments-and-trust
    reason: This proposal is part of the wider investigation into payments, authority and delivery verification.
---
## The design problem

How could two agents agree on work and payment while making authority, acceptance criteria and responsibility explicit?

This page describes a **research concept**. It is not an implemented protocol or a deployed product.

## Components of the proposal

1. **Policy and authorization:** express budgets, scope, restrictions and approval thresholds.
2. **Identity and reputation:** consider counterparty history while accounting for manipulation and privacy.
3. **Negotiation:** agree on price, deliverables, deadlines, milestones and acceptance criteria.
4. **Settlement choice:** consider direct payment, scoped access, delayed settlement or escrow depending on risk.
5. **Escrow:** hold funds under explicit conditions where an escrow mechanism is appropriate.
6. **Evaluation:** assess delivery evidence through an agreed verifier or human review.
7. **Resolution:** accept, request correction, escalate a disagreement, or refund according to agreed rules.
8. **Feedback:** record outcomes without treating reputation as a complete solution to trust.

## Assumptions that need testing

The parties must agree on what constitutes delivery and who may evaluate it. Evaluators may be dishonest, mistaken or manipulated. Escrow does not remove those problems; it makes their handling part of the settlement design.

A risk-adaptive process could consider value, reversibility, subjectivity, urgency and history. No calibrated score or verified decision rule has been produced.

## What is still missing

There is no implementation evidence, security assessment, empirical evaluation or demonstrated transaction. The next step is to make the assumptions precise enough to test in a bounded prototype.
