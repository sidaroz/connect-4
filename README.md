## The Challenge

We have created a very simple Connect 4 game using some of our favorite [front-end technologies](#technology-choices). The rules of the game are simple: the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally) wins. There is one issue that we'd like you to solve: the logic to determine a winner does not check for 4 in a row diagonally, you should implement this logic with tests. We've also come up with a list of [possible improvements](#possible-improvements). Feel free to implement as many or as few of these as you like or try something not on this list (you have complete creative freedom). We understand that your time is precious so try not to spend more than a couple of hours on this.

## Getting Started

`npm i` - install dependences

`npm start` - run the application

`npm t` - run the tests

## Possible Improvements

- Persist game state between sessions (hint - https://recoiljs.org/docs/guides/atom-effects#local-storage-persistence)
- Record and present game stats
- Allow players to select their name and color
- Play againt a bot
- Increase unit test coverage
- Add end-to-end tests
- UX improvements
- Responsive styles
- Performance optimization

## Technology Choices

- React
- Typescript
- Create React App
- React Testing Library
- [Chakra UI](https://chakra-ui.com/docs/components)
- [RecoilJS](https://recoiljs.org/)

## Changelog

[x] Added two unit tests one to test diagonal upwards to the right and other diagonal downwards to the right (Followed TDD principals)
[x] Added diagonal win feature (tried to use the same methodology of horizontal win to show my adaptability) in usePlayPiece.ts
[x] Added state atoms for player scores and player names & colours
[x] Changed const file to have variables with default player names and colours
[x] Added two components Scores.tsx and Settings.tsx using Chakra-ui
[x] Scores shows user scores on the app and settings allows you to configure player name's and colours
[x] Used recoil to state manage properties so no need to rerender the page
[x] Managed to have board persistance and active player persistance along with scores using AtomEffects from recoil

## Comments

- This was my first time understanding Typescript syntax so it took me a while to comprehend the codebase and everything going on.
- First time using Chakra-ui and Recoil too as state management.
- Chakra-ui was really easy to use and complements React really well.
- Recoil was interesting to use, it took me a bit to read docs and understand what was going on but once I did utilising it was really simple.
- I noticed that my tests fail when adding the AtomEffect to the board state, from debuggin I think its to do with setting the new value in the localstorage as a string that is messing it up, in './state/game.ts' commenting out line 85 allows all tests to pass but obviously removes board state persistance between sessions.
