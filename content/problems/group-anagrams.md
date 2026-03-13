---
title: "Group Anagrams"
slug: "group-anagrams"
source: "leetcode"
difficulty: "medium"
datePublished: "2026-03-13"
timeComplexity: "O(n * k log k)"
spaceComplexity: "O(n * k)"
excerpt: "Given an array of strings, group all anagrams together and return the groups in any order."
---

# Problem

Given an array of strings `strs`, group all anagrams together and return the groups in any order.

An anagram is a word formed by rearranging all letters of another word, using each letter exactly once.

## Constraints

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters only

## Examples

**Example 1:**
```
Input:  strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**Example 2:**
```
Input:  strs = [""]
Output: [[""]]
```

**Example 3:**
```
Input:  strs = ["a"]
Output: [["a"]]
```

## Approach

The core insight is that anagrams share the same characters in different orders. If you sort the characters of any anagram, you always get the same string. That sorted string becomes the grouping key.

For each word, sort its characters to produce a deterministic key, then use a hash map to collect all words that share the same key. At the end, return all the groups.

The sort approach has an O(k log k) cost per word where k is the word length. Given the constraint that `k <= 100`, that cost is bounded effectively to a constant. So in practice this scales cleanly with n.

## Implementation

```typescript
export function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const word of strs) {
        const key = word.split("").sort().join("");
        const group = groups.get(key) ?? [];
        group.push(word);
        groups.set(key, group);
    }

    return Array.from(groups.values());
}
```

## Alternative Approach: Frequency Array Key

Instead of sorting, you can build a 26-element array (one slot per lowercase letter), count character frequencies, then stringify the array as the key.

```typescript
export function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const word of strs) {
        const freq = new Array(26).fill(0);
        for (const char of word) {
            freq[char.charCodeAt(0) - 97]++;
        }
        const key = freq.join(",");
        const group = groups.get(key) ?? [];
        group.push(word);
        groups.set(key, group);
    }

    return Array.from(groups.values());
}
```

This runs in O(n * k) since counting is linear and avoids the sort entirely. The tradeoff: the key is a 26-element comma-separated string like `"1,0,0,...,1,0"`, which is harder to read and debug than a sorted word like `"aet"`. The fixed 26-slot array only works because the constraints guarantee lowercase English letters.

For most interviews, the sort approach is the right call. It reads clearly, the intent is obvious, and the k <= 100 constraint makes the log k cost irrelevant. Reach for the frequency array if an interviewer specifically pushes you toward O(n * k), or if the character set were unrestricted.

## Complexity

- **Time O(n * k log k):** for each of the `n` strings, we sort its characters in O(k log k).
- **Space O(n * k):** the map stores every original string across all groups, totaling O(n * k) characters.

## Test Coverage

The test suite validates:
- LeetCode baseline examples
- All strings in a single anagram group
- All strings as singletons (no shared anagrams)
- Multiple empty strings grouped together
- Strings of different lengths never grouped together
- Repeated-character anagrams
- Single-character string grouping
- Large input with a known anagram group buried at the end
- Input array non-mutation contract
