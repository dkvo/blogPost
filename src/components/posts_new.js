import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createPost} from '../actions/index';
import {Link} from 'react-router-dom';
class PostsNew extends Component {

    renderField(field) {
        const {label, input, meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''} `
        return (
            <div className={className}>
                <label>{label}</label>
                <input className="form-control" type="text" {...input} />
                <div className="text-help">
                    {touched ? error : ''}     
                </div>              
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="title" label="Title For Post" component={this.renderField} />
                <Field name="categories" label="Categories" component={this.renderField} />
                <Field name="content" label="Post Content" component={this.renderField} />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors ={};

    // Validate the inputs from 'values'
    if(!values.title) {
        errors.title = "Enter a title";
    }
    if(values.title && values.title.length < 3) {
        errors.title = "Title must be at least 3 Character";
    }
    if(!values.categories) {
        errors.categories = "Enter some categories";
    }
    if(!values.content) {
        errors.content = "Enter some content";
    }

    // If errors is empty, the form is fine to submit
    //if errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
},)(
    connect(null, {createPost})(PostsNew)
);