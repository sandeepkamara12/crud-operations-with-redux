import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from '../store/index';
import { bindActionCreators } from 'redux';

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewUser = () => {
    const state = useSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getUsers, addUser } = bindActionCreators(ActionCreators, dispatch);

    const initialValues = {
        title: "",
        body: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('required'),
        body: Yup.string().required('required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            let postData = { ...values };
            addUser(postData);
            state?.posts?.items.unshift(state.posts.item);
            console.log(state?.posts?.items?.length);
            navigate('/')
        },
    });

    useEffect(() => { getUsers() }, [getUsers])

    const { handleChange, handleBlur, handleSubmit, values } = formik;
    return (
        <div className="container my-5">
            <h1 className="text-uppercase mb-3 display-6 fw-bold">Add New Post</h1>
            <form onSubmit={handleSubmit} onReset={formik.handleReset}>
                <div className='w-100 mb-3'>
                    <label className="mb-1" htmlFor="title">Post Title</label>
                    <input id="title" name="title" type="text" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                    {
                        formik.touched.title && formik.errors.title ? <p>{formik.errors.title}</p> : null
                    }
                </div>
                <div className='w-100 mb-3'>
                    <label className="mb-1" htmlFor="body">Post Description</label>
                    <textarea id="body" name="body" className="form-control" onBlur={handleBlur} onChange={handleChange} value={values.body} />
                    {
                        formik.touched.body && formik.errors.body ? <p>{formik.errors.body}</p> : null
                    }
                </div>
                <button type="submit" className="btn btn-primary me-3">Add New Post</button>
                <button type="reset" className="btn btn-primary me-3">Reset Data</button>
                <button type="button" onClick={() => navigate('/')} className="btn btn-primary me-3">Goto Users List</button>
            </form>
        </div>
    )
}

export default NewUser