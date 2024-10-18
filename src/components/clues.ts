export interface Clue {
    clue: string;
    clueDate: Date;
    solutionLetter: string;
    solutionWord: string;
    solutionExplanation: string;
}

export const ClueError: Clue = {
    clue: "ERROR",
    clueDate: new Date("01/01/2024"),
    solutionLetter: "E",
    solutionWord: "ERROR",
    solutionExplanation: "ERROR"
}

export const CluesList: Clue[] = [
    {
        clue: "JFMAMJJASON",
        clueDate: new Date("10/18/2024"),
        solutionLetter: "D",
        solutionWord: "DECEMBER",
        solutionExplanation: "the months of the year"
    },
    {
        clue: "TESTTWO",
        clueDate: new Date("10/19/2924"),
        solutionLetter: "D2",
        solutionWord: "DECEMBER2",
        solutionExplanation: "the months of the year2"
    },
    {
        clue: "TESTTHREE",
        clueDate: new Date("10/20/2024"),
        solutionLetter: "D3",
        solutionWord: "DECEMBER3",
        solutionExplanation: "the months of the year3"
    }
];