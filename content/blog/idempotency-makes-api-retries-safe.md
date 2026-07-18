---
title: "Idempotency: The API Contract That Makes Retries Safe"
slug: "idempotency-makes-api-retries-safe"
datePublished: "2026-07-18"
excerpt: "Retries are unavoidable in distributed systems. Idempotent API design keeps those retries from creating duplicate payments, orders, and jobs."
tags: ["api", "backend", "system-design"]
---

A client sends a request to create an order. The server creates it, but the response disappears somewhere between the server and the client.

What should the client do?

It can retry, but the first request might have succeeded. Sending it again could create a second order. It can avoid retrying, but then a temporary network failure might leave the user thinking the order failed when it didn't. Neither option is particularly comforting.

This uncertainty is normal in distributed systems. Idempotency is how we design APIs to live with it.

## What Idempotency Actually Means

An operation is idempotent when performing it multiple times has the same intended effect as performing it once.

The phrase "intended effect" matters. An idempotent request may still produce a log entry, update a metric, or return a different response on the second attempt. What must not happen is an additional business effect.

Consider deleting a user:

```text
DELETE /users/123
```

The first request might return `204 No Content`. A retry might return `404 Not Found` because the user is already gone. The responses differ, but the final state is the same. User `123` does not exist.

Idempotency is also different from safety. In HTTP, a safe method such as `GET` is intended not to change server state. An idempotent method may change state, but repeating it should not change that state again.

HTTP defines `PUT`, `DELETE`, and safe methods as idempotent. `POST` is not idempotent by definition, which is awkward because `POST` often handles the operations we most need to protect: creating orders, charging cards, and scheduling jobs.

## Retries Are Not an Edge Case

Networks fail in frustratingly ambiguous ways. A connection can drop before the request reaches the server, while the server is processing it, or after the server commits the result but before the response reaches the client.

From the client's point of view, each case can look like the same timeout.

Retries also happen in more places than application code. An SDK may retry automatically. A message broker may redeliver a message. A user may double-click a button. A load balancer or background worker may repeat work after a timeout.

You can't remove every duplicate delivery from a distributed system. You can make duplicate delivery harmless.

## Give the Operation an Identity

For non-idempotent operations, a common solution is an idempotency key. The client generates a unique value for one logical operation and includes it with every attempt:

```http
POST /payments
Idempotency-Key: 9e7f2c9d-1c1e-4b74-94e8-53ac83f16d80
Content-Type: application/json

{
  "orderId": "order-123",
  "amount": 4999,
  "currency": "USD"
}
```

If the client times out, it retries with the same key. The server uses that key to recognize that both requests represent one payment attempt.

That last sentence contains the real contract. A new retry uses the same key. A genuinely new operation uses a new key. Reusing one key for unrelated work is a client bug.

Random UUIDs are a practical choice because collisions are extremely unlikely. Business identifiers can also work when they naturally identify one operation, but they need careful scoping. An order ID may identify one initial payment, but not necessarily a later retry, partial capture, or refund.

## What the Server Needs to Store

An idempotency table usually records more than the key:

```text
scope + key
request fingerprint
status
response status and body
created_at
```

The scope might include the authenticated account and API endpoint. Without it, two customers that happen to submit the same key could interfere with each other.

The request fingerprint represents the important request parameters. If a client sends the same key with a different amount or order ID, the server should reject it. Silently returning the old result would hide a serious mistake.

The status helps coordinate concurrent requests. A record might move from `processing` to `completed` or `failed`. Once completed, later requests can return the stored result instead of repeating the operation.

Providers choose different replay policies. Stripe's API v1, for example, stores the status code and body produced by the first request after endpoint execution begins, including a `500` response. That is one valid contract, but it is not the only one. Your API must document which outcomes are recorded, whether failures can be retried, and how long keys remain valid.

## The Check and the Write Must Be Atomic

A naive implementation does this:

1. Check whether the key exists.
2. If it doesn't, perform the operation.
3. Save the key and response.

Two identical requests can arrive at the same time. Both check before either saves the key, both see nothing, and both charge the customer. The code has an idempotency table but not idempotent behavior.

The server needs an atomic claim on the key. A database unique constraint on the scoped key is a strong starting point. The first request inserts the record and becomes responsible for the operation. A concurrent request loses that race and follows the existing record instead.

That still leaves a harder boundary: the business change and the idempotency record must stay consistent. If both live in one database, a transaction can commit them together. If the request calls an external payment provider or publishes a message, one local transaction cannot cover everything.

At that point, idempotency has to continue across boundaries. Pass an idempotency key to a downstream API when it supports one. Use an outbox for reliable event publication. Make message consumers idempotent too. One protected HTTP endpoint does not make the entire workflow duplicate-safe.

## Idempotency Is Not Exactly Once

It is tempting to describe an idempotent API as "exactly once." That promise is usually stronger than the system can honestly make.

The server may receive and execute request-handling code several times. Logs, traces, and validation may happen on every attempt. A worker can crash after committing a change but before acknowledging a message, which causes the message to be delivered again.

What idempotency gives us is one logical outcome despite repeated attempts. Internally, the system often combines at-least-once delivery with deduplication to make the business effect behave as though it happened once.

That wording may sound less magical, but it is much more useful when debugging production systems.

## A Practical API Checklist

When an operation creates an external or irreversible effect, I would ask:

- What identifies one logical operation?
- Who generates that identity, and when should it be reused?
- Is the key scoped to the caller and operation?
- Do we reject the same key with different request data?
- Can concurrent duplicates race past the initial check?
- Which responses do we store and replay?
- How long do we retain keys, and what happens after expiration?
- Can downstream calls, events, and consumers also tolerate duplicates?
- Are idempotency keys visible in logs and traces without containing sensitive data?

The storage policy deserves real thought. Keeping keys forever is rarely practical, but expiring them means an old retry can eventually run again. The retention period should be longer than the realistic retry and redelivery window for that operation.

## Wrap Up

Retries are one of the simplest ways to make a system more reliable. They are also one of the simplest ways to duplicate work.

Idempotency resolves that tension by giving repeated attempts one stable identity and one intended business effect. HTTP already gives some methods idempotent semantics. For operations such as `POST /payments`, an explicit idempotency-key contract fills the gap.

The header is the easy part. The real engineering lives behind it: scoped keys, request fingerprints, unique constraints, atomic state changes, clear replay rules, sensible expiration, and duplicate-safe downstream systems.

You cannot always know whether the first attempt ran. With a well-designed idempotent API, you do not need to know. You can retry safely and let the operation's identity preserve the outcome.

## Further Reading

- [RFC 9110, HTTP Semantics: Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.2)
- [Stripe API: Idempotent Requests](https://docs.stripe.com/api/idempotent_requests)
- [Amazon Builders' Library: Making Retries Safe with Idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)
