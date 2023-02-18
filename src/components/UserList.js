import { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from '../store/index';
// import Loader from './Loader';

const UserList = () => {
    const navigate = useNavigate();

    let noOfRecordPerPage = 10;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(noOfRecordPerPage);

    const state = useSelector(state => state);
    const posts = state?.posts.items;

    const dispatch = useDispatch();
    const { getUsers, deleteUser, searchUser } = bindActionCreators(ActionCreators, dispatch);
    useEffect(() => { getUsers() }, []);

    const deleteSpecificUser = (idToDelete) => {
        deleteUser(idToDelete);
        if (posts?.length % 10 === 1) {
            setStartIndex(prev => prev - 10)
            setEndIndex(prev => prev - 1)
        }
    }


    const pagination = () => {
        let noOfPages = Math.ceil(posts.length / noOfRecordPerPage);
        let pagination = [];
        for (let page = 1; page <= noOfPages; page++) {
            pagination.push(<li key={page} onClick={() => { setStartEndIndexForPagination(page) }} className="pages d-flex flex-wrap align-items-center rounded-circle justify-content-center text-white fw-bold me-2" style={{ width: '40px', height: '40px' }}>{page}</li>)
        }
        return pagination;
    }

    const setStartEndIndexForPagination = (pageNo) => {
        setStartIndex((noOfRecordPerPage * pageNo) - (noOfRecordPerPage));
        setEndIndex(noOfRecordPerPage * pageNo)
    }

    const reloadPosts = () => {
        getUsers();
        console.log('posts reloaded')
    }

    return (
        // posts.length < 0 ? <Loader /> :
        <Container className="my-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <h2 className="mb-4">Crud Operations (Mock API) </h2>
                <div className="d-flex flex-wrap align-items-center">
                    <Button className="btn btn-primary me-1" onClick={() => navigate('/add-new-user')}>Add New Post</Button>
                    <Button className="btn btn-primary" onClick={reloadPosts}>Reload Posts</Button>
                </div>
            </div>
            <form className="d-flex flex-wrap mb-4">
                <input className="form-control" type="text" name="search-user" placeholder="Search user via title" onChange={e => searchUser(e.target.value)} />
            </form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan="4">Total Users: {state.posts.items.length}</th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.length > 0 ? posts.slice(startIndex, endIndex).length <= 0 ? () => { setStartIndex(0); setEndIndex(10); } : posts.slice(startIndex, endIndex).map((post, index) => (
                            <tr key={index}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                                <td>
                                    <ul className='list-inline'>
                                        <li className="d-inline-block view-post" onClick={() => navigate(`/single-user/${post.id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ width: '20px', height: '20px' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </li>
                                        <li className="d-inline-block edit-post" onClick={() => navigate(`/update-user/${post.id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ width: '20px', height: '20px' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </li>
                                        <li className="d-inline-block trash-post" onClick={() => deleteSpecificUser(post.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ width: '20px', height: '20px' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4">
                                    No Record Found!
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            {/* Pagination */}
            {
                posts.length >= noOfRecordPerPage &&
                <ul className='w-100 list-inline d-flex flex-wrap align-items-center'>
                    {pagination()}
                </ul>
            }
        </Container>
    )
}

export default UserList