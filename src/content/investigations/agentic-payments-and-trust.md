---
title: Agentic payments & trust
question: How can AI agents transact without losing human control?
summary: Delegated authority, conditional payments, and the difficult question of who verifies delivery.
status: Researching
topics: [AI & Agents, Blockchain & Payments]
visibility: public
draft: false
featured: true
order: 1
openQuestions:
  - Who verifies that a service was delivered correctly?
  - What happens when the quality of a deliverable is subjective?
  - How do we handle dishonest evaluators or colluding counterparties?
  - Which parts actually benefit from a blockchain?
  - How can spending remain bounded, revocable and auditable?
  - How do agent economies remain steerable toward human goals?
related:
  - collection: projects
    id: agent-payment-architecture
    reason: The proposed architecture brings authorization, settlement and evaluation into one conceptual workflow.
  - collection: projects
    id: personal-finance-app
    reason: A shared thread—making financial systems useful while keeping people in control.
references:
  - title: AP2 — official protocol specification
    url: https://ap2-protocol.org/ap2/specification/
  - title: x402 — official project and documentation
    url: https://www.x402.org/
  - title: Ethereum — oracles and the limits of on-chain knowledge
    url: https://ethereum.org/en/developers/docs/oracles/
---
## Why this question matters

I'm interested in agents that can do more than answer questions: acquire a service, pay for a resource, or coordinate work. The question I keep coming back to is how to give an agent useful financial authority while keeping that authority constrained by its owner's intent.

Sending money is only one part of the problem. What was authorized? What did the other party promise? Who can decide whether that promise was fulfilled?

## What I've been investigating

My research spans payment authorization in card and UPI systems, delegated spending, tokenization, blockchain consensus, and smart-contract escrow. I've also been studying AP2 and x402 as approaches to agent-related payments. The official documentation is linked below; this hub records my research direction, rather than a full protocol comparison.

One distinction helps organize the investigation: **being able to pay, being authorized to pay, and deciding when to settle are different questions.**

## The verification boundary

A smart contract can enforce rules over information available to it. When the condition concerns something off-chain, it depends on an external source of evidence. Ethereum's [oracle documentation](https://ethereum.org/en/developers/docs/oracles/) describes this boundary.

Consider a shipment: funds could be released after a designated attestation says the goods were loaded. But the quality of that rule still depends on who produces the attestation, how it is verified, and what happens if it is wrong.

For subjective services, the difficulty grows. Agreement on an acceptance test, a trusted evaluator, or an appeal process becomes part of the design.

## My working approach

I'm exploring a multi-tier architecture: a policy engine for spending authority; identity and reputation signals; agreement on deliverables; a choice of settlement mechanism; and evaluation or dispute resolution when needed.

Transaction value, reversibility, subjectivity, urgency and counterparty history are candidate inputs for deciding how much oversight a transaction needs. **This is a design hypothesis, not a validated risk model.**

## What exists so far

The work consists of research and a proposed system design. There is no demonstrated deployed payment network, implemented escrow contract, or validated fraud-prevention result here. The connected architecture page makes the proposal's components and assumptions explicit.
