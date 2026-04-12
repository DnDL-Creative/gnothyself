/**
 * Blog post data. Replace placeholder body content with real copy.
 * Each post is keyed by slug for easy lookup.
 */

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  readTime: string;
  body: string[];
}

export const posts: Record<string, BlogPost> = {
  "new-age-grift": {
    slug: "new-age-grift",
    title: "New Age Grift",
    subtitle: "When spirituality becomes a sales funnel",
    date: "Apr 11, 2026",
    tags: ["manipulation", "fake authenticity"],
    readTime: "6 min read",
    body: [
      "Somewhere along the way, spirituality got an Instagram account and a ring light. Now every 22-year-old 'Intuitive' with 200k followers and a link in bio is selling you your own soul back at a markup. And let's be honest about why it works. It's not the message. It's the messenger. She's a 10. The guys are simping. The comments are 'omg queen you changed my life.' Nobody's asking what the actual credentials are because nobody cares. That's the grift.",
      "Meanwhile, the real stuff gets buried. Copper has been used for thousands of years. Tesla understood frequencies and energy in ways we're still catching up to. And what did they do? They stole his work, slapped Elon Musk's name on a car company, and called it innovation. The ancient tech is real. It just doesn't have a content strategy.",
      "That's where we come in. We're not the guru. We're the middle ground. Physical products rooted in things humans have known for centuries, sold without the theatrics. No activation codes. No $444 Zoom calls. Just copper, orgone, and a little bit of 'figure it out yourself.'",
    ],
  },
  "truth-isnt-linear": {
    slug: "truth-isnt-linear",
    title: "Truth Isn't Linear",
    subtitle: "On the obsession with being right",
    date: "Apr 18, 2026",
    tags: ["NPCs", "false truth"],
    readTime: "8 min read",
    body: [
      "Everyone wants to be right. Left wants to be right. Right wants to be right. Science wants to be right. Religion wants to be right. And they're all so busy being right that nobody's noticed they're having completely different conversations.",
      "Truth isn't a line from A to B. It's not a political compass. It's not a peer-reviewed study. It's not what your pastor told you. Truth is the thing that's left when you strip away every agenda, every institution, every incentive structure designed to make you pick a side.",
      "The problem with sides is that they need enemies. And when you need an enemy, truth becomes a weapon instead of a destination.",
      "[Your content here. Replace this paragraph with your take.]",
    ],
  },
  "will-we-split-in-two": {
    slug: "will-we-split-in-two",
    title: "Humanity Has Already Split",
    subtitle: "The torus, the pendulum, and the pattern",
    date: "Apr 25, 2026",
    tags: ["NPCs", "the future"],
    readTime: "10 min read",
    body: [
      "There's a theory that humanity is undergoing a bifurcation. Not in the sci-fi sense. In the pattern sense. Like a torus field that's been destabilized. One half spiraling toward awareness, the other doubling down on the program. And the gap between them is getting wider every day.",
      "You can see it in conversations that go nowhere. In friendships that quietly dissolved between 2020 and 2023. In the look on someone's face when you mention something outside the approved narrative and they short-circuit.",
      "This isn't about being better than anyone. It's about recognizing that not everyone is going to make it to the same place. And that's okay. The pendulum swings. The torus turns. The pattern doesn't care about your feelings.",
      "[Your content here. Replace this paragraph with your take.]",
    ],
  },
};

export function getPost(slug: string): BlogPost | undefined {
  return posts[slug];
}

export function getAllSlugs(): string[] {
  return Object.keys(posts);
}
