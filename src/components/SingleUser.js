import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from '../store/index';
import { bindActionCreators } from 'redux';

import { useParams, Router, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Loader from './Loader';

const SingleUser = () => {
    const navigate = useNavigate();
    let id = useParams();
    id = id.id;

    const state = useSelector(state => state);
    const post = state?.posts?.item;
    // console.log(post, 'item');

    const dispatch = useDispatch();
    const { singleUser } = bindActionCreators(ActionCreators, dispatch);

    useEffect(() => singleUser(id), [Router, id]);
    // console.log(id, post.id)
    return (
        post.id !== id ? <Loader /> :
            <div className="container my-5">
                <h1 className="text-uppercase mb-3 display-6 fw-bold">Single Post</h1>
                <h2>Post ID: {post?.id}</h2>
                <h1 className="text-capitalize">{post?.title}</h1>
                <p>{post?.body}</p>
                <Button onClick={() => navigate('/')}>Goto Post List</Button>
            </div>
    )
}

export default SingleUser