---
title: "Valid Palindrome"
slug: "valid-palindrome"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-02-27"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Given a string s, return true if it is a palindrome after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters."
---

# Problem

Given a string `s`, determine whether it reads the same forward and backward after normalization.
Normalization means removing all non-alphanumeric characters and comparing letters case-insensitively.
Return `true` if the normalized string is a palindrome; otherwise return `false`.

## Approach

1. Normalize the string:
   - convert to lowercase
   - remove non-alphanumeric characters
2. Initialize two pointers:
   - `l` at the start
   - `r` at the end
3. Compare mirrored characters while `l < r`:
   - if they differ, return `false`
   - if they match, move inward (`l++`, `r--`)
4. If the loop completes, return `true`.

## Implementation

```typescript
export function isPalindrome(s: string): boolean {
    const normalized = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (normalized.length <= 1) return true;

    let l = 0;
    let r = normalized.length - 1;

    while (l < r) {
        if (normalized[l] !== normalized[r]) {
            return false;
        }

        l++;
        r--;
    }

    return true;
}
```

## Complexity

- **Time O(n):** We scan each character once while normalizing and at most once more while comparing mirrored pairs.
- **Space O(n):** The normalized string may store up to all characters from the input.
