---
title: "Grokking System Design Part 4: Caching and Data Partitioning"
slug: "grokking-system-design-interview-part-4-caching-data-partitioning"
datePublished: "2026-03-20"
excerpt: "How caching improves resource utilization and how data partitioning enables horizontal scaling, plus the tradeoffs and constraints that come with each approach."
tags: ["system-design", "career", "learning"]
---

In [part three](/blog/grokking-system-design-interview-part-3-load-balancing), I covered load balancing and the nine algorithms that distribute traffic across servers.

This post covers two building blocks that work together with load balancing: caching and data partitioning. Caching helps you get more value from existing resources. Data partitioning lets you scale databases horizontally when a single machine is not enough.

## Caching: Making Better Use of What You Have

A cache is a high-speed storage layer that sits between your application and the original data source. When data is requested, the cache is checked first. If the data is there, it is returned immediately. If not, it is fetched from the source, stored in the cache for future use, and then returned.

This takes advantage of the locality of reference principle: recently requested data is likely to be requested again.

Caching can be implemented at multiple layers:

- **In-memory caching**: Fastest access, limited by available RAM. Used for API responses, session data, and page fragments.
- **Disk caching**: Slower than memory but faster than remote sources. Useful for data too large for memory or that needs to persist across restarts.
- **Database caching**: Stores frequently accessed data in the database itself, reducing external storage access.
- **Client-side caching**: Browser or mobile app caching of images, CSS, JavaScript files.
- **Server-side caching**: Full-page, fragment, or object caching on the server.
- **CDN caching**: Distributed network caching for static assets accessed globally.
- **DNS caching**: Stores DNS query results to reduce lookup time.

## Cache Invalidation: Keeping Data Fresh

Caching improves performance, but you must ensure cached data stays correct. Otherwise, users see stale information.

There are three main cache write strategies:

**Write-through**: Data is written to both cache and database simultaneously. Complete consistency, but higher write latency since every write happens twice.

**Write-around**: Data is written directly to permanent storage, bypassing the cache. Reduces cache pollution from writes that will not be re-read, but recent writes will cause cache misses.

**Write-back**: Data is written to cache only, with immediate confirmation to the client. Writes to permanent storage happen later. Low latency and high throughput, but risk of data loss if the cache fails before the write completes.

## Cache Invalidation Methods

When data changes, you need to invalidate the cache. Common methods:

- **Purge**: Immediately removes cached content for specific objects or URLs.
- **Refresh**: Fetches latest content from origin server and updates the cache.
- **Ban**: Invalidates cached content matching specific criteria like URL patterns or headers.
- **TTL expiration**: Sets a time-to-live value. Cached content is considered stale after expiration.
- **Stale-while-revalidate**: Serves stale content immediately while updating the cache in the background.

## Cache Read Strategies

**Read-through**: The cache is responsible for retrieving data from the underlying store on a cache miss. The application requests data from the cache, and the cache handles misses automatically. This simplifies application code but requires the cache to know about the data store.

**Read-aside (cache-aside)**: The application checks the cache first. On a miss, the application retrieves data from the store, updates the cache, and uses the data. This gives the application more control and ensures cache failures do not take down the system, since the application can always go to the database directly.

## Cache Eviction Policies

When the cache is full, you need a policy to decide what to remove:

- **FIFO**: Evicts the first block accessed first.
- **LIFO**: Evicts the most recently accessed block first.
- **LRU**: Discards least recently used items first. Most common for general-purpose caching.
- **MRU**: Discards most recently used items first.
- **LFU**: Counts access frequency. Discards least frequently used items first.
- **Random Replacement**: Randomly selects and discards items.

## Data Partitioning: Dividing Large Databases

Data partitioning divides a large database into smaller, manageable parts called partitions or shards. Each partition is independent and contains a subset of the overall data.

Partitioning improves performance and scalability by distributing processing across multiple nodes, minimizing data transfer, and balancing workload.

## Partitioning Methods

**Horizontal partitioning (sharding)**: Divides a table into multiple partitions, with each partition containing a subset of rows. Each shard is typically assigned to a different database server.

For example, a social media platform might partition user data by geographic location. Users in the United States go to one shard, users in Europe to another.

The key problem: if the partitioning value is not chosen carefully, you get unbalanced servers. Partitioning by geographic location assumes even distribution across regions, which may not be true.

**Vertical partitioning**: Splits a table into multiple partitions, with each partition containing a subset of columns. Useful when certain columns are accessed more frequently than others.

For example, an e-commerce site might store customer personal information in one shard and order history in another. When accessing order history, only that shard needs to be queried.

**Hybrid partitioning**: Combines both horizontal and vertical partitioning. Partition horizontally first, then partition each shard vertically.

## Partitioning Criteria

**Key or hash-based**: Apply a hash function to a key attribute to determine the partition number. For example, with 100 database servers, use `ID % 100` to assign records. This ensures uniform allocation, but fixing the number of servers makes adding new servers difficult without redistributing data. Consistent hashing is a workaround.

**List partitioning**: Each partition is assigned a list of values. When inserting a record, determine which partition contains the key and store it there. For example, users in Nordic countries (Iceland, Norway, Sweden, Finland, Denmark) go to one partition.

**Round-robin**: Ensures uniform distribution. With n partitions, the i-th tuple goes to partition `i mod n`.

**Composite partitioning**: Combines multiple schemes. For example, apply list partitioning first, then hash-based partitioning within each list.

## Common Problems with Data Partitioning

Partitioning introduces constraints and complexity:

**Joins and denormalization**: Joins that span multiple partitions are not performance efficient since data must be compiled from multiple servers. A common workaround is denormalization, storing redundant data so queries that previously required joins can run on a single table. This trades query performance for data consistency challenges.

**Referential integrity**: Enforcing foreign key constraints across partitions is extremely difficult. Most RDBMS do not support foreign keys across different database servers. Applications often must enforce referential integrity in application code and run regular SQL jobs to clean up dangling references.

**Rebalancing**: Changing the partitioning scheme requires moving existing data to new locations. Reasons for rebalancing include non-uniform data distribution or excessive load on a particular partition. Doing this without downtime is extremely difficult. Directory-based partitioning (using a lookup service) makes rebalancing more manageable but adds system complexity and creates a new single point of failure.

## Wrap Up

Caching and data partitioning are both about managing scale, but they address different constraints.

Caching improves resource utilization by storing frequently accessed data in faster storage layers. The main challenges are keeping cached data fresh and choosing the right invalidation strategy for your workload.

Data partitioning enables horizontal database scaling by dividing data across multiple machines. The main challenges are choosing a partitioning scheme that distributes data evenly, handling cross-partition operations, and rebalancing when the scheme needs to change.

Both techniques come with tradeoffs. Caching adds complexity around invalidation and consistency. Partitioning makes joins harder and referential integrity more difficult to enforce. Understanding these tradeoffs is what makes the difference between a design that works on paper and one that works in production.

Next up in the series: the next section of the course, which continues building the foundation for system design.
