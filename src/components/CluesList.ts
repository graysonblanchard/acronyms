export interface Clue {
    clue: string;
    clueDate: Date;
    solutionLetter: string;
    solutionWord: string;
    solutionExplanation: string;
    hint: string;
}

export const ClueError: Clue = {
    clue: "ERROR",
    clueDate: new Date("01/01/2024"),
    solutionLetter: "E",
    solutionWord: "ERROR",
    solutionExplanation: "ERROR",
    hint: "ERROR"
}

export const CluesList: Clue[] = [
    {
        clue: "JFMAMJJASON",
        clueDate: new Date("10/18/2024"),
        solutionLetter: "D",
        solutionWord: "DECEMBER",
        solutionExplanation: "the months of the year",
        hint: ''
    },
    {
        clue: "DJABBI",
        clueDate: new Date("10/19/2024"),
        solutionLetter: "C",
        solutionWord: "COVER",
        solutionExplanation: "\"Don't judge a book by its cover\"",
        hint: ''
    },
    {
        clue: "APIWAT",
        clueDate: new Date("10/20/2024"),
        solutionLetter: "W",
        solutionWord: "WORDS",
        solutionExplanation: "\"A picture is worth a thousand words\"",
        hint: ''
    },
    {
        clue: "WTAWTA",
        clueDate: new Date("10/21/2024"),
        solutionLetter: "W",
        solutionWord: "WAY",
        solutionExplanation: "\"Where there's a will, there's a way\"",
        hint: ''
    }, 
    {
        clue: "ACIOASAIW",
        clueDate: new Date("10/22/2024"),
        solutionLetter: "L",
        solutionWord: "LINK",
        solutionExplanation: "\"A chain is only as strong as its weakest link\"",
        hint: 'Teamwork'
    },
    {
        clue: "DCYCBT",
        clueDate: new Date("10/23/2024"),
        solutionLetter: "H",
        solutionWord: "HATCH",
        solutionExplanation: "\"Don't count your chickens before they hatch\"",
        hint: 'Eggs'
    } 
];

// Actions speak louder than words, but not always.
// A picture is worth a thousand words.
// A journey of a thousand miles begins with a single step.
// All that glitters is not gold.
// Don't count your chickens before they hatch.
// Rome wasn’t built in a day, but it fell quickly.
// Better late than never, but never late is better.
// You can’t have your cake and eat it too.
// The grass is always greener on the other side.
// When life gives you lemons, make lemonade.
// A chain is only as strong as its weakest link.
// Don’t put all your eggs in one basket.
// The pen is mightier than the sword.
// Beauty is in the eye of the beholder.
// What doesn’t kill you makes you stronger.
// It’s better to have loved and lost than never to have loved at all.
// Every cloud has a silver lining.
// You can lead a horse to water, but you can't make it drink.
// Birds of a feather flock together.
// Time and tide wait for no man.
// Absence makes the heart grow fonder.
// There’s no place like home, sweet home.
// All good things must come to an end.
// The early bird catches the worm.
// People who live in glass houses shouldn’t throw stones.
// Don’t bite the hand that feeds you.
// Where there’s a will, there’s a way.
// A rolling stone gathers no moss.
// Two heads are better than one.
// You can’t judge a book by its cover.