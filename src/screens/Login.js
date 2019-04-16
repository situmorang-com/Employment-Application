import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveName } from '../ducks/name';
import '../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    onProceed() {
        const { name } = this.state;
        const { history, saveName } = this.props;
        if (name && name.length >= 2) {
            saveName(name);
            history.push({
                pathname: '/skills'
            });
        }
    }

    render() {
        const { name } = this.state;
        return (
            <div className="LoginContainer">
                <div className="LoginCard">
                    <span className="Title">what should we call you?</span>
                    <input
                        className="NameInput"
                        name="name"
                        type="text"
                        value={name}
                        onChange={event => {
                            this.setState({
                                name: event.target.value
                            });
                        }}
                    />
                    <button className="NextButton" onClick={() => this.onProceed()}>
                        next
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveName: name => dispatch(saveName(name))
    };
};

const mapStateToProps = state => ({
    name: state.name
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
