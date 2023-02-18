import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from '../store/index';
import { bindActionCreators } from 'redux';

import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import Loader from './Loader';

const UpdateUser = () => {
    let id = useParams();
    id = id.id;

    const navigate = useNavigate();

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const { updateUser, singleUser } = bindActionCreators(ActionCreators, dispatch);

    useEffect(() => singleUser(id), [id]);

    const initialValues = {
        title: "",
        body: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('required'),
        body: Yup.string().required('required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            updateUser(id, values);
            navigate('/');
        },
    });
    useEffect(() => {
        if (state?.posts?.item?.title) {
            formik.setFieldValue("title", state?.posts?.item?.title);
        }
        if (state?.posts?.item?.body) {
            formik.setFieldValue("body", state?.posts?.item?.body);
        }
    }, [state?.posts]);


    const { handleChange, handleSubmit, values } = formik;

    return (

        <div className="container my-5">
            {/* <Loader /> */}
            <h1 className="text-uppercase mb-3 display-6 fw-bold">Update User</h1>
            <form onSubmit={handleSubmit}>
                <div className='w-100 mb-3'>
                    <label className="mb-1" htmlFor="title">Post Title</label>
                    <input id="title" name="title" type="text" className="form-control" onChange={handleChange} value={values.title} />
                </div>
                <div className='w-100 mb-3'>
                    <label className="mb-1" htmlFor="body">Post Description</label>
                    <textarea id="body" name="body" className="form-control" onChange={handleChange} value={values.body} />
                </div>
                <button type="submit" className="btn btn-primary">Update User Content</button>
            </form>
        </div>
    )
}

export default UpdateUser