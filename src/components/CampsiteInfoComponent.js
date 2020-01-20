import React, { Component } from 'react';
import {
    Label, Modal, ModalBody, ModalHeader,
    Button, Card, CardImg, CardText, CardBody,
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row } from 'reactstrap';
import { Loading } from './LoadingComponent';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({ campsite }) {
    return (<div className="col-md-5 m-1">
        <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
                <CardText>{campsite.description}</CardText>
            </CardBody>
        </Card>
    </div>);
}

function RenderComments({ comments, addComment, campsiteId }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (

                        <div key={comment.id}>
                            <p>
                                {comment.text}<br /> - {comment.author}
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}

                            </p>

                        </div>
                    );
                })}  <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    }
    return <div />;
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            author: '',
            text: ''
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {

        return (
            <React.Fragment>
                <span>
                    <Button outline onClick={this.toggleModal} type="submit" value="submit" color="primary">
                        <i className="fa fa-pencil" aria-hidden="true" /> Submit Comment
            </Button>
                </span>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">

                            </Row>
                            <div className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be at 15 characters or less'
                                    }} />
                            </div>
                            <div className="form-group">
                                <Label for="Comments">Comments</Label>
                                <Control.textarea model=".text" id="feedback" name="feedback"
                                    rows="6" className="form-control" />
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                        </Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>);
    }
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    return <div />;
}


export default CampsiteInfo;



