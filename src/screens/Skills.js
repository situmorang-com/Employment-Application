import _ from 'lodash';
import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { MdAdd } from 'react-icons/md';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { addSkill } from '../ducks/skills';
import '../styles/skills.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            skillName: '',
            skillRating: 0,
            addModalVisible: false,
            selectedSkill: null
        };
        this.hideAddModal = this.hideAddModal.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            skills: props.skills.skills
        };
    }

    addSkill() {
        const { selectedSkill, skillName, skillRating } = this.state;
        if (skillName && skillRating && skillName.length > 1)
            this.props.addSkill({
                id: _.now(),
                parentId: selectedSkill,
                name: skillName,
                rating: skillRating
            });
        this.setState({
            skillName: '',
            skillRating: 0,
            addModalVisible: false,
            selectedSkill: null
        });
    }

    showAddModal(selectedSkill) {
        this.setState({
            addModalVisible: true,
            selectedSkill: selectedSkill
        });
    }

    hideAddModal() {
        this.setState({
            addModalVisible: false,
            selectedSkill: null
        });
    }

    renderAddModal() {
        const { skillName, skillRating } = this.state;
        return (
            <Modal isOpen={this.state.addModalVisible} onRequestClose={this.hideAddModal} className="AddModal">
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
                <div className="ModalButtonContainer">
                    <button onClick={() => this.hideAddModal()} className="Button">
                        Cancel
                    </button>
                    <button onClick={() => this.addSkill()} className="Button">
                        Add
                    </button>
                </div>
            </Modal>
        );
    }

    renderSkills() {
        let renderedSkills = [];
        const { skills } = this.state;

        if (skills.length === 0)
            return (
                <div>
                    <p>You have not added any skills yet. Add one now</p>
                </div>
            );

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
                    <MdAdd onClick={() => this.showAddModal(skill.id)} />
                    {skill.subSkills && (
                        <div className="SubSkillsContainer">{this.renderSubSKills(skill.subSkills)}</div>
                    )}
                </div>
            );
        });

        return renderedSkills;
    }

    renderSubSKills(skills) {
        let renderedSkills = [];
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
        return (
            <IconContext.Provider value={{ color: 'black', className: 'Icons' }}>
                <div className="Container" id="container">
                    <div className="Heading">
                        <h1>Skills</h1>
                    </div>
                    <div className="SkillsContainer">
                        <p className="SectionTitle">Your skills</p>
                        {this.renderSkills()}
                        <button onClick={() => this.showAddModal()} className="Button">
                            <MdAdd />
                            ADD
                        </button>
                    </div>
                </div>
                {this.renderAddModal()}
            </IconContext.Provider>
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
