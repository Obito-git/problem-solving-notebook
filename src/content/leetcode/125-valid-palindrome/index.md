---
num: 125
title: "Valid Palindrome"
category: "Two pointers"
subcategories: 
        - "String"
        - "Stack"
difficulty: "Easy"
url: "https://leetcode.com/problems/valid-palindrome/description/"
draft: false
---

## Description

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` *if it is a ***palindrome**, or `false` otherwise.*

### Examples

- **Example 1:**
  - **Input:** `s = "A man, a plan, a canal: Panama"`
  - **Output:** `true`
  - **Explanation:** `"amanaplanacanalpanama"` is a palindrome.

- **Example 2:**
  - **Input:** `s = "race a car"`
  - **Output:** `false`
  - **Explanation:** `"raceacar"` is not a palindrome.

- **Example 3:**
  - **Input:** `s = " "`
  - **Output:** `true`
  - **Explanation:** After removing non-alphanumeric characters, `s` becomes an empty string `""`. Since an empty string reads the same forward and backward, it is a palindrome.

### Constraints

- 1 <= s.length <= 10<sup>4</sup>
- `s` consists only of printable ASCII characters.

## Test

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_example1() {
        let s = "A man, a plan, a canal: Panama".to_string();
        assert!(is_palindrome(s));
    }

    #[test]
    fn test_example2() {
        let s = "race a car".to_string();
        assert!(!is_palindrome(s));
    }

    #[test]
    fn test_example3() {
        let s = " ".to_string();
        assert!(is_palindrome(s));
    }

    #[test]
    fn test_example4() {
        let s = "a.".to_string();
        assert!(is_palindrome(s));
    }

    #[test]
    fn test_example5() {
        let s = ".,".to_string();
        assert!(is_palindrome(s));
    }

    #[test]
    fn test_lowercase_no_whitespace_true() {
        let s = "amanaplanacanalpanama".to_string();
        assert!(is_palindrome(s));
    }

    #[test]
    fn test_lowercase_no_whitespace_false() {
        let s = "raceacar".to_string();
        assert!(!is_palindrome(s));
    }

    #[test]
    fn test_single_character() {
        let s = "a".to_string();
        assert!(is_palindrome(s));
    }

    #[test]
    fn test_alphanumeric_mixed() {
        let s = "0P".to_string();
        assert!(!is_palindrome(s));
    }
}
```

## Prototype

```rust
pub fn is_palindrome(s: String) -> bool {
    todo!()
}
```

## Solutions

### Reverse string

```rust
pub fn is_palindrome(s: String) -> bool {
    let filtered: Vec<char> = s
        .chars()
        .filter(|c| c.is_ascii_alphanumeric())
        .map(|c| c.to_ascii_lowercase())
        .collect();
    filtered.iter().eq(filtered.iter().rev())
}
```

- **Time Complexity:** O(n)  
- **Space Complexity:** O(n)

### Two pointers

#### Iterators as pointers

```rust
pub fn is_palindrome(s: String) -> bool {
    let mut left = s.chars();
    let mut right = s.chars().rev();

    loop {
        let l = left.find(|c| c.is_ascii_alphanumeric());
        let r = right.find(|c| c.is_ascii_alphanumeric());

        match (l, r) {
            (Some(l), Some(r)) => {
                if l.to_ascii_lowercase() != r.to_ascii_lowercase() {
                    return false;
                }
            }
            (None, None) => return true,
            _ => return false,
        }
    }
}
```

- **Time Complexity:** O(n)  
- **Space Complexity:** O(1)

#### Classic two pointers with O(n) space and additional iteration but prettier

```rust
pub fn is_palindrome(s: String) -> bool {
    let chars = s.chars().collect::<Vec<_>>();
    let mut i = 0;
    let mut y = chars.len() - 1;

    while i < y {
        while i < y && !chars[i].is_ascii_alphanumeric() {
            i += 1;
        }
        while y > i && !chars[y].is_ascii_alphanumeric() {
            y = y.saturating_sub(1);
        }
        if chars[i].to_ascii_lowercase() != chars[y].to_ascii_lowercase() {
            return false;
        }
        i += 1;
        y = y.saturating_sub(1);
    }
    true
}
```

- **Time Complexity:** O(n)  
- **Space Complexity:** O(n)

#### Classic two pointers with no additional memory

```rust
pub fn is_palindrome(s: String) -> bool {
    let bytes = s.as_bytes();
    let mut i = 0;
    let mut y = bytes.len() - 1;

    while i < y {
        while i < y && !(bytes[i] as char).is_ascii_alphanumeric() {
            i += 1;
        }
        while y > i && !(bytes[y] as char).is_ascii_alphanumeric() {
            y = y.saturating_sub(1);
        }
        if (bytes[i] as char).to_ascii_lowercase() != (bytes[y] as char).to_ascii_lowercase() {
            return false;
        }
        i += 1;
        y = y.saturating_sub(1);
    }
    true
}
```

- **Time Complexity:** O(n)  
- **Space Complexity:** O(1)
