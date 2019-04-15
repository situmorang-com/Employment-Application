import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    render() {
        const { name } = this.state;
        return (
            <IconContext.Provider value={{ color: 'black', className: 'Icons' }}>
                <div className="Container" id="container">
                    <div className="Heading">
                        <h1>Login</h1>
                    </div>
                    <div className="LoginContainer">
                        <p className="SectionTitle">What's your name?</p>
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
                        <Link className="Button" to={`/skills`}>
                            Login
                        </Link>
                    </div>
                </div>
            </IconContext.Provider>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {};
};

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
