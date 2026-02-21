# 💀 Grimhand Tactics — 🚀 Minimal MVP (Card-Focused)

A lean, modern MVP focused purely on **cards, clarity, and game play feel**.  
No portraits, no meta systems, no progression — just the smallest feature set needed to make the game feel polished and strategic.

[Triskai-deka-phobia-HD.](https://github.com/romualdk/Triskai-deka-phobia-HD)

## 📑 Table of Contents (GitHub‑Optimized)
  - [🎯 MVP Goal](#-mvp-goal)
  - [📱 Screen Layout (Portrait)](#-1-screen-layout-portrait)
  - [🃏 MVP Card Types](#-2-mvp-card-types)
  - [⚡ Core Feedback (High Impact, Low Cost)](#-3-core-feedback-high-impact-low-cost)
  - [🔍 Clarity Features](#-4-clarity-features)
  - [🔄 Turn Flow](#-5-turn-flow)
  - [✨ Visual Polish (Minimal Effort)](#-6-visual-polish-minimal-effort)
  - [⛔ Do NOT Build Yet](#-7-do-not-build-yet)
  - [📋 MVP Feature Checklist](#-8-mvp-feature-checklist)
  - [🏆 Why This MVP Works](#-9-why-this-mvp-works)
## 🎯 MVP Goal

**Make the game feel:**
- Responsive
- Clear
- Strategic
- Polished

**Avoid for now:**
- Character portraits
- Progression systems
- Cosmetics
- Complex abilities

## 📱 1. Screen Layout (Portrait)

### Enemy Zone (Top)

- **Enemy Health Bar**
  - Red HP bar with numeric value
  - Blue overlay for Block
- **Enemy Intent Card**
  - Shows next action:
    - Sword (attack value)
    - Shield (block value)

### Combat Lane (Center)

  Enemy Card | Lucky Slot | Player Card

**Animations**
- Card flip on reveal
- Card movement into lane when played
- Small screen shake on impact

**Floating Numbers**
- Red = damage
- Blue = block

### Player Zone (Bottom)

Energy Row
- 2–3 energy orbs
- Refill animation at start of turn
#### Player Hand
- 4–5 cards in a slight fan layout

Card states:
- Glow = playable
- Dim = not enough energy

#### End Turn Button
- Pulses if energy remains
- Auto-highlight when energy reaches 0


## 🃏 2. MVP Card Types

Keep the system minimal:
- **Sword**
  Deal **X damage**
* **Shield**
  Gain **X block**
* **Lucky 7**
- If total equals 7:
  - Bonus draw **or**
  - +2 energy

### Death Card
- Player loses **5 HP**
- Dramatic flip animation

**Not included yet**
- Status effects
- Combos
- Special abilities


## ⚡ 3. Core Feedback (High Impact, Low Cost)

### Card Animation
- Draw: slide from deck
- Play: move to center lane
- Flip: quick rotation
- Discard: fade downward

### Health Animation
- Smooth HP bar decrease (not instant)

### Impact Feedback
- Screen shake for strong hits (>7 damage)
- Floating numbers:
  - Red = damage
  - Blue = block

### Lucky Slot
- Soft gold glow when active
- Small sparkle when triggered


## 🔍 4. Clarity Features

### **Damage Preview**
When player selects a card:
- Enemy HP shows **ghost damage**
- Text preview:

  Blocked 3 → 5 damage

Removes hidden math and improves decision-making.

### Deck Danger Warning (Death Mechanic)

When deck is low:
- Deck icon pulses purple
- Tooltip:
- > "Death is near"

(No Fate meter yet — keep MVP minimal.)

## 🔄 5. Turn Flow

### Start Turn
1. Energy refills
2. Draw 1 card (slide animation)
3. Enemy intent visible

### Player Turn
- Play cards until energy is depleted
- End Turn

### Enemy Turn
- Enemy card flips
- Apply damage/block effects


## ✨ 6. Visual Polish (Minimal Effort)

### Background
- Dark gradient
- Very slow fog or particle loop

### Cards
- Subtle texture on card backs
- Optional faint shine for rare cards

This removes the “prototype” feel without heavy art requirements.


## ⛔ 7. Do NOT Build Yet

Wait until core gameplay feels good before adding:

- Status effects (Bleed, Hex, etc.)
- Card upgrades
- Meta progression
- Daily quests
- Cosmetic systems
- Boss fights
- Combo mechanics
- Multiple enemies
- Complex abilities


## 📋 8. MVP Feature Checklist

### Gameplay
- Energy system (2–3 per turn)
- Hand size: 4–5 cards
- Sword / Shield / Lucky / Death cards

### UX
- Card play animations
- Health bar animation
- Floating damage numbers
- Damage preview
- Enemy intent display
- Lucky slot glow
- Deck danger warning

### Visual
- Dark animated background
- Clean card layout
- No portraits


## 🏆 9. Why This MVP Works

This version delivers modern expectations:

- Turn decisions (energy system)
- Transparency (damage preview)
- Strong feedback (animations)
- Tension (Death card)
- Unique identity (Lucky mechanic)

Small enough to build quickly, but polished enough for real playtesting.
