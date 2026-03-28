---
title: "Indexes and Proxies: Two Quiet Building Blocks in System Design"
slug: "indexes-and-proxies-system-design"
datePublished: "2026-03-28"
excerpt: "Indexes speed up data access. Proxies shape how requests reach services. Together they show a common system design tradeoff: add a layer, reduce a more expensive cost."
tags: ["system-design", "learning", "backend"]
---

When I read about system design, I keep coming back to a pattern that shows up everywhere: add a small amount of structure in one place so the rest of the system has to do less work.

Indexes and proxies are good examples of that idea.

They solve different problems. An index helps a system find the right data faster. A proxy helps a system route traffic in a more controlled way. But both exist for the same reason: the direct path is often too expensive, too slow, or too messy once a system starts to grow.

## Indexes Reduce Search Cost

An index is a separate data structure that helps us locate data without scanning everything. The easiest way to think about it is a library catalog.

If a library only had shelves full of books and no catalog, finding a specific title or author would be painful. You would have to walk the shelves and inspect book after book until you found what you wanted. A catalog changes that. It gives you a smaller, organized structure that points you to the right place.

That is what a database index does. Instead of reading a whole table row by row, the system can use an index built on one or more columns to narrow the search quickly and jump closer to the data it needs.

This matters even more as systems scale. Once data gets large enough, a full scan becomes expensive. Once that data is spread across disks or machines, finding the right location becomes a system problem, not just a query problem. In that world, indexes stop feeling optional. They become part of how the system stays responsive.

## Indexes Shift Work to Writes

Indexes are not free.

Every insert, update, or delete now has extra work attached to it because the system is not only writing the data itself. It is also maintaining the index structures that make future reads faster.

That tradeoff is the important part. An index improves read performance by making writes more expensive. If a table is read constantly and updated less often, that trade can be worth it. If the workload is mostly writes and reads are rare, adding more indexes can make the system worse instead of better.

This is the part I like most about indexes as a design concept. They are a reminder that performance work is usually about moving cost around, not making cost disappear.

## Proxies Reduce Coordination Cost

A proxy sits between a client and a server and handles requests on someone else's behalf.

A forward proxy represents the client side. The client sends traffic to the proxy, and the proxy sends the request upstream. From the server's point of view, it is talking to the proxy, not directly to the original client.

A reverse proxy sits on the server side. The client sends a request to the proxy, and the proxy decides which backend server should handle it. From the client's point of view, the proxy looks like the server.

That difference is easy to remember:

- A forward proxy hides the client.
- A reverse proxy hides the server.

Just like indexes, proxies add a layer because the direct path stops being ideal. Direct client-to-server communication may work in a small setup, but larger systems often need a place to centralize control.

## Why Proxies Matter in Real Systems

Once a proxy sits in the middle, it can do useful system-wide work.

It can cache responses so the origin does not need to recompute or reread the same data every time. It can filter or log requests. It can rewrite headers, compress responses, terminate TLS, route traffic to different backends, or spread load across a fleet of servers.

One detail that stood out to me was collapsed forwarding. If many clients ask for the same data at the same time and that data is not already cached, a proxy can combine those requests into one upstream fetch and then share the result. That saves duplicate disk reads or duplicate backend work. It is a small idea, but it captures the value of intermediaries well: sometimes one well-placed layer can prevent a lot of wasted effort behind it.

## How Indexes and Proxies Fit Together

Indexes and proxies are different tools, but they pair well because they solve two sides of the same broader problem.

Indexes help the storage side of the system answer, "How do I find the right data quickly?"

Proxies help the network and service side answer, "How do I get this request to the right place efficiently and safely?"

In other words, one optimizes lookup and the other optimizes flow.

What ties them together is the tradeoff. Both add moving parts. Both increase operational complexity. Both need to be justified by real access patterns. But when the bottleneck is real, both are a practical way to replace expensive work with cheaper work.

That feels like a useful system design lesson in general. Good architecture often comes from placing the right layer in the right spot so downstream systems do less unnecessary work.

## Wrap Up

Indexes make reads cheaper by organizing how data is found. Proxies make request handling cheaper and more manageable by organizing how traffic flows.

Neither one exists just to make a diagram look more sophisticated. Both are responses to friction. Data is too expensive to scan. Traffic is too messy to route directly. So we add structure.

That is why these two concepts fit together so well. They are both simple on the surface, but they point to the same deeper idea: system design is often about introducing a carefully chosen layer so the path that matters most becomes faster, safer, and easier to operate.
