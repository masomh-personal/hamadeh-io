---
title: "Timeouts, Rate Limits, and Circuit Breakers: Designing for Slow Failures"
slug: "timeouts-rate-limits-and-circuit-breakers"
excerpt: "Slow dependencies hurt more than dead ones. How timeouts, rate limits, and circuit breakers keep cascading failures from taking down the whole system."
tags: ["system-design", "backend", "api"]
---

In [Why System Architecture Matters More in the Age of AI](/blog/system-architecture-in-the-age-of-ai), I mentioned drawing failure boundaries before writing code. This post zooms into three of the most practical tools for holding those boundaries when production gets messy: timeouts, rate limits, and circuit breakers.

Here's a lesson most backend engineers learn the hard way at least once: a dependency that crashes immediately is annoying, but a dependency that gets _slow_ can take your whole system down with it.

## Slow Is Worse Than Down

Suppose your checkout service calls a shipping-rate API.

If that API dies and immediately returns a `503` in 10 milliseconds, your service catches the error, falls back to a flat shipping estimate, and moves on. The request finishes fast, and your server stays healthy.

Now suppose the shipping API doesn't crash. Instead, a database lock makes it hang for 30 seconds before responding.

Every incoming checkout request now sits open for 30 seconds waiting on a socket. Worker threads pile up. Connection pools max out. Memory climbs. Within a minute, requests that don't even _need_ shipping rates start timing out because your service has no capacity left to handle them.

One slow neighbor just turned into a full outage. Timeouts, rate limits, and circuit breakers exist to stop that chain reaction.

## Timeouts: Put a Clock on Every Network Call

Every outbound network call needs an explicit timeout. Relying on library defaults is a gamble, because plenty of HTTP clients default to "wait forever" or 60+ seconds.

A good timeout setup thinks about two separate clocks:

- **Connect timeout:** How long you'll wait to establish a TCP/TLS connection. This should be short (often 1 to 3 seconds). If you can't even open a socket quickly, waiting longer rarely helps.
- **Read / total request timeout:** How long you'll wait for the full response to come back. Set this based on the dependency's normal p99 latency plus a reasonable buffer, not a random guess.

You also have to watch your **timeout budget** across layers. If your API gateway times out at 5 seconds, giving an internal service call a 15-second timeout is pointless. The client already gave up, and your backend is now burning CPU on a response nobody will read.

And be careful with retries. Retrying a timed-out request immediately across thousands of users creates a retry storm that finishes off an already struggling service. If you retry at all, pair it with a strict retry budget, exponential backoff with jitter, and safe retry boundaries like the ones in [Idempotency Makes API Retries Safe](/blog/idempotency-makes-api-retries-safe).

## Rate Limits: Protect the Edges Before They Melt

Rate limiting caps how many requests a caller can make in a given window. People often think of it as a security feature against bots, and it is, but in day-to-day operations it's just as much about fairness and survival.

A buggy mobile client stuck in a tight retry loop, or one heavy tenant running a bulk import, can starve everyone else sharing the same backend. Rate limits put a ceiling on the blast radius.

Three common algorithms show up everywhere, each with a clear tradeoff:

- **Fixed window:** Count requests per minute (e.g., 100/min). Simple and cheap to store, but vulnerable to boundary bursts (100 requests at `12:00:59` and 100 more at `12:01:01` doubles your load in two seconds).
- **Sliding window:** Smooths out that boundary spike by tracking or weighting recent timestamps. More accurate, with slightly more memory or Redis work per key.
- **Token bucket:** Tokens refill at a steady rate up to a max bucket size. Each request spends a token. This is popular in real APIs because it allows short, legitimate bursts while still enforcing a steady long-term rate.

When you reject a request, return `429 Too Many Requests` with a `Retry-After` header so well-behaved clients know when to back off instead of hammering you again a millisecond later.

## Circuit Breakers: Stop Hitting a Service That's Already Down

Timeouts limit how long a _single_ request waits. They don't stop your service from sending 500 more requests a second into a dependency that is clearly failing.

That's the job of a circuit breaker. Borrowed straight from electrical panels, it watches the failure rate (or slow-call rate) of an outbound dependency and flips between three states:

- **Closed:** Normal operation. Requests flow through while the breaker tracks errors and timeouts.
- **Open:** Once failures cross a threshold (say, 50% of the last 20 calls), the breaker trips. New calls fail fast locally without even touching the network.
- **Half-open:** After a cooldown period, the breaker lets a small probe of requests through. If they succeed, it closes again. If they fail, it reopens and resets the timer.

Failing fast helps both sides. Your users get a fast fallback or an honest error in milliseconds instead of staring at a spinner. Meanwhile, the struggling downstream service actually gets room to recover instead of being buried under fresh traffic.

## Common Mistakes That Bite in Production

These patterns are simple on paper, and surprisingly easy to misconfigure:

- **Using the same timeout everywhere.** A background webhook worker and a user-facing search box have completely different latency budgets.
- **Retrying without jitter.** If 1,000 clients fail at the same second and all retry after exactly 2 seconds, you just scheduled a synchronized traffic spike.
- **Forgetting graceful degradation.** A circuit breaker is much more useful when opening it triggers a sensible fallback (cached data, hiding a non-critical widget, queuing work for later) instead of crashing the whole page.
- **Not observing trips and limits.** If a rate limit or circuit breaker fires silently, you won't notice until customers complain. Log state changes and expose metrics.

## Wrap Up

Reliable systems aren't systems whose dependencies never fail. They're systems that stay upright when dependencies get slow.

- Set explicit connect and total timeouts on every network call, and keep them aligned with your upstream deadline.
- Use rate limits (and `429` + `Retry-After`) to protect shared capacity from bursts, noisy neighbors, and buggy clients.
- Add circuit breakers on flaky or non-critical dependencies so you fail fast and give struggling services time to recover.
- Pair all three with sensible fallbacks and metrics so degradation is controlled and visible.
