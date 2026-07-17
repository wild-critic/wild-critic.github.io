import {
  CASE_STUDIES,
  HIGHLIGHT_CORRECTION,
  HIGHLIGHT_DIVERGENCE,
  HIGHLIGHT_REQUIREMENT,
  OUTCOME_ALL,
  OUTCOME_MISSED,
} from "./case-studies.js";

const SELECTED_CASE_ATTRIBUTE = "aria-current";
const ACTIVE_FILTER_ATTRIBUTE = "aria-pressed";
const CASE_SELECTION_BUTTON = "case-button";
const CASE_SELECTION_SEQUENCE = "case-sequence";
const REDUCED_MOTION_MEDIA_QUERY = "(prefers-reduced-motion: reduce)";
const DIALOG_OPEN_CLASS = "dialog-open";
const highlightLabels = {
  [HIGHLIGHT_REQUIREMENT]: "User requirement",
  [HIGHLIGHT_DIVERGENCE]: "Agent divergence",
  [HIGHLIGHT_CORRECTION]: "Human correction",
};

const explorerState = {
  activeFilter: OUTCOME_ALL,
  selectedCaseId: CASE_STUDIES[0].id,
  selectedConversationTurnIndex: 0,
};

const caseListElement = document.querySelector("#case-list");
const caseDetailElement = document.querySelector("#case-detail");
const caseStatusElement = document.querySelector("#case-status");
const caseProgressElement = document.querySelector("#case-progress");
const outcomeBadgeElement = document.querySelector("#outcome-badge");
const patternBadgeElement = document.querySelector("#pattern-badge");
const caseTitleElement = document.querySelector("#case-title");
const caseSpecificTitleElement = document.querySelector("#case-specific-title");
const caseTaskElement = document.querySelector("#case-task");
const executionListElement = document.querySelector("#execution-list");
const userRequestElement = document.querySelector("#user-request");
const agentResponseElement = document.querySelector("#agent-response");
const humanLabelElement = document.querySelector("#human-label");
const humanQuoteElement = document.querySelector("#human-quote");
const criticQuoteElement = document.querySelector("#critic-quote");
const issueStripElement = document.querySelector("#issue-strip");
const verdictBoxElement = document.querySelector("#verdict-box");
const verdictSymbolElement = document.querySelector("#verdict-symbol");
const verdictTextElement = document.querySelector("#verdict-text");
const caseTakeawayElement = document.querySelector("#case-takeaway");
const previousCaseButton = document.querySelector("#previous-case");
const nextCaseButton = document.querySelector("#next-case");
const openConversationButton = document.querySelector("#open-conversation");
const conversationDialog = document.querySelector("#conversation-dialog");
const closeConversationButton = document.querySelector("#close-conversation");
const conversationTitleElement = document.querySelector("#conversation-title");
const conversationCaseTitleElement = document.querySelector("#conversation-case-title");
const conversationNoteElement = document.querySelector("#conversation-note");
const transcriptNavigationElement = document.querySelector("#transcript-navigation");
const conversationMessagesElement = document.querySelector("#conversation-messages");
const messageProgressElement = document.querySelector("#message-progress");
const previousMessageButton = document.querySelector("#previous-message");
const nextMessageButton = document.querySelector("#next-message");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
let lockedPageScrollPosition = 0;

/** @returns {ScrollBehavior} */
function getScrollBehavior() {
  return window.matchMedia(REDUCED_MOTION_MEDIA_QUERY).matches ? "auto" : "smooth";
}

/** @returns {Array<object>} */
function getVisibleCaseStudies() {
  if (explorerState.activeFilter === OUTCOME_ALL) {
    return CASE_STUDIES;
  }
  return CASE_STUDIES.filter(
    (caseStudy) => caseStudy.outcome === explorerState.activeFilter,
  );
}

/** @returns {object} */
function getSelectedCaseStudy() {
  return CASE_STUDIES.find(
    (caseStudy) => caseStudy.id === explorerState.selectedCaseId,
  );
}

/** @param {object} caseStudy @param {number} caseIndex */
function createCaseButton(caseStudy, caseIndex) {
  const caseButton = document.createElement("button");
  const isSelected = caseStudy.id === explorerState.selectedCaseId;
  caseButton.className = "case-button";
  caseButton.type = "button";
  caseButton.dataset.caseId = caseStudy.id;
  caseButton.setAttribute(SELECTED_CASE_ATTRIBUTE, String(isSelected));
  caseButton.innerHTML = `
    <span class="case-index">${String(caseIndex + 1).padStart(2, "0")}</span>
    <span>
      <span class="case-button-title">${caseStudy.failureTitle}</span>
      <span class="case-button-pattern">${caseStudy.caseTitle}</span>
    </span>
  `;
  caseButton.addEventListener("click", () =>
    selectCaseStudy(caseStudy.id, CASE_SELECTION_BUTTON),
  );
  return caseButton;
}

function renderCaseList() {
  const visibleCaseStudies = getVisibleCaseStudies();
  caseListElement.replaceChildren(
    ...visibleCaseStudies.map((caseStudy) =>
      createCaseButton(caseStudy, CASE_STUDIES.indexOf(caseStudy)),
    ),
  );
}

/** @param {Array<object>} issues */
function renderIssueStrip(issues) {
  issueStripElement.replaceChildren();
  issueStripElement.hidden = issues.length === 0;
  for (const issue of issues) {
    const issueElement = document.createElement("li");
    issueElement.className = issue.isCovered ? "covered" : "missed";
    issueElement.textContent = `${issue.isCovered ? "AI caught" : "AI missed"}: ${issue.label}`;
    issueStripElement.append(issueElement);
  }
}

/** @param {Array<string>} executionSummary */
function renderExecutionSummary(executionSummary) {
  const executionSteps = executionSummary.map((executionDescription) => {
    const executionStep = document.createElement("li");
    executionStep.textContent = executionDescription;
    return executionStep;
  });
  executionListElement.replaceChildren(...executionSteps);
}

/** @param {HTMLElement} containerElement @param {object} conversationTurn */
function renderExchangeExcerpt(containerElement, conversationTurn) {
  containerElement.replaceChildren(
    ...conversationTurn.paragraphs.map((transcriptParagraph) =>
      createTranscriptParagraph(transcriptParagraph),
    ),
  );
}

function renderCaseDetail() {
  const selectedCaseStudy = getSelectedCaseStudy();
  const isMissed = selectedCaseStudy.outcome === OUTCOME_MISSED;
  outcomeBadgeElement.className = `outcome-badge ${selectedCaseStudy.outcome}`;
  outcomeBadgeElement.textContent = isMissed ? "Not covered" : "Partly covered";
  patternBadgeElement.textContent = selectedCaseStudy.taxonomyArea;
  caseTitleElement.textContent = selectedCaseStudy.failureTitle;
  caseSpecificTitleElement.textContent = `Case: ${selectedCaseStudy.caseTitle}`;
  caseTaskElement.textContent = selectedCaseStudy.task;
  renderExecutionSummary(selectedCaseStudy.executionSummary);
  renderExchangeExcerpt(userRequestElement, selectedCaseStudy.conversation[0]);
  renderExchangeExcerpt(agentResponseElement, selectedCaseStudy.conversation[1]);
  humanLabelElement.textContent = selectedCaseStudy.humanLabel;
  humanQuoteElement.textContent = selectedCaseStudy.humanQuote;
  criticQuoteElement.textContent = selectedCaseStudy.criticQuote;
  verdictBoxElement.className = `verdict-box ${selectedCaseStudy.outcome}`;
  const coveredIssueCount = selectedCaseStudy.issues.filter(
    (issue) => issue.isCovered,
  ).length;
  verdictSymbolElement.textContent = isMissed
    ? "0"
    : `${coveredIssueCount}/${selectedCaseStudy.issues.length}`;
  verdictTextElement.textContent = selectedCaseStudy.verdict;
  caseTakeawayElement.textContent = selectedCaseStudy.takeaway;
  const visibleCaseStudies = getVisibleCaseStudies();
  const visibleCaseIndex = visibleCaseStudies.findIndex(
    (caseStudy) => caseStudy.id === selectedCaseStudy.id,
  );
  caseProgressElement.textContent = `Case ${visibleCaseIndex + 1} of ${visibleCaseStudies.length}`;
  caseStatusElement.textContent = `Case ${visibleCaseIndex + 1} of ${visibleCaseStudies.length} selected: ${selectedCaseStudy.failureTitle}`;
  renderIssueStrip(selectedCaseStudy.issues);
  updateNavigationButtons();
}

/** @param {object} transcriptSegment @returns {Node} */
function createTranscriptSegment(transcriptSegment) {
  if (!transcriptSegment.emphasis) {
    return document.createTextNode(transcriptSegment.text);
  }
  const highlightedTextElement = document.createElement("mark");
  highlightedTextElement.className = transcriptSegment.emphasis;
  highlightedTextElement.textContent = transcriptSegment.text;
  highlightedTextElement.setAttribute(
    "aria-label",
    `${highlightLabels[transcriptSegment.emphasis]}: ${transcriptSegment.text}`,
  );
  return highlightedTextElement;
}

/** @param {Array<object>} transcriptParagraph @returns {HTMLParagraphElement} */
function createTranscriptParagraph(transcriptParagraph) {
  const paragraphElement = document.createElement("p");
  paragraphElement.append(
    ...transcriptParagraph.map((transcriptSegment) =>
      createTranscriptSegment(transcriptSegment),
    ),
  );
  return paragraphElement;
}

/** @param {object} conversationTurn @param {number} turnIndex */
function createConversationMessage(conversationTurn, turnIndex) {
  const messageElement = document.createElement("article");
  messageElement.className = "conversation-message";
  messageElement.id = `conversation-turn-${turnIndex}`;

  const headingElement = document.createElement("header");
  headingElement.className = "message-heading";
  const speakerElement = document.createElement("h3");
  speakerElement.className = "message-speaker";
  speakerElement.id = `conversation-turn-heading-${turnIndex}`;
  speakerElement.setAttribute(
    "aria-label",
    `${conversationTurn.speaker}, ${conversationTurn.moment}`,
  );
  speakerElement.textContent = conversationTurn.speaker;
  messageElement.setAttribute("aria-labelledby", speakerElement.id);
  const momentElement = document.createElement("span");
  momentElement.className = "message-moment";
  momentElement.textContent = conversationTurn.moment;
  headingElement.append(speakerElement, momentElement);

  const bodyElement = document.createElement("div");
  bodyElement.className = "message-body";
  bodyElement.append(
    ...conversationTurn.paragraphs.map((transcriptParagraph) =>
      createTranscriptParagraph(transcriptParagraph),
    ),
  );
  messageElement.append(headingElement, bodyElement);
  return messageElement;
}

/** @param {object} conversationTurn @param {number} turnIndex */
function createTranscriptStep(conversationTurn, turnIndex) {
  const stepButton = document.createElement("button");
  stepButton.className = "transcript-step";
  stepButton.type = "button";
  stepButton.dataset.turnIndex = String(turnIndex);
  stepButton.setAttribute("aria-controls", `conversation-turn-${turnIndex}`);
  stepButton.innerHTML = `
    <span class="transcript-step-number">${String(turnIndex + 1).padStart(2, "0")}</span>
    <span class="transcript-step-label">${conversationTurn.moment}</span>
  `;
  stepButton.addEventListener("click", () => selectConversationTurn(turnIndex, true));
  return stepButton;
}

/** @param {number} turnIndex @param {boolean} shouldScroll */
function selectConversationTurn(turnIndex, shouldScroll) {
  const selectedCaseStudy = getSelectedCaseStudy();
  const finalTurnIndex = selectedCaseStudy.conversation.length - 1;
  const boundedTurnIndex = Math.min(Math.max(turnIndex, 0), finalTurnIndex);
  explorerState.selectedConversationTurnIndex = boundedTurnIndex;

  const transcriptStepButtons = [...document.querySelectorAll(".transcript-step")];
  for (const transcriptStepButton of transcriptStepButtons) {
    const isCurrentStep = Number(transcriptStepButton.dataset.turnIndex) === boundedTurnIndex;
    transcriptStepButton.setAttribute("aria-current", isCurrentStep ? "step" : "false");
  }

  const conversationMessageElements = [
    ...conversationMessagesElement.querySelectorAll(".conversation-message"),
  ];
  for (const [messageIndex, conversationMessageElement] of conversationMessageElements.entries()) {
    conversationMessageElement.classList.toggle("is-active", messageIndex === boundedTurnIndex);
  }

  const selectedTurn = selectedCaseStudy.conversation[boundedTurnIndex];
  messageProgressElement.textContent = `Turn ${boundedTurnIndex + 1} of ${selectedCaseStudy.conversation.length}: ${selectedTurn.moment}`;
  previousMessageButton.disabled = boundedTurnIndex === 0;
  nextMessageButton.disabled = boundedTurnIndex === finalTurnIndex;

  if (shouldScroll) {
    const selectedStepButton = transcriptStepButtons[boundedTurnIndex];
    const selectedMessageElement = conversationMessageElements[boundedTurnIndex];
    const scrollBehavior = getScrollBehavior();
    selectedStepButton.scrollIntoView({
      behavior: scrollBehavior,
      block: "nearest",
      inline: "center",
    });
    selectedMessageElement.scrollIntoView({ behavior: scrollBehavior, block: "center" });
  }
}

function renderConversation() {
  const selectedCaseStudy = getSelectedCaseStudy();
  conversationTitleElement.textContent = selectedCaseStudy.failureTitle;
  conversationCaseTitleElement.textContent = `Case: ${selectedCaseStudy.caseTitle}`;
  conversationNoteElement.textContent = selectedCaseStudy.conversationNote;
  transcriptNavigationElement.replaceChildren(
    ...selectedCaseStudy.conversation.map((conversationTurn, turnIndex) =>
      createTranscriptStep(conversationTurn, turnIndex),
    ),
  );
  conversationMessagesElement.replaceChildren(
    ...selectedCaseStudy.conversation.map((conversationTurn, turnIndex) =>
      createConversationMessage(conversationTurn, turnIndex),
    ),
  );
  selectConversationTurn(explorerState.selectedConversationTurnIndex, false);
}

function lockPageScroll() {
  if (document.body.classList.contains(DIALOG_OPEN_CLASS)) {
    return;
  }
  lockedPageScrollPosition = window.scrollY;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.setProperty("--page-scroll-lock", `-${lockedPageScrollPosition}px`);
  document.body.style.setProperty("--scrollbar-compensation", `${scrollbarWidth}px`);
  document.body.classList.add(DIALOG_OPEN_CLASS);
}

function unlockPageScroll() {
  if (!document.body.classList.contains(DIALOG_OPEN_CLASS)) {
    return;
  }
  document.body.classList.remove(DIALOG_OPEN_CLASS);
  document.body.style.removeProperty("--page-scroll-lock");
  document.body.style.removeProperty("--scrollbar-compensation");
  window.scrollTo({ top: lockedPageScrollPosition, left: 0, behavior: "auto" });
}

function openConversation() {
  explorerState.selectedConversationTurnIndex = 0;
  renderConversation();
  conversationDialog.showModal();
  lockPageScroll();
}

function closeConversation() {
  conversationDialog.close();
}

function updateNavigationButtons() {
  const visibleCaseStudies = getVisibleCaseStudies();
  const selectedCaseIndex = visibleCaseStudies.findIndex(
    (caseStudy) => caseStudy.id === explorerState.selectedCaseId,
  );
  previousCaseButton.disabled = selectedCaseIndex <= 0;
  nextCaseButton.disabled = selectedCaseIndex >= visibleCaseStudies.length - 1;
}

/** @param {boolean} shouldFocus */
function syncSelectedCaseButton(shouldFocus) {
  const selectedCaseButton = caseListElement.querySelector(
    `.case-button[${SELECTED_CASE_ATTRIBUTE}="true"]`,
  );
  if (!selectedCaseButton) {
    return;
  }
  const hasHorizontalOverflow = caseListElement.scrollWidth > caseListElement.clientWidth;
  if (hasHorizontalOverflow) {
    selectedCaseButton.scrollIntoView({
      behavior: getScrollBehavior(),
      block: "nearest",
      inline: "center",
    });
  }
  if (shouldFocus) {
    selectedCaseButton.focus({ preventScroll: true });
  }
}

function focusSelectedCaseHeading() {
  caseDetailElement.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  caseTitleElement.focus({ preventScroll: true });
}

/** @param {string} caseId @param {string} selectionSource */
function selectCaseStudy(caseId, selectionSource) {
  explorerState.selectedCaseId = caseId;
  explorerState.selectedConversationTurnIndex = 0;
  renderCaseList();
  renderCaseDetail();
  syncSelectedCaseButton(selectionSource === CASE_SELECTION_BUTTON);
  if (selectionSource === CASE_SELECTION_SEQUENCE) {
    focusSelectedCaseHeading();
  }
  if (conversationDialog.open) {
    renderConversation();
  }
}

/** @param {number} direction */
function moveCaseSelection(direction) {
  const visibleCaseStudies = getVisibleCaseStudies();
  const selectedCaseIndex = visibleCaseStudies.findIndex(
    (caseStudy) => caseStudy.id === explorerState.selectedCaseId,
  );
  const destinationCaseStudy = visibleCaseStudies[selectedCaseIndex + direction];
  if (destinationCaseStudy) {
    selectCaseStudy(destinationCaseStudy.id, CASE_SELECTION_SEQUENCE);
  }
}

/** @param {string} outcomeFilter */
function applyOutcomeFilter(outcomeFilter) {
  explorerState.activeFilter = outcomeFilter;
  const visibleCaseStudies = getVisibleCaseStudies();
  const isSelectedCaseVisible = visibleCaseStudies.some(
    (caseStudy) => caseStudy.id === explorerState.selectedCaseId,
  );
  if (!isSelectedCaseVisible) {
    explorerState.selectedCaseId = visibleCaseStudies[0].id;
  }
  for (const filterButton of filterButtons) {
    filterButton.setAttribute(
      ACTIVE_FILTER_ATTRIBUTE,
      String(filterButton.dataset.filter === outcomeFilter),
    );
  }
  renderCaseList();
  renderCaseDetail();
  syncSelectedCaseButton(false);
}

for (const filterButton of filterButtons) {
  filterButton.addEventListener("click", () =>
    applyOutcomeFilter(filterButton.dataset.filter),
  );
}
previousCaseButton.addEventListener("click", () => moveCaseSelection(-1));
nextCaseButton.addEventListener("click", () => moveCaseSelection(1));
openConversationButton.addEventListener("click", openConversation);
closeConversationButton.addEventListener("click", closeConversation);
previousMessageButton.addEventListener("click", () =>
  selectConversationTurn(explorerState.selectedConversationTurnIndex - 1, true),
);
nextMessageButton.addEventListener("click", () =>
  selectConversationTurn(explorerState.selectedConversationTurnIndex + 1, true),
);
conversationDialog.addEventListener("click", (clickEvent) => {
  if (clickEvent.target === conversationDialog) {
    closeConversation();
  }
});
conversationDialog.addEventListener("close", () => {
  unlockPageScroll();
  openConversationButton.focus();
});

renderCaseList();
renderCaseDetail();
syncSelectedCaseButton(false);
