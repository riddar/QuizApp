import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class Score {
    id: number;
    points: number;
    date: string;
    timeTaken: number;
    questionId: number;
}

class Alternative {
    id: number;
    content: string;
    isTrue: boolean;
    question: Question;
    questionId: number;
}

class Question {
    id: number;
    time: number;
    content: string;
    Scores: Score[];
    Alternatives: Alternative[];
}

interface IEditState {
    Questions: Question[];
    Alternatives: Alternative[];
    loading: boolean;
}

export class Edit extends React.Component<RouteComponentProps<{}>, IEditState> {
    public constructor() {
        super();
        
    }
}
