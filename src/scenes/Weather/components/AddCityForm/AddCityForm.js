import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { CacheService } from '../../../../services/CacheService/CacheService'//todo webpack parse path

export class AddCityForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    @autobind
    onChangeHandler(event) {
        this.changeSetState(event.target.value)
    }

    changeSetState(value) {
        if (value !== this.state.value) {
            this.setState({
                value
            });
        }
    }

    @autobind
    addNewCity() {
        const {value} = this.state;
        const isContains = CacheService.checkContainsStorage(value);
        !isContains && this.props.addNewCity(value);

        this.setState({
            value: ''
        });
    }

    render() {
        return (
            <div>
                <input type="text"
                       value={ this.state.value }
                       onChange={ this.onChangeHandler }/>

                <button onClick={ this.addNewCity }>add</button>
            </div>
        )
    }
}
