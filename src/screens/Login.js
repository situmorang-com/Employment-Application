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
        saveName(name);
        history.push({
            pathname: '/skills'
        });
    }

    render() {
        const { name } = this.state;
        return (
            <div className="Container">
                <div className="Card">
                    <span className="Title">what should we call you?</span>
                    <input
                        className="TextInput"
                        name="name"
                        type="text"
                        value={name}
                        onChange={event => {
                            this.setState({
                                name: event.target.value
                            });
                        }}
                    />
                    <button className="Button" onClick={() => this.onProceed()}>
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
