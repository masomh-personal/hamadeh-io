---
title: "Grokking System Design Part 3: Load Balancing"
slug: "grokking-system-design-interview-part-3-load-balancing"
datePublished: "2026-03-18"
excerpt: "How load balancers work, where they sit in a distributed system, and the nine algorithms that determine how traffic gets distributed."
tags: ["system-design", "career", "learning"]
---

In [part two](/blog/grokking-system-design-interview-part-2-key-characteristics), I covered the five core properties that every distributed system is measured against: scalability, reliability, availability, efficiency, and manageability.

This post is about load balancing, one of the first concrete building blocks the course covers.

## What a Load Balancer Does

A load balancer sits between clients and servers. It accepts incoming traffic and distributes it across a pool of backend servers according to a chosen algorithm.

This gives you three things:

- No single server becomes a bottleneck. Traffic is spread, so individual machines stay within reasonable capacity.
- If a server goes down or starts returning errors at a high rate, the load balancer stops sending it traffic. Requests go elsewhere.
- You can add or remove servers without users noticing. The load balancer adjusts routing accordingly.

That last point is what makes horizontal scaling practical. Without a load balancer, distributing requests across a fleet of servers requires client-side knowledge of every server's address. A load balancer gives you a single stable entry point.

## Where Load Balancers Sit

A single load balancer is common, but most production architectures place them at multiple layers:

- Between the user and the web server
- Between web servers and an internal application or cache layer
- Between the application layer and the database

Each layer independently manages traffic and failure. A failure at one layer does not automatically cascade to the next.

## Redundant Load Balancers

The load balancer itself is a potential single point of failure.

The standard fix is to run two load balancers in a cluster. Each monitors the health of the other. If the active one fails, the passive one takes over automatically. This is sometimes called an active-passive or hot standby configuration.

The same logic that justifies load balancing backend servers justifies load balancing the load balancer.

## The Nine Load Balancing Algorithms

How a load balancer picks which server to send a request to is determined by its algorithm. Different algorithms make different tradeoffs between simplicity, load awareness, session consistency, and operational overhead.

### 1. Round Robin

Requests are distributed in order, one by one, across all available servers. Server A gets the first request, Server B gets the second, Server C gets the third, then back to Server A.

**Pros:**
- Simple to implement
- Equal distribution over time
- No state needed

**Cons:**
- No awareness of actual server load
- No session affinity. A user's next request may land on a different server.
- Works poorly when servers have different capacity or when requests have very different processing costs

**Best for:** Homogeneous server pools with short, uniform request durations.

---

### 2. Least Connections

Routes each new request to the server currently handling the fewest active connections.

Unlike Round Robin, this is load-aware. If one server has ten open connections and another has two, the next request goes to the one with two.

**Pros:**
- Adapts to real-time load
- Handles long-lived connections better than Round Robin

**Cons:**
- Requires the load balancer to maintain connection state for every server
- More overhead than Round Robin

**Compared to Round Robin:** Round Robin assumes all requests are equal. Least Connections accounts for the fact that some requests take much longer than others.

**Best for:** Workloads with variable request duration, such as database queries or file uploads.

---

### 3. Weighted Round Robin

Round Robin with a weight assigned to each server based on its capacity. A server with weight 3 gets three requests for every one that a server with weight 1 gets.

**Pros:**
- Simple extension of Round Robin
- Handles heterogeneous server pools where hardware specs differ

**Cons:**
- Weights are static and must be assigned manually
- Still no awareness of real-time load
- Getting the weights right requires good knowledge of each server's actual capacity

**Best for:** Mixed hardware environments where you know in advance which servers are more powerful.

---

### 4. Weighted Least Connections

Combines Weighted Round Robin and Least Connections. The load balancer considers both each server's current active connections and its assigned weight when choosing where to send the next request.

A server with more capacity and fewer connections wins.

**Pros:**
- Adapts to both real-time load and server capacity differences
- Better fit for heterogeneous fleets than either parent algorithm alone

**Cons:**
- Requires both state tracking (active connections) and manual weight configuration
- Most operationally complex of the connection-based algorithms

**Best for:** Heterogeneous fleets where request duration varies significantly.

---

### 5. IP Hash

The client's IP address is hashed to produce a value, which maps to a specific server. The same client IP always resolves to the same server as long as the server pool stays constant.

Example: client IP `192.168.1.10` hashes to value 2. With 3 servers, `2 % 3 = 2`, so it routes to Server C every time.

**Pros:**
- Provides session persistence without storing session state in the load balancer
- Useful when the application layer does not have a shared session store

**Cons:**
- Distribution is only as even as the IP address spread. If clients come from a narrow range of IPs (for example, all behind a corporate NAT), most traffic hits the same server.
- Adding or removing a server changes the hash mapping, potentially disrupting existing sessions

**Best for:** Applications that need sticky sessions but do not have a centralized session store.

---

### 6. Least Response Time

Routes each request to the server with the lowest current average response time.

This goes one step further than Least Connections. Rather than using active connections as a proxy for load, it directly monitors how fast each server is responding and uses that as the routing signal.

**Pros:**
- Best real-time picture of server performance
- Good for latency-sensitive applications

**Cons:**
- Requires continuous response time monitoring for all servers
- More infrastructure and measurement overhead than any of the previous algorithms

**Best for:** Latency-sensitive workloads where actual response time is a better signal than connection count.

---

### 7. Random

The load balancer picks a server at random for each request.

**Pros:**
- Extremely simple
- No state required
- Statistically even distribution over a large number of requests

**Cons:**
- No load awareness
- No session affinity
- Can produce uneven distribution in the short run

**Best for:** Simple deployments where homogeneous servers handle stateless requests, and even distribution is acceptable without guarantees.

---

### 8. Least Bandwidth

Routes each request to the server currently consuming the least bandwidth, measured in megabits per second.

**Pros:**
- Appropriate when bandwidth consumption varies significantly between requests
- Keeps high-bandwidth servers from getting overloaded

**Cons:**
- Requires continuous bandwidth monitoring for every server
- Adds measurement infrastructure overhead

**Best for:** High-bandwidth workloads like video streaming or CDN edge routing, where a request's network cost is a better signal than its connection count.

---

### 9. Custom Load

The load balancer is configured with custom routing logic based on application-specific metrics. Instead of using a generic signal like connection count or response time, you define which metrics matter and how they combine.

Custom signals might include CPU utilization, memory pressure, disk I/O, queue depth, or any application-level metric you can expose.

**Pros:**
- Most flexible of all the algorithms
- Can optimize for exactly the resource that matters for your workload

**Cons:**
- Most complex to configure and maintain
- Risk of misconfiguration if the chosen metrics do not actually reflect server load accurately
- Requires metric collection infrastructure and ongoing tuning

**Best for:** Specialized workloads with well-understood resource profiles where generic algorithms are a poor fit.

---

## Choosing an Algorithm

No single algorithm is best for every situation. A rough guide:

- **Uniform servers, short requests:** Round Robin
- **Uniform servers, variable request duration:** Least Connections
- **Mixed server capacity:** Weighted Round Robin or Weighted Least Connections
- **Session persistence needed:** IP Hash
- **Latency-sensitive:** Least Response Time
- **High-bandwidth media:** Least Bandwidth
- **Application-specific bottleneck:** Custom Load

In interviews, you rarely need to specify the algorithm unprompted. But if a question about session handling, latency, or uneven load comes up, knowing which algorithm addresses which concern is worth having ready.

## Wrap Up

Load balancers do more than spread traffic. They absorb failure, enable horizontal scaling, and give you a single stable entry point for a dynamic pool of servers.

The algorithm is one part of that picture. Placement across layers and redundancy of the load balancer itself matter just as much.

The nine algorithms range from simple and stateless (Round Robin, Random) to load-aware and complex (Weighted Least Connections, Least Response Time, Custom Load). Knowing when each one makes sense is more useful than memorizing the list.

Next up in the series: the next section of the course, which gets into caching.
