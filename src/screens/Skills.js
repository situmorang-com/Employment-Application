import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSkill } from '../ducks/skills';

class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            skillName: '',
            skillRating: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props);
        return {
            skills: props.skills.skills
        };
    }

    addSkill() {
        const { skillName, skillRating } = this.state;
        if (skillName && skillRating && skillName.length > 1)
            this.props.addSkill({
                name: skillName,
                rating: skillRating
            });
        this.setState({
            skillName: '',
            skillRating: ''
        });
    }

    renderSkills() {
        let renderedSkills = [];
        const { skills } = this.state;

        skills.map(skill => {
            renderedSkills = renderedSkills.concat(
                <div key={skill.name}>
                    <span>{skill.name}</span>
                    <span>{skill.rating}</span>
                </div>
            );
        });

        return renderedSkills;
    }

    render() {
        const { skillName, skillRating } = this.state;
        return (
            <div>
                <div>
                    <h1>Skills</h1>
                    <div>{this.renderSkills()}</div>
                </div>
                <div>
                    <label>Skill</label>
                    <input
                        name="skill_name"
                        type="text"
                        value={skillName}
                        onChange={event => {
                            this.setState({
                                skillName: event.target.value
                            });
                        }}
                    />
                    <label>Rating</label>
                    <input
                        name="skill_rating"
                        type="text"
                        value={skillRating}
                        onChange={event => {
                            this.setState({
                                skillRating: event.target.value
                            });
                        }}
                    />
                </div>
                <button onClick={() => this.addSkill()}>ADD</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSkill: skill => dispatch(addSkill(skill))
    };
};

const mapStateToProps = state => ({
    skills: state.skills
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Skills);
