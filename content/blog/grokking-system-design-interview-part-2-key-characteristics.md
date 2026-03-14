---
title: "Grokking System Design Part 2: Key Characteristics of Distributed Systems"
slug: "grokking-system-design-interview-part-2-key-characteristics"
datePublished: "2026-03-14"
excerpt: "Breaking down the five core properties every distributed system is measured against: scalability, reliability, availability, efficiency, and manageability."
tags: ["system-design", "career", "learning"]
---

In [part one](/blog/grokking-system-design-interview-part-1-what-it-tests), I covered what the system design interview is really testing: judgment, communication, and reasoning under ambiguity.

This post is about the next section in *Grokking the System Design Interview*: Key Characteristics of Distributed Systems. Before you can design a system well, you need to know what properties to evaluate it against.

There are five: scalability, reliability, availability, efficiency, and manageability. These map closely to what other books call non-functional requirements or architectural characteristics. The label changes depending on the source, but the underlying concerns are the same.

These are not just interview vocabulary. They are the actual dimensions you weigh when making architectural decisions. Knowing them as a checklist is useful. Knowing how they interact is what actually helps.

## Scalability

Scalability is a system's ability to handle increased demand without losing performance.

The textbook split here is horizontal vs. vertical:

- **Vertical scaling** means adding more power to an existing server (more CPU, more RAM). It is simple but has a ceiling, and scaling up often requires downtime.
- **Horizontal scaling** means adding more machines. It is more complex to coordinate but has no hard upper limit.

Cassandra and MongoDB are commonly cited examples of systems designed to scale horizontally. MySQL is the go-to example for vertical scaling.

The important nuance the course calls out: not all workloads distribute evenly. Some tasks are inherently sequential or depend on shared state. A scalable architecture tries to minimize those bottlenecks so that adding more nodes actually helps.

In interviews, this is often where you get asked to make assumptions about traffic. Will reads dominate? Will writes? That distinction matters a lot for how you scale.

## Reliability

Reliability is whether the system keeps working correctly even when parts of it fail.

The key idea is redundancy. A reliable system eliminates single points of failure by replicating both data and services. If one server fails, another can take over without the user noticing.

The Amazon shopping cart example is a good one. If a user adds an item and the server carrying that request dies, a reliable system should have a replica that picks up where it left off. The user never sees the failure.

There is a related concept the course introduces here worth keeping straight: fault tolerance. The distinction is subtle but real:

- **Reliability** is about the system delivering correct results over time, from the user's perspective.
- **Fault tolerance** is about the system surviving internal component failures, from an operational perspective.

A reliable system needs to be fault tolerant. A fault tolerant system is not automatically reliable. You can recover from hardware failures quickly but still return stale or incorrect data.

## Availability

Availability is simpler to measure: it is the percentage of time the system is operational.

The relationship between reliability and availability is worth keeping clear:

- A reliable system is always available.
- A highly available system is not necessarily reliable.

You can hit 99.99% uptime with poor reliability by minimizing repair time and keeping spares ready. But availability without reliability will eventually catch up with you. The course uses the example of a system launched without security testing. It runs fine for two years, hits 99.99% availability, and then suffers a series of incidents that tank both numbers.

High availability is not a substitute for building correctly.

## Efficiency

Efficiency covers how well the system performs its work. Two metrics matter most:

- **Latency** (response time): how long it takes to get the first result
- **Throughput** (bandwidth): how much work the system completes per unit of time

These two are often in tension. Optimizing for throughput can increase latency. Optimizing for latency can limit throughput. Knowing which one matters more for a given use case is a real design decision.

The course is honest that modeling efficiency in a distributed system is hard. Network topology, message size, load variation, and hardware heterogeneity all affect actual performance. You work with estimates rather than exact figures.

In interviews, this usually shows up as: what would degrade under load? Where are the likely bottlenecks? Naming latency vs. throughput as distinct properties is a useful frame for answering those questions.

## Manageability

Manageability is how easy the system is to operate and maintain.

This one is easy to underweight when you are focused on the flashier parts of system design. But a system that is hard to debug, slow to update, or opaque when something goes wrong has a real operational cost.

The dimensions to think about:

- How quickly can you diagnose a failure?
- How easy is it to deploy changes safely?
- Does the system routinely run without needing constant intervention?

Early fault detection is called out specifically. Systems that can detect and report problems automatically reduce downtime because you find issues before users do.

In practice, this is often the difference between a system that works on day one and one that a team can maintain for years.

## How These Five Interact

What I found useful about this section is how these properties push against each other.

High reliability costs more because redundancy is not free. High availability sometimes means accepting eventual consistency. Optimizing for efficiency can reduce manageability if you are adding complexity to shave milliseconds. Horizontal scaling improves scalability but adds coordination overhead that affects all five dimensions.

No system scores perfectly across all five. The interesting work is deciding which ones matter most for the specific problem you are designing for, and being able to explain that reasoning.

## Wrap Up

The five characteristics are:

- **Scalability**: handle growing demand without degrading
- **Reliability**: keep delivering correct results when components fail
- **Availability**: stay operational as much of the time as possible
- **Efficiency**: minimize latency and maximize throughput
- **Manageability**: stay easy to operate, debug, and update

Going into a system design interview with these as an evaluation lens is more useful than memorizing a list of technologies. When you propose a component, you can ask: how does this affect each of these dimensions? That question alone will help you reason through tradeoffs more clearly.

Next up in the series: System Design Basics, which gets into the actual building blocks.
