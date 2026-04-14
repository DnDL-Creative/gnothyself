/**
 * Seed script — inserts all 6 blog posts into Supabase itg_posts table.
 * Content is stored as HTML strings (same format as DNDL posts table).
 * Run: node sql/seed_posts.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gpjgvdpicjqrerqqzhyx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwamd2ZHBpY2pxcmVycXF6aHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDI0MDgsImV4cCI6MjA4MTIxODQwOH0.Q0-KfwAW480-3Q68uTQTU4UufypcoMQ9JS_R12sRadE"
);

const posts = [
  {
    title: "new age grift",
    slug: "new-age-grift",
    date: "Apr 11, 2026",
    author: "intheGno",
    tag: "manipulation",
    published: true,
    content: `<p>Somewhere along the way, spirituality got an Instagram account and a ring light. Now every 22-year-old 'Intuitive' with 200k followers and a link in bio is selling you your own soul back at a markup. And let's be honest about why it works. It's not the message. It's the messenger. She's a 10. The guys are simping. The comments are 'omg queen you changed my life.' Nobody's asking what the actual credentials are because nobody cares. That's the grift.</p>
<p>The wellness-to-wealth pipeline is simple. Start with a genuine curiosity about the world, acquire three crystals and an ayahuasca story, develop a 'methodology' that is really just repackaged Hermeticism with better branding, launch a course. The course leads to a mastermind. The mastermind leads to a certification. Now you're training people to train people. It's an MLM with sage.</p>
<h2>the real stuff gets buried</h2>
<p>Meanwhile, the real stuff gets buried. Copper has been used for thousands of years. Tesla understood frequencies and energy in ways we're still catching up to. And what did they do? They stole his work, slapped Elon Musk's name on a car company, and called it innovation. The ancient tech is real. It just doesn't have a content strategy.</p>
<p>Orgone energy was documented by Wilhelm Reich. They literally burned his books and threw him in jail where he died. Tensor rings produce measurable electromagnetic effects. But none of that makes for a good Reel, so nobody talks about it. Instead you get a girl in Bali telling you to 'raise your vibration' while charging $333 for a voice note.</p>
<h2>no activation codes required</h2>
<p>That's where we come in. We're not the guru. We're the middle ground. Physical products rooted in things humans have known for centuries, sold without the theatrics. No activation codes. No $444 Zoom calls. Just copper, orgone, and a little bit of 'figure it out yourself.'</p>
<p>The truth is, the people who actually know things tend to be quiet about it. They're not on stage at Wanderlust. They're in their garage winding copper coils. They're reading suppressed patents from the 1940s. They're building and testing, not filming. That's the energy we're channeling here. Less content, more substance.</p>`,
  },
  {
    title: "truth isn't linear",
    slug: "truth-isnt-linear",
    date: "Apr 18, 2026",
    author: "intheGno",
    tag: "NPCs",
    published: true,
    content: `<p>Everyone wants to be right. Left wants to be right. Right wants to be right. Science wants to be right. Religion wants to be right. And they're all so busy being right that nobody's noticed they're having completely different conversations.</p>
<p>You ever watch two people argue online and realize neither one of them is even disagreeing? They're just performing. One's performing for their tribe. The other's performing for theirs. The actual content of what they're saying is irrelevant. It's sports. It's jerseys. It's 'my team versus your team' dressed up as intellectual discourse.</p>
<h2>truth without agenda</h2>
<p>Truth isn't a line from A to B. It's not a political compass. It's not a peer-reviewed study. It's not what your pastor told you. Truth is the thing that's left when you strip away every agenda, every institution, every incentive structure designed to make you pick a side.</p>
<p>Here's the uncomfortable part: truth doesn't care about your feelings, your identity, or your worldview. It doesn't care that you spent four years getting a degree that taught you one specific lens to see everything through. It doesn't care that admitting you were wrong would unravel your entire social circle. Truth just is. And most people can't handle that because truth frequently requires you to sit in the deeply uncomfortable space of not knowing.</p>
<h2>sides need enemies</h2>
<p>The problem with sides is that they need enemies. And when you need an enemy, truth becomes a weapon instead of a destination. Every institution, every ideology, every movement eventually calcifies into a machine that exists to perpetuate itself. The cause becomes secondary. The survival of the structure becomes primary.</p>
<p>Watch how fast a 'truth movement' excommunicates someone who questions its own dogma. Watch how fast a 'free thinker' community develops its own orthodoxy. The pattern repeats because it's not about truth. It's about belonging. And belonging requires conformity. And conformity is the opposite of seeking.</p>
<p>So where does that leave the rest of us? Somewhere in the middle. Uncomfortable. Unaffiliated. Holding contradictions in both hands and refusing to drop either one. That's not fence-sitting. That's the only honest place to stand.</p>`,
  },
  {
    title: "humanity has already split",
    slug: "will-we-split-in-two",
    date: "Apr 25, 2026",
    author: "intheGno",
    tag: "NPCs",
    published: true,
    content: `<p>There's a theory that humanity is undergoing a bifurcation. Not in the sci-fi sense. In the pattern sense. Like a torus field that's been destabilized. One half spiraling toward awareness, the other doubling down on the program. And the gap between them is getting wider every day.</p>
<p>You've felt it. You just might not have named it yet. The conversations that used to flow naturally with certain people now hit a wall three sentences in. The topics you can't bring up at dinner anymore. The friendships that just... faded. Not because of a fight. Because of a frequency mismatch.</p>
<h2>the quiet dissolution</h2>
<p>You can see it in conversations that go nowhere. In friendships that quietly dissolved between 2020 and 2023. In the look on someone's face when you mention something outside the approved narrative and they short-circuit. It's not anger. It's not disagreement. It's a total inability to even process the information. Like the file format isn't compatible.</p>
<p>This isn't about intelligence. Some of the sharpest people you know are the most deeply programmed. The program was designed for sharp people. It rewards pattern recognition within approved parameters and punishes pattern recognition outside of them. So the smart ones learn to stay inside the lines with more sophistication and they call it 'critical thinking.'</p>
<h2>the pattern doesn't care</h2>
<p>This isn't about being better than anyone. It's about recognizing that not everyone is going to make it to the same place. And that's okay. The pendulum swings. The torus turns. The pattern doesn't care about your feelings.</p>
<p>Nature bifurcates constantly. Rivers fork. Cells divide. Species branch. It's not punishment. It's physics. And if you look at human civilization as a living system, which it is, then bifurcation isn't just possible. It's inevitable.</p>
<p>The question isn't whether it's happening. The question is whether you're paying enough attention to notice which direction you're spiraling. Because the loop is closing. And the window where you could casually straddle both realities is getting smaller every day.</p>`,
  },
  {
    title: "what is freedom",
    slug: "what-is-freedom",
    date: "May 2, 2026",
    author: "intheGno",
    tag: "sovereignty",
    published: true,
    content: `<p>Freedom isn't a flag. It isn't a constitution. It isn't the right to choose between two pre-selected candidates every four years and call it 'democracy.' Freedom isn't even the absence of chains. Because the most effective chains are the ones you can't see. The ones you put on yourself. The ones you defend.</p>
<p>You were born into a system that assigned you a number before you could speak, enrolled you in a program before you could think, and convinced you that obedience was opportunity. You didn't choose your name. You didn't choose your country. You didn't choose your religion. But you'll fight to the death to defend all three. That's not freedom. That's programming with a patriotic soundtrack.</p>
<h2>the ownership illusion</h2>
<p>You don't own your house. You rent it from the government and call it 'property tax.' You don't own your car. Try not registering it. You don't own your body. Try putting an unapproved substance in it. You don't even own your children. Try educating them outside the approved curriculum.</p>
<p>Every single thing you think you 'own' exists at the pleasure of a system that can revoke it at any time. And they've gotten so good at this that you actually feel grateful for the privilege. 'At least we're not North Korea.' The bar isn't just low. It's underground.</p>
<h2>real freedom is internal</h2>
<p>Real freedom starts with the most terrifying act a human being can perform: thinking for yourself. Not thinking what your favorite podcast host thinks. Not thinking what your feed tells you to think. Actually sitting in silence with a question and refusing to accept an answer until it resonates in your body. Not your ego. Your body.</p>
<p>Freedom is the willingness to be wrong. The willingness to lose friends. The willingness to be called crazy, dangerous, or irresponsible by people who have never once questioned the system they're defending. Freedom costs everything comfortable. And that's exactly why most people will never have it.</p>`,
  },
  {
    title: "how they're cooking us",
    slug: "how-theyre-cooking-us",
    date: "May 9, 2026",
    author: "intheGno",
    tag: "vessel",
    published: true,
    content: `<p>You are being poisoned. Slowly. Legally. With full FDA approval. The food you eat, the water you drink, the air in your home, the signal from your router — every single one of these has been deliberately degraded over the last 80 years. Not by accident. By design. Because a sick population is a profitable population. And a foggy mind is an obedient mind.</p>
<p>Look at the ingredients on anything in the center aisles of your grocery store. Red 40. High fructose corn syrup. Sodium benzoate. Butylated hydroxytoluene. These aren't foods. They're industrial chemicals that happen to be edible. Most of them are banned in Europe. All of them are approved here. Ask yourself why.</p>
<h2>the frequency assault</h2>
<p>Then there's the invisible stuff. Your phone emits radiation. Your WiFi router emits radiation. Your smart meter emits radiation. Your microwave, your Bluetooth earbuds, your smart TV — all of it. Independently, each one is 'within safe limits.' But nobody's studying what happens when you stack all of them in a 1,200 square foot apartment and marinate in it for 16 hours a day.</p>
<p>The natural frequency of the earth is 7.83 Hz. The Schumann resonance. Your brain, when calm, operates at roughly the same frequency. That's not a coincidence. You are designed to be in tune with the planet. But we've built an entire civilization that operates at frequencies that compete with, override, and disrupt that connection. And then we call the resulting anxiety 'a chemical imbalance' and sell you pills.</p>
<h2>reclaiming the vessel</h2>
<p>This isn't a call to live in a cave. It's a call to pay attention. Filter your water. Read your labels. Turn off your WiFi at night. Ground your body. Eat things that were alive recently. Minimize the inputs that weren't designed for your biology.</p>
<p>Your body is the only piece of technology you actually own. They know this. That's why they're attacking it from every angle. Not with a single kill shot — that would be too obvious. With a slow, ambient, plausibly-deniable degradation that you don't notice until you're 40 and on three medications and can't remember what it felt like to feel good.</p>
<p>Copper helps. Orgone helps. Grounding helps. But the first step is simply admitting that the environment you've built around yourself is not neutral. It's hostile. And it was designed to be.</p>`,
  },
  {
    title: '"violence is not the answer"',
    slug: "violence-is-never-the-answer",
    date: "May 16, 2026",
    author: "intheGno",
    tag: "hypocrisy",
    published: true,
    content: `<p>It's a wonderful sentiment. Really. 'Violence is never the answer.' You hear it from politicians after school shootings. From pundits after protests. From teachers in classrooms funded by a military budget larger than the next nine countries combined. The people saying it are standing on land that was taken by violence, protected by violence, and maintained by the threat of violence. But sure. Violence is never the answer.</p>
<p>The hypocrisy isn't even hidden anymore. It's structural. It's load-bearing. The entire system runs on it. You can't question it because questioning it would require acknowledging that everything comfortable about your life was built on a foundation of blood. And nobody wants to do that before their morning coffee.</p>
<h2>sanctioned vs unsanctioned</h2>
<p>There's a very simple rule operating beneath the surface of every society: violence performed by the state is order. Violence performed by the individual is crime. That's it. That's the whole framework. A drone strike that kills a wedding party is 'collateral damage.' A man defending his home is 'a threat to public safety.' Same act. Different uniform.</p>
<p>They'll send your 18-year-old to die in a desert for reasons that were classified at the time and debunked a decade later, and they'll put a flag on the coffin and call it service. But if that same kid punches a cop at a protest, he's a domestic terrorist. The violence isn't the problem. The lack of authorization is the problem.</p>
<h2>the grift of pacifism</h2>
<p>Pacifism, as sold to the public, is a control mechanism. It teaches you that your only moral option is to absorb harm. To protest peacefully. To vote. To write letters. To change your profile picture. Meanwhile, the people you're protesting against have tanks, surveillance networks, and the legal authority to make you disappear.</p>
<p>This isn't an endorsement of violence. This is an observation that the people who benefit most from your nonviolence are the ones telling you it's a virtue. History is full of moments where nothing changed until something broke. They don't teach you those moments in school. They teach you about the speeches that came before the breaking and pretend the speeches did the work.</p>
<p>The answer isn't violence. But it certainly isn't the version of peace they're selling you either. Because that version of peace is just obedience with better marketing.</p>`,
  },
];

async function seed() {
  console.log("Seeding itg_posts with HTML content...");

  for (const post of posts) {
    const { error } = await supabase
      .from("itg_posts")
      .upsert(post, { onConflict: "slug" });

    if (error) {
      console.error(`❌ Failed to seed "${post.slug}":`, error.message);
    } else {
      console.log(`✅ ${post.slug}`);
    }
  }

  console.log("Done.");
}

seed();
