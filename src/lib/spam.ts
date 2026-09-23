/**
 * Spam checks for the public review form.
 *
 * These are pure functions with no I/O and no imports, so they can be reasoned
 * about — and tested — without a database. The one check that does need state
 * (the per-IP rate limit) lives in reviews.server.ts and counts rows in the
 * table itself, which is why no extra infrastructure appears anywhere here.
 *
 * Honest framing: this raises the bar a lot but cannot make an open form
 * spam-proof. Publishing is instant, by the owner's choice, so a determined
 * human — or a bot built specifically for this site — can still get through.
 * The admin page is the backstop for whatever does.
 */

/**
 * The hidden field a bot fills in and a person never sees.
 *
 * The name is deliberately meaningless, and the label the form pairs with it
 * says "Leave this field empty" rather than anything a browser could act on.
 * That is not decoration: the obvious choice — a field called `website` or
 * `url` with a "Website" label — is precisely what Chrome's address autofill
 * looks for, and a password manager filling it would mark a real visitor as a
 * bot. The name and the label are the mitigation, so changing either back to
 * something descriptive would reintroduce that.
 */
export const HONEYPOT_FIELD = "novamind_extra";

/**
 * A person cannot read the form, decide on stars, type a review and submit in
 * under three seconds. A script can. Timestamps for this are taken from the
 * clock at render time, so the check is on elapsed time rather than any
 * absolute value a client could simply claim.
 */
export const MIN_FILL_MS = 3000;

/** A genuine review might link to its own company site. Two links is a pitch. */
export const MAX_LINKS = 1;

export const RATE_LIMIT_MAX = 3;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/**
 * Terms that essentially never appear in a real review of a software agency.
 *
 * This list is deliberately short and blunt. A blunt profanity filter would
 * reject a customer writing "the launch was a mess" — and losing a genuine
 * negative review is a worse outcome than letting a rude word through, because
 * the negative reviews are the ones that make the good ones believable. So this
 * catches spam categories and the handful of hard slurs, and leaves tone alone.
 */
const BANNED_TERMS = [
  // Spam categories
  "casino",
  "viagra",
  "cialis",
  "payday loan",
  "forex signals",
  "binary options",
  "sportsbook",
  "replica watch",
  "replica handbags",
  "buy followers",
  "guest post",
  "backlink package",
  "crypto giveaway",
  "adult webcam",
  // Hard slurs, listed without repetition
  "nigger",
  "faggot",
  "retard",
] as const;

/**
 * A deliberately plain link detector: explicit schemes, `www.`, and bare
 * hostnames on the TLDs spam tends to use. It does not try to be a URL parser —
 * the goal is counting obvious links, and a false negative here only means the
 * rate limiter has to do the work instead.
 */
const LINK_PATTERN =
  /(?:https?:\/\/\S+|www\.\S+|\b[\w-]+\.(?:com|net|org|io|ru|cn|info|biz|xyz|top|online|site|shop|link|click)\b)/gi;

function escapeForRegex(term: string): string {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const BANNED_PATTERN = new RegExp(
  `\\b(?:${BANNED_TERMS.map(escapeForRegex).join("|")})\\b`,
  "i",
);

/**
 * Strip the characters that exist only to break up a keyword: zero-width joiners
 * and spaces, soft hyphens, and full-width forms that look like ASCII.
 *
 * This is not a serious anti-evasion measure and is not presented as one — a
 * determined evader with `v1agra` gets past it. It only removes the laziest
 * tricks, and the comment says so rather than implying more.
 */
function normalise(text: string): string {
  return text
    .replace(/[​-‍﻿­]/g, "")
    .replace(/[！-～]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0),
    );
}

export function countLinks(text: string): number {
  return normalise(text).match(LINK_PATTERN)?.length ?? 0;
}

export interface SpamVerdict {
  spam: boolean;
  /**
   * Short machine-readable reason for the server log — never shown to the
   * sender, because telling a bot exactly which check caught it is how it learns
   * to get past that check.
   */
  reason?: "honeypot" | "too-fast" | "links" | "banned-term";
}

/**
 * Screen one submission.
 *
 * `fields` is every piece of text the sender wrote, concatenated by the caller,
 * so a link or a banned term hidden in the name or the job title is caught the
 * same as one in the body.
 */
export function screenSubmission(input: {
  fields: string;
  honeypot: string;
  elapsedMs: number;
}): SpamVerdict {
  // Checked first because it is the only certain signal here: a real browser
  // leaves this field empty because it is never rendered and cannot be reached
  // by keyboard or screen reader.
  if (input.honeypot.trim() !== "") {
    return { spam: true, reason: "honeypot" };
  }

  // A missing or absurd elapsed time is treated as suspicious rather than
  // trusted. `Number.isFinite` also rejects NaN, which is what a client sends if
  // it omits the field and something coerces it.
  if (!Number.isFinite(input.elapsedMs) || input.elapsedMs < MIN_FILL_MS) {
    return { spam: true, reason: "too-fast" };
  }

  const text = normalise(input.fields);

  if (countLinks(text) > MAX_LINKS) {
    return { spam: true, reason: "links" };
  }

  if (BANNED_PATTERN.test(text)) {
    return { spam: true, reason: "banned-term" };
  }

  return { spam: false };
}
