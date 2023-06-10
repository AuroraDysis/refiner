/**
 * Mock polisher.
 *
 * Replaces some occurrences in the text:
 *
 * - "I" -> "we"
 * - "my" -> "our"
 * - "me" -> "us"
 * - "mine" -> "ours"
 * ...
 *
 * Implementation uses the mapping from old to new words.
 *
 * @param text
 */
export async function mockPolishProse(text: string): Promise<string> {
  const words = text.split(" ");
  const newWords = words.map((word) => mapping.get(word) ?? word);
  return newWords.join(" ");
}

const mapping: Map<string, string> = new Map([
  ["I", "we"],
  ["my", "our"],
  ["me", "us"],
  ["mine", "ours"],
  ["myself", "ourselves"],
  ["I'm", "we're"],
  ["I've", "we've"],
  ["I'll", "we'll"],
  ["I'd", "we'd"],
  ["the", "a"],
  ["The", "A"],
  ["this", "that"],
  ["This", "That"],
  ["these", "those"],
  ["These", "Those"],
  ["here", "there"],
  ["Here", "There"],
  ["now", "then"],
  ["Now", "Then"],
  ["today", "that day"],
  ["Today", "That day"],
  ["yesterday", "the day before"],
  ["Yesterday", "The day before"],
  ["tomorrow", "the next day"],
  ["Tomorrow", "The next day"],
  ["last", "previous"],
  ["Last", "Previous"],
  ["next", "following"],
  ["Next", "Following"],
  ["ago", "before"],
  ["Ago", "Before"],
  ["in", "before"],
  ["In", "Before"],
  ["to", ""],
  ["To", ""],
]);