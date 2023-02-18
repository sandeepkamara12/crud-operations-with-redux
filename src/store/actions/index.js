export const addUser = (postData) => {
    return dispatch => {
        fetch('https://63cec40f6d27349c2b753ec4.mockapi.io/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then(getNewPost => getNewPost.json()).then(getNewParsedPost => dispatch({
            type: 'ADD_USER',
            payload: getNewParsedPost
        })).catch(error => new Error(error))
    }
}

export const getUsers = () => {
    return dispatch => {
        fetch('https://63cec40f6d27349c2b753ec4.mockapi.io/users', {
            method: 'GET'
        }).then(getAllPosts => getAllPosts.json()).then(getParsedPosts => dispatch({
            type: 'GET_USERS',
            payload: getParsedPosts
        })).catch(error => new Error(error))
    }
}

export const updateUser = (id, userData) => {
    return dispatch => {
        fetch(`https://63cec40f6d27349c2b753ec4.mockapi.io/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                title: userData.title,
                body: userData.body
            })
        }).then(updatedPost => updatedPost.json()).then(getUpdatedParsedPost => dispatch({
            type: 'UPDATE_USER',
            payload: getUpdatedParsedPost
        })).catch(error => new Error(error));
    }
}

export const singleUser = (postId) => {
    return dispatch => {
        fetch(`https://63cec40f6d27349c2b753ec4.mockapi.io/users/${postId}`, {
            method: 'GET'
        }).then(getSpecificPost => getSpecificPost.json()).then(getParsedPost => dispatch({
            type: 'SINGLE_USER',
            payload: getParsedPost
        })).catch(error => new Error(error));
    }
}

export const deleteUser = (userIdToDelete) => {
    return dispatch => {
        fetch(`https://63cec40f6d27349c2b753ec4.mockapi.io/users/${userIdToDelete}`, {
            method: 'DELETE'
        }).then(() =>
            dispatch(getUsers())
        ).catch(error => new Error(error));
    }
}

export const searchUser = (userTitleToSearch) => {
    return dispatch => {
        fetch(`https://63cec40f6d27349c2b753ec4.mockapi.io/users?title=${userTitleToSearch}`, {
            method: 'GET'
        }).then((res) => res.json()).then(data => dispatch({
            type: 'SEARCH_USER',
            payload: data
        })).catch(error => new Error(error));
    }
}