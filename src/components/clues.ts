export interface Clue {
    clue: string;
    clueDate: Date;
    solutionLetter: string;
    solutionWord: string;
    solutionExplanation: string;
    solutionExplanationDescription: string;
}

export const ClueError: Clue = {
    clue: "ERROR",
    clueDate: new Date("2024-01-01"),
    solutionLetter: "E",
    solutionWord: "ERROR",
    solutionExplanation: "ERROR",
    solutionExplanationDescription: "ERROR"
}

export const CluesList: Clue[] = [
    {
        clue: "JFMAMJJASON",
        clueDate: new Date("2024-10-18:00:00:00"),
        solutionLetter: "D",
        solutionWord: "DECEMBER",
        solutionExplanation: "the months of the year",
        solutionExplanationDescription: "The months of the year"
    },
    {
        clue: "TESTTWO",
        clueDate: new Date("2024-10-19:00:00:00"),
        solutionLetter: "D2",
        solutionWord: "DECEMBER2",
        solutionExplanation: "the months of the year2",
        solutionExplanationDescription: "The months of the year2"
    },
    {
        clue: "TESTTHREE",
        clueDate: new Date("2024-10-20:00:00:00"),
        solutionLetter: "D3",
        solutionWord: "DECEMBER3",
        solutionExplanation: "the months of the year3",
        solutionExplanationDescription: "The months of the year3"
    }
];