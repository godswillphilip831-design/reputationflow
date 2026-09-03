/**
 * Professional reply generator for ReputationFlow.
 * Template + keyword based for MVP. Swap with real LLM API later.
 */

type ReplyOptions = {
  rating: number;
  reviewText: string;
  businessName?: string;
  customerName?: string;
};

const positiveOpeners = [
  "Thank you so much for taking the time to share your experience",
  "We're thrilled to hear you had a great experience",
  "Thank you for the wonderful feedback",
  "It means a lot to us that you took the time to leave this review",
];

const negativeOpeners = [
  "Thank you for bringing this to our attention",
  "We're sorry to hear your experience didn't meet expectations",
  "We appreciate you taking the time to share this feedback",
  "Thank you for letting us know about this",
];

const positiveClosers = [
  "We look forward to serving you again soon.",
  "Thanks again for choosing us — we hope to see you again!",
  "Your support means the world to our team.",
  "We're grateful for customers like you.",
];

const negativeClosers = [
  "Please reach out to us directly so we can make this right.",
  "We'd love the opportunity to resolve this for you — feel free to contact us.",
  "Your experience matters, and we're committed to improving.",
  "We're here if you'd like to discuss this further.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function extractFirstName(name?: string): string {
  if (!name) return "";
  return name.split(" ")[0];
}

export function generateReply(options: ReplyOptions): string {
  const { rating, reviewText, businessName = "our team", customerName } =
    options;

  const name = extractFirstName(customerName);
  const greeting = name ? `Hi ${name},` : "Hello,";
  const lower = reviewText.toLowerCase();

  // Detect some common themes
  const mentionsLate = /late|delay|wait|on time|punctual/.test(lower);
  const mentionsPrice = /price|cost|expensive|charge|bill|quote/.test(lower);
  const mentionsMess = /mess|clean|dirty|left behind/.test(lower);
  const mentionsQuality = /quality|workmanship|professional|skilled|great job|excellent/.test(lower);
  const mentionsFriendly = /friendly|kind|helpful|courteous|nice/.test(lower);

  if (rating >= 4) {
    let body = pick(positiveOpeners) + "! ";

    if (mentionsQuality) {
      body +=
        "We're glad the quality of our work stood out to you. ";
    } else if (mentionsFriendly) {
      body +=
        "It's wonderful to hear our team made you feel taken care of. ";
    } else {
      body +=
        "We're happy we could deliver a positive experience. ";
    }

    body += pick(positiveClosers);

    return `${greeting}\n\n${body}\n\n— ${businessName}`;
  }

  // Negative / neutral
  let body = pick(negativeOpeners) + ". ";

  if (mentionsLate) {
    body +=
      "We understand how frustrating delays can be and we're reviewing our scheduling to prevent this in the future. ";
  } else if (mentionsPrice) {
    body +=
      "We always aim for transparent pricing and would like the chance to walk through the details with you. ";
  } else if (mentionsMess) {
    body +=
      "Leaving a clean workspace is a core standard for us — we'll reinforce this with the team. ";
  } else {
    body +=
      "We've shared your comments with the team so we can improve. ";
  }

  body += pick(negativeClosers);

  return `${greeting}\n\n${body}\n\n— ${businessName}`;
}
