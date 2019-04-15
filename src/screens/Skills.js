import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSkill } from '../ducks/skills';
import StarRatings from 'react-star-ratings';
import '../styles/skills.css';

class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            skillName: '',
            skillRating: 0
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
            skillRating: 0
        });
    }

    renderSkills() {
        let renderedSkills = [];
        const { skills } = this.state;

        skills.map(skill => {
            renderedSkills = renderedSkills.concat(
                <div key={skill.name} className="SkillRow">
                    <span className="SkillName">{skill.name}</span>
                    <StarRatings
                        className="SkillRating"
                        rating={parseFloat(skill.rating)}
                        starRatedColor="blue"
                        numberOfStars={5}
                        name="rating"
                        starDimension={'15px'}
                    />
                </div>
            );
        });

        return renderedSkills;
    }

    render() {
        const { skillName, skillRating } = this.state;
        return (
            <div className="Container">
                <div className="Heading">
                    <h1>Skills</h1>
                </div>
                <div className="SkillsContainer">
                    <p className="SectionTitle">Your skills</p>
                    {this.renderSkills()}
                </div>
                <div className="SkillsContainer">
                    <p className="SectionTitle">Add a new skill</p>
                    <label>Name your skill</label>
                    <input
                        className="TextInput"
                        name="skill_name"
                        type="text"
                        value={skillName}
                        onChange={event => {
                            this.setState({
                                skillName: event.target.value
                            });
                        }}
                    />
                    <br />
                    <label>How would you rate yourself?</label>
                    <input
                        className="TextInput"
                        name="skill_rating"
                        type="text"
                        value={skillRating}
                        onChange={event => {
                            this.setState({
                                skillRating: event.target.value ? event.target.value : 0
                            });
                        }}
                    />
                    <StarRatings
                        rating={parseFloat(skillRating)}
                        starRatedColor="blue"
                        numberOfStars={5}
                        name="skill_rating"
                        starDimension={'15px'}
                        changeRating={rating => {
                            this.setState({
                                skillRating: rating
                            });
                        }}
                    />
                    <button onClick={() => this.addSkill()} className="Button">
                        ADD
                    </button>
                </div>
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
