import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IQuizProps {}

interface IQuizState {
    Id: number;
    content: string;
    HasFetchedData: boolean;
}

export class Quiz extends React.Component<RouteComponentProps<IQuizProps>, IQuizState> {
    public constructor(props: RouteComponentProps<IQuizProps>) {
        super(props);
        
    }
}
