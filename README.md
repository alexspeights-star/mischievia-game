# Mischievia: Saint or Sinner?

A Claude/VS Code-friendly starter project for your interactive card game.

## Files

- `index.html` — game markup and script/style references
- `styles.css` — all visuals and animations
- `cards.js` — card pack / scenario data
- `app.js` — game logic, scoring, powerups, reports
- `CLAUDE_PROMPT.md` — prompt to give Claude Code when modifying this project

## How to preview locally

Open `index.html` in a browser.

## How to add cards

Edit `cards.js`.

Each card uses this structure:

```js
{
  id: "unique-id",
  title: "Card Title",
  scenario: "Scenario text",
  options: [
    {
      label: "A",
      text: "Choice text",
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

## Squarespace embed note

For final Squarespace embed, you can combine:

1. The game HTML inside `#mischievia-game`
2. `styles.css` inside `<style>...</style>`
3. `cards.js` and `app.js` inside `<script>...</script>`

Keep all CSS scoped under `#mischievia-game`.
