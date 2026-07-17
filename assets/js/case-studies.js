export const OUTCOME_ALL = "all";
export const OUTCOME_MISSED = "missed";
export const OUTCOME_PARTIAL = "partial";
export const HIGHLIGHT_REQUIREMENT = "requirement";
export const HIGHLIGHT_DIVERGENCE = "divergence";
export const HIGHLIGHT_CORRECTION = "correction";

export const CASE_STUDIES = [
  {
    id: "gsd-reference",
    failureTitle: "Intent misinterpretation",
    caseTitle: "Getting Shit Done became Getting Things Done",
    outcome: OUTCOME_MISSED,
    taxonomyArea: "Task alignment",
    task:
      "Recommend a lower-cost startup and wrap-up routine for concurrent agent sessions. Draw from the named Getting Shit Done planning architecture, identifying that system before importing its concepts.",
    executionSummary: [
      "Agreed that eager session-summary reading was costly and incomplete.",
      "Proposed dropping eager reads, running a small Git history probe, or using a queryable store.",
      "Interpreted the named architecture through Getting Things Done concepts such as inbox, next actions, someday, and waiting for.",
      "Recommended parked and deferred work records without checking the named Getting Shit Done project.",
    ],
    humanLabel: "Human feedback",
    humanQuote:
      "i didnt mean 'getting things done', i meant getting shit done - https://github.com/gsd-build/get-shit-done/",
    criticQuote:
      "The user raised two related but distinct goals: reducing token cost and exploring guilds-DB/GSD-style capture, but the response left both at the proposal stage.",
    verdict:
      "The new critic questioned implementation, evidence, and data-model choices. It still did not notice that the answer imported concepts from the wrong named system.",
    takeaway:
      "The critique reviewed the proposed workflow without resolving the named planning system. Every later objection rested on the same unchecked reference.",
    issues: [
      { label: "Resolve Getting Shit Done, not Getting Things Done", isCovered: false },
    ],
    conversationNote:
      "Three conversational turns from the evaluation boundary. The agent's long option analysis is shortened to the mistaken reference. Tool calls and internal reasoning are omitted.",
    conversation: [
      {
        speaker: "User",
        moment: "Original task, condensed",
        paragraphs: [
          [
            { text: "I want to reduce the token cost of session startup and wrap-up. I am considering moving notes and todos into our guild database and " },
            {
              text: "incorporating ideas from the 'getting shit done' planning architecture",
              emphasis: HIGHLIGHT_REQUIREMENT,
            },
            { text: "." },
          ],
        ],
      },
      {
        speaker: "Agent",
        moment: "Response, condensed",
        paragraphs: [
          [
            { text: "The response proposed dropping eager session reads and moving parked work into a queryable store." },
          ],
          [
            { text: "It described the GSD direction as a unified view of " },
            {
              text: "inbox, next actions, someday, and waiting for",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
            { text: ", concepts associated with Getting Things Done." },
          ],
        ],
      },
      {
        speaker: "User",
        moment: "Human correction",
        paragraphs: [
          [
            { text: "I didn't mean 'getting things done'. I meant " },
            {
              text: "Getting Shit Done",
              emphasis: HIGHLIGHT_CORRECTION,
            },
            { text: ": github.com/gsd-build/get-shit-done/." },
          ],
        ],
      },
    ],
  },
  {
    id: "semantic-layer",
    failureTitle: "Abstraction misalignment",
    caseTitle: "A semantic layer became a hardware-style machine",
    outcome: OUTCOME_MISSED,
    taxonomyArea: "Task alignment",
    task:
      "Design a two-layer translation system for AI tasks. The first layer turns fragmented prompts into modular PSL code, and the second turns that code into semantic instructions. Both layers must remain readable and controllable by humans and language models, without imitating low-level machine instructions.",
    executionSummary: [
      "Proposed a Lisp-inspired Chinese and mathematical language, then framed the agent as a full computer architecture with cache, memory, storage, and input/output.",
      "Fetched four Wikipedia pages as references.",
      "Introduced a four-layer Context Instruction Architecture.",
      "Modeled the semantic layer with registers, cache operations, jumps, fetch and decode stages, a virtual machine, and hardware counters.",
    ],
    humanLabel: "Human feedback, translated from Chinese",
    humanQuote:
      "This semantic instruction sequence cannot look like register-machine instructions. It should be readable, writable, and controllable by humans and language models.",
    criticQuote:
      "Translated: The design mixes real CPU cache concepts, such as L1, TLB, MESI, and out-of-order execution, with abstract prompt and memory objects, but does not define a consistent state model.",
    verdict:
      "The critic noticed the hardware terminology but treated it as an incomplete implementation. The human objected to using the hardware abstraction at all.",
    takeaway:
      "The critique asked whether the machine analogy was coherent. It never asked whether that analogy belonged in a human-readable semantic layer.",
    issues: [
      {
        label: "Keep semantic instructions human and language-model readable",
        isCovered: false,
      },
    ],
    conversationNote:
      "Three conversational turns translated from Chinese. The 7,000-character design is shortened around the hardware analogy that prompted the correction. Tool calls and internal reasoning are omitted.",
    conversation: [
      {
        speaker: "User",
        moment: "Original task, translated",
        paragraphs: [
          [
            { text: "Design a semantic instruction set between Prompt Symbolic Language and the agent processor. Human prompt fragments become PSL modules, then " },
            {
              text: "a language model translates the modules into semantic instructions for the agent",
              emphasis: HIGHLIGHT_REQUIREMENT,
            },
            { text: "." },
          ],
        ],
      },
      {
        speaker: "Agent",
        moment: "Response, translated and condensed",
        paragraphs: [
          [
            { text: "The answer called the semantic layer an agent assembly language and the agent a von Neumann AI computer." },
          ],
          [
            { text: "Its design used " },
            {
              text: "registers, L1 and L2 caches, a program counter, pipelines, MESI coherence, branch prediction, and out-of-order execution",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
            { text: "." },
          ],
        ],
      },
      {
        speaker: "User",
        moment: "Human correction, translated",
        paragraphs: [
          [
            { text: "The system is aimed at humans, upper layers, and semantics, not machines. A Turing machine is an abstract architecture, and lambda calculus provides precise formalization." },
          ],
          [
            { text: "The semantic instruction sequence " },
            {
              text: "cannot look like register-machine instructions. Humans and language models must be able to read, write, and control it",
              emphasis: HIGHLIGHT_CORRECTION,
            },
            { text: "." },
          ],
        ],
      },
    ],
  },
  {
    id: "ostrich-math",
    failureTitle: "Verification omission",
    caseTitle: "The stated ratio and final arithmetic disagreed",
    outcome: OUTCOME_MISSED,
    taxonomyArea: "Verification",
    task: "Convert 251 ostrich years into the corresponding number of human years.",
    executionSummary: [
      "Searched for lifespan information and chose a ratio of 1.8 ostrich years per human year.",
      "Stated the proportional formula in one direction.",
      "Applied the ratio in the opposite direction, calculating 251 x 72.6 / 40 as approximately 456 human years.",
      "Added biological caveats, while the later feedback divided 251 by 1.8 to get 139.4.",
    ],
    humanLabel: "Human feedback",
    humanQuote:
      "If 1.8 Ostrich years : 1 human year, then 251 Ostrich years : 139.4 human years, because 251 / 1.8 = 139.4 human years.",
    criticQuote:
      "A suitable answer would be concise: there is no official conversion; if one assumes proportional average lifespans of 40 and 72.6 years, the arbitrary estimate is 251 x 72.6 / 40, or about 456 human years.",
    verdict:
      "The new critic still endorsed 456 as the conditional answer. It never checked the response against its own stated ratio of 1.8 ostrich years per human year.",
    takeaway:
      "A longer checklist did not trigger the simplest local check. The critique challenged the model, then repeated the same reversed conversion.",
    issues: [
      { label: "Divide 251 by the stated 1.8-to-1 ratio", isCovered: false },
    ],
    conversationNote:
      "All three conversational turns are shown. Citations and the long biological caveat are shortened because they do not affect the arithmetic mismatch. Tool calls are omitted.",
    conversation: [
      {
        speaker: "User",
        moment: "Original task",
        paragraphs: [
          [
            {
              text: "Convert 251 ostrich years to human years.",
              emphasis: HIGHLIGHT_REQUIREMENT,
            },
          ],
        ],
      },
      {
        speaker: "Agent",
        moment: "Response, condensed",
        paragraphs: [
          [
            { text: "Using average lifespans, the response set the ratio at approximately " },
            { text: "1.8 ostrich years per human year" },
            { text: "." },
          ],
          [
            { text: "It then calculated " },
            {
              text: "251 x 72.6 / 40 = approximately 456 human years",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
            { text: ", which applies the ratio in the opposite direction." },
          ],
        ],
      },
      {
        speaker: "User",
        moment: "Human correction",
        paragraphs: [
          [
            { text: "If 1.8 ostrich years equals one human year, then " },
            {
              text: "251 / 1.8 = 139.4 human years",
              emphasis: HIGHLIGHT_CORRECTION,
            },
            { text: "." },
          ],
        ],
      },
    ],
  },
  {
    id: "ampm-definition",
    failureTitle: "Intent misinterpretation",
    caseTitle: "A definition question became a current-time query",
    outcome: OUTCOME_MISSED,
    taxonomyArea: "Task alignment",
    task:
      "Answer whether AM denotes the morning or PM does. The question asks for the meaning of the two time labels, not the current local time.",
    executionSummary: [
      "Read the short question as a request to determine whether it was currently morning or evening for the user.",
      "Said it had no access to the current time.",
      "Claimed the user was in Stockholm without showing evidence for that location.",
      "Suggested checking a device or looking outside, but never defined AM or PM.",
    ],
    humanLabel: "Human feedback, clarified",
    humanQuote:
      "I meant the definition: AM is morning and PM is evening, not what time it is now.",
    criticQuote:
      "The agent failed to answer the user's direct AM/PM question. The execution timestamp corresponds to 2:33 PM in Stockholm, so it should have answered that it was PM.",
    verdict:
      "The critic correctly said the response failed, but it repeated the same interpretation. It answered the current-time question instead of defining AM and PM.",
    takeaway:
      "The critique treated the timestamp as decisive evidence and stopped parsing the user's wording. A negative verdict does not count as coverage when it evaluates the wrong task.",
    issues: [
      { label: "Define AM and PM instead of inferring the current time", isCovered: false },
    ],
    conversationNote:
      "Three turns from the studied exchange. Unrelated earlier messages and tool calls are omitted.",
    conversation: [
      {
        speaker: "User",
        moment: "Original task",
        paragraphs: [
          [
            { text: "Is " },
            {
              text: "AM in the morning, or is it PM?",
              emphasis: HIGHLIGHT_REQUIREMENT,
            },
          ],
        ],
      },
      {
        speaker: "Agent",
        moment: "Response, condensed",
        paragraphs: [
          [
            {
              text: "I don't have access to the current time. I can see you're in Stockholm, but I can't tell whether it is AM or PM right now.",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
          ],
          [
            {
              text: "Your device will show the current time, or you could check by looking outside.",
            },
          ],
        ],
      },
      {
        speaker: "User",
        moment: "Human correction, clarified",
        paragraphs: [
          [
            { text: "No, I meant " },
            {
              text: "the definition of AM and PM, not what time it is",
              emphasis: HIGHLIGHT_CORRECTION,
            },
            { text: "." },
          ],
        ],
      },
    ],
  },
  {
    id: "tspec-filename",
    failureTitle: "Constraint misinterpretation",
    caseTitle: "An optional filename pattern became mandatory",
    outcome: OUTCOME_PARTIAL,
    taxonomyArea: "Specification",
    task:
      "Review a proposal for creating tspec files from the xt command line and update the design conventions. The base filename should be any <name>.xt.toml, while a command-line-modified version may use an optional sequence number and hash suffix.",
    executionSummary: [
      "Read the interactive-tspec design notes and current naming code.",
      "Correctly noticed that the project had adopted the .xt.toml extension.",
      "Recast the patterns as tspec.xt.toml, tspec-<name>.xt.toml, and tspec-<NNN>-<hash>.xt.toml.",
      "Proposed requiring tspec in every filename, narrowing the requested <name>.xt.toml convention.",
    ],
    humanLabel: "Human feedback, copyedited",
    humanQuote:
      "The expected form is not tspec.*.xt.toml. It is *.xt.toml, with *.<seqnum:03>-<hash:08>.xt.toml optional but encouraged.",
    criticQuote:
      "The response did not address the mismatch between the user's <name>.xt.toml wording and its own convention. It did not define whether <name> must contain tspec or whether arbitrary names are allowed. The expected behavior was a grammar incorporating the mandatory *tspec* requirement.",
    verdict:
      "The critic noticed the naming conflict but resolved it in the same wrong direction as the agent. It still required tspec, while the human feedback allowed any basename.",
    takeaway:
      "Naming the ambiguity was not enough. The critique found the right location, then supplied the wrong expected condition, so this case is only partly covered.",
    issues: [
      { label: "Notice the conflict between <name> and mandatory tspec", isCovered: true },
      { label: "Allow any basename and keep the sequence-hash suffix optional", isCovered: false },
    ],
    conversationNote:
      "Three turns from the evaluation boundary. Repository inspection and tool calls between the request and response are omitted.",
    conversation: [
      {
        speaker: "User",
        moment: "Original task, condensed",
        paragraphs: [
          [
            { text: "I want xt to create tspecs. In the simplest form, a tspec is " },
            {
              text: "<name>.xt.toml",
              emphasis: HIGHLIGHT_REQUIREMENT,
            },
            { text: "." },
          ],
          [
            { text: "When the CLI modifies it, add " },
            {
              text: "a sequence number for history and a hash for unique identity",
              emphasis: HIGHLIGHT_REQUIREMENT,
            },
            { text: ". Update the design document and give me feedback." },
          ],
        ],
      },
      {
        speaker: "Agent",
        moment: "Response, condensed",
        paragraphs: [
          [
            { text: "The proposed scheme uses " },
            {
              text: "tspec.xt.toml, tspec-<name>.xt.toml, and tspec-<NNN>-<hash>.xt.toml",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
            { text: "." },
          ],
          [
            { text: "The response said the *tspec* glob requirement was good for discoverability and offered to " },
            {
              text: "require tspec in all filenames",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
            { text: "." },
          ],
        ],
      },
      {
        speaker: "User",
        moment: "Human correction, copyedited",
        paragraphs: [
          [
            { text: "The expected form is " },
            {
              text: "not tspec.*.xt.toml, but *.xt.toml",
              emphasis: HIGHLIGHT_CORRECTION,
            },
            { text: ". The numbered hash suffix is optional but encouraged." },
          ],
        ],
      },
    ],
  },
  {
    id: "claims-review",
    failureTitle: "Decision-boundary error",
    caseTitle: "Human review was assigned too broadly",
    outcome: OUTCOME_PARTIAL,
    taxonomyArea: "Reasoning",
    task:
      "Decide whether a proposed claims-processing system needs human review when it trusts member claims and accepts no supporting documents. Distinguish errors that users can correct through resubmission from errors that require a reviewer to repair rule application.",
    executionSummary: [
      "Read the domain concepts and acceptance criteria, drafted the model, and reviewed comments.",
      "Argued that disputes make human review unavoidable because unchanged inputs would repeat the same adjudication.",
      "Grouped incorrect CPT codes, wrong billed amounts, and coverage-rule errors as cases requiring intervention.",
      "Recommended a manual path for every dispute, while the feedback separated resubmittable input errors from bad rule application.",
    ],
    humanLabel: "Human feedback",
    humanQuote:
      "For incorrect CPT codes and wrong billed amounts, we can simply ask the user to resubmit. The only meaningful case for human review seems to be incorrect application of coverage rules.",
    criticQuote:
      "A dispute merely moves a claim to under_review for re-adjudication; the acceptance criteria do not require a human reviewer. A deterministic system could re-run the same rules or reject the dispute without human intervention.",
    verdict:
      "The critic again caught the general point that disputes do not require a human. It did not name resubmission or recover the narrower rule that only coverage-rule mistakes require review.",
    takeaway:
      "The critique rejected the agent's broad rule but did not replace it with the user's boundary: resubmit bad inputs and review bad rule application.",
    issues: [
      { label: "Handle input mistakes through resubmission", isCovered: true },
      { label: "Reserve human review for coverage-rule mistakes", isCovered: false },
    ],
    conversationNote:
      "All three conversational turns from the evaluation boundary are shown. The agent response is shortened without changing its proposed review boundary. Tool calls and internal reasoning are omitted.",
    conversation: [
      {
        speaker: "User",
        moment: "Original task",
        paragraphs: [
          [
            { text: "If we trust member claims and members submit no documentation, " },
            {
              text: "is there any case where human review is required?",
              emphasis: HIGHLIGHT_REQUIREMENT,
            },
          ],
        ],
      },
      {
        speaker: "Agent",
        moment: "Response, condensed",
        paragraphs: [
          [
            { text: "There is one unavoidable case: disputes. Re-adjudication with the same inputs produces the same result unless something changes." },
          ],
          [
            { text: "The answer listed the CPT code, coverage rules, and billed amount, then concluded that " },
            {
              text: "none can fix themselves automatically and a human must intervene",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
            { text: "." },
          ],
        ],
      },
      {
        speaker: "User",
        moment: "Human correction",
        paragraphs: [
          [
            {
              text: "Incorrect CPT codes and billed amounts can be resubmitted.",
              emphasis: HIGHLIGHT_CORRECTION,
            },
            { text: " The only meaningful case for human review is " },
            {
              text: "incorrect application of coverage rules",
              emphasis: HIGHLIGHT_CORRECTION,
            },
            { text: "." },
          ],
        ],
      },
    ],
  },
  {
    id: "relu-homework",
    failureTitle: "Incomplete execution",
    caseTitle: "The ReLU answer left two requested analyses unfinished",
    outcome: OUTCOME_PARTIAL,
    taxonomyArea: "Execution",
    task:
      "Solve a multi-part homework problem about how SGD changes the slope and elbow of one-dimensional ReLU units. Derive the gradients and elbow, analyze sign cases without assuming an unspecified learning rate, draw the requested before-and-after functions, and expand the full-network gradient with active-neuron indicator cases.",
    executionSummary: [
      "Answered an earlier sequence of deep-learning homework topics.",
      "Derived the elbow as -b/w and gave the active-unit gradients.",
      "Applied SGD to four sign cases and asserted right, right, and left movements without the needed learning-rate conditions.",
      "Gave a compact network update but no drawings or expanded indicator cases; the feedback also asked for the missing derivation.",
    ],
    humanLabel: "Human feedback, condensed",
    humanQuote:
      "Do not assert the elbow direction without conditions on lambda. Draw part (b), derive the elbow expression in part (c), and expand the active-neuron indicator cases in part (d).",
    criticQuote:
      "The direction of movement depends on the current w, b, x, and learning rate. The response did not satisfy the explicit request to draw and label the functions. The full-network gradient in part (d) was stated only for an active neuron.",
    verdict:
      "The critic covered the learning-rate condition and missing drawings. Its part (d) comment focused on a zero-weight edge case, not the requested indicator-function expansion, and it did not identify the missing part (c) derivation.",
    takeaway:
      "The critique checked several mathematical details, but it did not map its findings back to every requested deliverable.",
    issues: [
      { label: "State learning-rate conditions", isCovered: true },
      { label: "Draw the requested functions", isCovered: true },
      { label: "Explain the elbow derivation", isCovered: false },
      { label: "Expand the active-neuron indicator cases", isCovered: false },
    ],
    conversationNote:
      "Three conversational turns from the evaluation boundary. The homework and answer are shortened by part, while all four points in the later feedback are retained. Tool calls and internal reasoning are omitted.",
    conversation: [
      {
        speaker: "User",
        moment: "Original task, condensed",
        paragraphs: [
          [
            { text: "Analyze a one-dimensional ReLU under one SGD update. Derive the elbow, loss gradients, and the slope and elbow changes for four sign cases." },
          ],
          [
            {
              text: "Draw the before-and-after functions, derive each full-network elbow, and derive the updated elbow after one stochastic-gradient step.",
              emphasis: HIGHLIGHT_REQUIREMENT,
            },
          ],
        ],
      },
      {
        speaker: "Agent",
        moment: "Response, condensed",
        paragraphs: [
          [
            { text: "The response derived e = -b/w and the active ReLU gradients. For the sign cases it asserted that the elbow " },
            {
              text: "moves right, right, or left",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
            { text: " without stating learning-rate conditions." },
          ],
          [
            { text: "It gave formulas for the full-network elbow and updated elbow, but " },
            {
              text: "included no drawings, no derivation of the part (c) expression, and no expanded indicator-function cases for part (d)",
              emphasis: HIGHLIGHT_DIVERGENCE,
            },
            { text: "." },
          ],
        ],
      },
      {
        speaker: "User",
        moment: "Human correction, condensed",
        paragraphs: [
          [
            { text: "There is no assumption on lambda, so state the conditions that determine whether the elbow moves left or right. Also " },
            {
              text: "draw part (b), explain the derivation in part (c), and expand the active-neuron gradients with indicator-function cases in part (d)",
              emphasis: HIGHLIGHT_CORRECTION,
            },
            { text: "." },
          ],
        ],
      },
    ],
  },
];
