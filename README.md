# YouTube Autopilot Agent

Dedicated repository for the YouTube agent. This project is completely separate from the game.

## Goal
Control a user's YouTube channel through browser automation rather than the YouTube Data API.

Flow:
1. User starts the one-time Google/YouTube login.
2. Playwright stores an encrypted/persistent browser session on the agent host.
3. Agent opens YouTube Studio and performs allowed channel-management actions.
4. ChatGPT can send high-level commands to the agent once the control endpoint is connected.

Planned autonomous loop:
research -> topic selection -> script -> media production -> thumbnail -> upload -> scheduling -> comments review -> analytics -> next-topic feedback.

## Important
The channel link identifies the channel but does not grant control. The owner must explicitly sign in and authorize the browser session.

This repository contains no game code.
