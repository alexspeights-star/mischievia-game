# Claude Code Prompt for Mischievia

You are modifying a VS Code web game project called **Mischievia: Saint or Sinner?**

## Goal

Make this game feel like a premium, chaotic, funny, modern party-card game that can eventually be embedded into Squarespace.

The vibe is:

- Christian skate park
- neon heaven vs hell
- premium dark UI
- funny but emotionally real
- not cheesy
- not preachy
- playable by teens, young adults, and adults
- reflective without feeling like Sunday school homework

## Hard rules

1. Use vanilla HTML, CSS, and JavaScript.
2. Do not add React, npm, build tools, external libraries, or backend requirements.
3. Keep CSS scoped under `#mischievia-game`.
4. Do not globally style normal Squarespace buttons, body text, headings, or links when preparing embed code.
5. Keep the game mobile-first and desktop-polished.
6. Preserve the existing file structure unless asked otherwise.

## Current files

- `index.html`
- `styles.css`
- `cards.js`
- `app.js`

## Improve these areas

### UI/UX

Make the game feel more animated and addictive:

- better card entrance animation
- more tactile answer selection
- stronger powerup effects
- richer final Soul Report
- mobile responsiveness
- stronger visual hierarchy
- more polished start screen

### Gameplay

Add or improve:

- better local Party Mode
- better Hot Seat Mode
- turn tracking
- player names
- more meaningful round summaries
- badges
- unlockable titles
- streaks
- better scoring explanations

### Powerups

Current powerups:

- Holy Water
- Guardian Angel
- Demon Whisper
- Redemption
- Double Trouble

Improve animations and feedback. Keep them funny and useful.

### Sound

Current sound is generated with tiny browser tones.

Improve the placeholder system so it is easy to replace with real audio later.

Create named sound functions:

- playHoverSound()
- playSelectSound()
- playPowerupSound()
- playMischiefSound()
- playRedemptionSound()
- playLevelUpSound()

## Card-writing rules

When adding cards, make them modern, funny, and emotionally honest.

Do not make every “right” answer obvious.

Topics to include:

- social media jealousy
- ex texting late at night
- gossip
- group chats
- church drama
- comparison
- dating boundaries
- fake friends
- forgiveness
- lying to avoid conflict
- temptation
- pride
- revenge posting
- passive-aggressive comments
- feeling left out
- spiritual growth
- jealousy
- anxiety
- people pleasing
- cancel culture
- oversharing
- secret screenshots
- situationships
- old habits
- accountability
- envy
- insecurity
- anger
- family conflict
- workplace drama
- school drama
- recovery / leaving old patterns

Tone examples:

- “That was not wisdom. That was chaos wearing a cardigan.”
- “Your thumb moved before wisdom got a vote.”
- “This is how group chats become crime scenes.”
- “Closure just texted you wearing a fake mustache.”
- “You didn’t want answers. You wanted emotional fireworks.”
- “That was mature… suspiciously mature. We’re watching you.”

## Card data structure

Cards live in `cards.js`.

Use this structure exactly:

```js
{
  id: "",
  title: "",
  scenario: "",
  options: [
    {
      label: "A",
      text: "",
      scores: {
        temptation: 0,
        gossip: 0,
        pride: 0,
        fear: 0,
        relationships: 0,
        chaos: 0,
        growth: 0
      },
      mischief: 0,
      breakdown: "",
      roast: "",
      reflection: ""
    }
  ]
}
```

## Output expectation

When asked to modify the game, edit the existing files cleanly. Do not rewrite the whole project unless necessary.
