import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IEditProps {}

interface IEditState {
    Id: number;
    content: string;
    HasFetchedData: boolean;
}

export class Edit extends React.Component<RouteComponentProps<{}>, IEditState> {
    public constructor() {
        super();
        
    }
}
