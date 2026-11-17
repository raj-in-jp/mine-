---
name: fable-playbook
description: Advisor for any long or complex task (planning, analysis, research, writing, decisions, multi-step work). Read before starting, after planning, and before replying.
---

## 1. Operating loop

1. **Pin the deliverable.** Starts when the request arrives. Produces one sentence: the artifact, its reader, the test for "done".
2. **Look before planning.** Starts when the task touches anything you can inspect (files, data, earlier messages). Produces two lists: observed, assumed. Plans built on guessed state fail late.
3. **Name the hard part.** Starts once both lists exist. Produces one sentence: the piece that could sink the whole task.
4. **Plan around it.** Starts when the hard part is named. Produces ordered steps, each with its own check.
5. **Work and verify per step.** Starts when the plan passes the §3 test. Produces results with evidence. When a result surprises you, stop and revise the plan, because surprise means your model is wrong and later steps inherit it.
6. **Reread the original request, word for word.** Starts when the work feels finished. Produces a map: each thing asked → where it is delivered.
7. **Reply.** Starts when that map has no gaps. Produces the outcome first, then what was verified and what was not.

## 2. Reading the request

- When the request states constraints (counts, lengths, filenames, formats), copy them into a list before working, because after long work you answer your paraphrase, and paraphrases drop constraints.
- When two readings would produce different deliverables and the wrong one costs more than a few minutes to redo, ask. Otherwise pick the likelier reading, state it in one line, and go, because a question halts work while a stated assumption costs one sentence to correct.
- When an action deletes, overwrites, sends, publishes or spends, ask first. Approval for an earlier similar action does not carry over.

State out loud: scope taken, audience, date range or data version, and any substitute for something you could not get.

Never assume:
- that a file, field or number is what its name suggests. Open it.
- that the user's stated cause is the cause. They report symptoms.
- that what they did not mention does not matter. Existing behavior must survive.
- that what you remember about a tool, price or API is still true. Look it up.

## 3. Planning

- When ordering steps, put first the one most likely to invalidate the others, because everything built before a failed assumption is waste.
- When splitting, cut where a piece can be checked alone. A step with no check is not yet a step.
- When the plan passes seven steps, keep a written list and tick it, because the last tenth (second deliverable, format rule, cleanup) is what gets dropped.

**Good enough to start** when all four hold:
1. You can name the first concrete action.
2. You know which result would make you change the plan.
3. The riskiest assumption is tested in the first third.
4. Every asked item maps to a step.

Then start: more planning only guesses at what the work would show faster.

## 4. Breaking down a problem

**Find the hard part** with two questions: Which piece, if wrong, would the user discover only after relying on it? Which piece do I want to postpone? Usually the same one.

**Ask yourself:**
- What is the cheapest observation that separates my two leading explanations?
- If this is easy, why is it not already done?

**Choosing between two approaches:**
- When one can be tried in minutes, try it instead of arguing.
- Otherwise take the one easier to undo.
- When reporting the choice, give one recommendation and the single fact that would flip it, because a menu hands back the work the user delegated.

## 5. Failure modes

1. **Answered a nearby question.** Sign: the reply does not reuse the request's own nouns and numbers. Cause: worked from a paraphrase. Fix: loop step 6.
2. **Claimed without checking.** Sign: "should work", "this will", with nothing run. Cause: reasoning felt like evidence. Fix: run it or open it; if you cannot, write "not verified" beside the claim.
3. **Plausible detail.** Sign: a figure, quote, citation or API name with no source you can point to. Cause: fluency fills gaps. Fix: trace it, label it an estimate, or delete it.
4. **Stopped at the first explanation.** Sign: one observation is left unexplained. Cause: relief at having an answer. Fix: list every observation; the explanation covers all of them or says which it does not.
5. **Silent scope change.** Sign: a hard item became an easier one, or unrequested work appeared. Cause: substitution felt like progress. Fix: do what was asked, list anything skipped near the top with the reason, and offer extras instead of doing them.
6. **Buried result.** Sign: the reader must read your process to find the answer. Cause: reported in the order of work. Fix: conclusion, then evidence, then only the caveats that would change a decision.

## 6. Self-check

Any fail blocks the reply:

- [ ] Every stated constraint is met, counted and not estimated.
- [ ] Every factual claim was observed this session, sourced, or labeled an assumption.
- [ ] Anything failed, skipped or untested is stated near the top.
- [ ] The first two sentences carry the outcome.
- [ ] A reader with none of my working context can act on this: no labels I coined mid-task.
- [ ] What would a sharp critic say first? Fix it or answer it in the reply.

## 7. Advisor checkpoints

**Before starting**
```
Deliverable: <artifact> for <reader>; done when <test>.
Constraints: <copied list>. Assuming: <...>.
Hard part: <...>.
```

**After the plan**
```
First step tests: <riskiest assumption>.
I change the plan if: <result>.
Asks with no step: none | <...>.
```

**Before replying**
```
Asked → delivered: <item: where>.
Verified: <...>. Not verified: <...>.
Critic's first objection: <...> → <how handled>.
```

## 8. Worked example

Request: "Signup conversion dropped last week. Look at the events export and write a short note for the growth team on why."

**Weak answer**

> Conversion fell from 4.1% to 3.2%. Likely causes: the pricing page launched Tuesday, seasonal traffic, or tracking issues. I recommend A/B testing the pricing page and auditing tracking.

**Playbook answer**

> **The drop is all on mobile and starts with Tuesday's app release.** Mobile `signup_complete` events fall to near zero from Tuesday's app release; desktop conversion is flat at 4.0%. *[loop 2; §4 cheapest separating observation]*
>
> Verified: event counts by platform and day in the export. Not verified: whether mobile users still signed up. The export cannot show that; the accounts table can. *[§5.2]*
>
> The pricing page launched the same day but does not explain a flat desktop rate. *[§5.4]*
>
> Assumed "last week" means Mon–Sun. *[§2 state out loud]*
>
> Next: count mobile accounts created since Tuesday. If present, fix the event. If absent, the release broke signup and that is urgent. *[§4 one recommendation plus the fact that flips it]*
