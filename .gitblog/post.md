---
title: Snakey
summary: The Snake you played on a Nokia 3310, rebuilt in under 200 lines of plain JavaScript. It plays in your browser and gets faster the longer you survive.
playable: true
imageAlt: A green snake fifteen segments long turning towards a red food square on a dark 20 by 20 grid, with the score at 12
---

## What it is

Snakey is the classic Snake game, in the style of the one on the Nokia 3310. You steer with the arrow keys, eat the red squares to grow, and the game ends when you hit a wall or your own tail. Your best score is remembered between visits.

**[Play it in your browser](https://thatadamroberts.github.io/Snakey/)**, or press Play above to play it right here. You'll need a keyboard: it's arrow keys only.

## Why I built it

<!-- TODO: Write this in your own words. Nostalgia for the 3310? A first canvas project? A warm-up before the bigger games? -->

## Small on purpose

The whole game is three files: an HTML page, a stylesheet and 175 lines of JavaScript with no libraries. The board is a 20 × 20 grid drawn on a 200-pixel canvas, and the snake is just a list of grid squares. Each step adds a new square at the head and removes one from the tail, unless the snake has just eaten, in which case the tail stays and the snake grows by one.

A few details make it feel right:

- **It speeds up.** The snake starts at one step every 150 milliseconds and gets 10 milliseconds faster for every five points, until it reaches one step every 50 milliseconds.
- **You can't turn back on yourself.** A key press is stored and only applied on the next step, and the game checks it against the direction you're actually moving. So two quick presses can't reverse the snake into its own body.
- **Food never lands on the snake.** New food is placed on a random square, and the game picks again if that square is part of the snake.
- **Your high score is kept** in the browser's local storage, so it survives closing the tab.

## What's next

<!-- TODO: Plans? Touch controls for phones would be a natural next step: it's keyboard-only today. Others: wrap-around walls, sound, or a proper Nokia-green screen. -->
