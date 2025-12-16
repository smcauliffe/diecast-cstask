# Why the Next.js Site Looks Better Than the EDS Site We Built

An observation during the Diecast Collection comparison project: the Contentstack + Next.js site wound up looking more polished than the Adobe EDS site, even though the EDS site was built specifically to match it. Here's why that likely happened:

## 1. Clean Slate vs. Adaptation

With Next.js, the exact HTML structure was written directly, then styled. With EDS, the styling had to work with HTML that emerged from document authoring + auto-blocking transformations. Much of the work was *undoing* defaults:
- Resetting button styles on card links
- Overriding hero overlay behavior
- Fighting `text-overflow: ellipsis` on titles

## 2. Fighting the Framework

EDS auto-blocking is powerful but opinionated. The hero block assumes you want text overlaid on images. Making it behave differently required understanding the system, then working against it. That's harder than just writing what you want.

## 3. Patchwork vs. System

The CS site was built as a cohesive design system. The EDS site was built through incremental fixes ("move this", "add badge here", "reduce this spacing"). Patchwork CSS rarely feels as polished.

## 4. Indirect Communication

The CS code was visible directly as it was written. For EDS matching, the process relied on screenshots and descriptions—a lossy feedback loop. Hover states, transitions, and subtle spacing are hard to communicate through static images.

## 5. Mental Model

The CS design was understood because it was created from scratch. Reverse-engineering it into a different paradigm (document-based authoring → auto-blocks → styling) adds cognitive overhead.

---

## Key Takeaway

**Developer experience differs significantly** when building original designs vs. matching existing ones across platforms. It may be easier to create a basic design system from scratch than to reference one and try to match it in a site built a different way.

---

*Generated during a Claude Code session comparing Contentstack + Next.js + Vercel vs. Adobe EDS implementations of a diecast car collection blog.*
