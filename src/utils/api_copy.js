
const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
    constructor({ url, token }) {
        this._url = url,
            this._token = token
    }

    getCurrentUser() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                'authorization': `${this._token}`
            }
        }).then(onResponse)
    }

    editCurrentUser(editedUser) {
        return fetch(`${this._url}/users/me`, {
            method : 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
        }).then(onResponse);
    }

    getPosts(postId) {
        const requestUrl = postId ? `${this._url}/post?post_id=${postId}` : `${this._url}/posts`;
        return fetch(requestUrl, {
            headers: {
                'authorization': `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    createPost(title, text, image, tags) {
        const tagList = tags.trim().split(/,\s*|\s+/g)
        return fetch(`${this._url}/post`, {
            method: 'POST',
            headers: {
                'authorization': `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': `${title}`,
                'text': `${text}`,
                'image': `${image}` || 'https://avatanplus.com/files/resources/original/5a698981709f81612c4121b5.jpg',
                'tags': tagList || [],
            })
        }).then(onResponse)
    }

    editPost(postId, title, text, image, tags) {
        const tagList = tags.trim().split(/[,]\s*|\s+/g)
        return fetch(`${this._url}/post?post_id=${postId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'title': `${title}`,
                'text': `${text}`,
                'image': `${image}`,
                'tags': tagList,
            }),
        }).then(onResponse)
    }

    deletePostById(postId) {
        return fetch(`${this._url}/post?post_id=${postId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `${this._token}`
            }
        }).then(onResponse)
    }

    addLike(postId) {
        return fetch(`${this._url}/likes/post?post_id=${postId}`, {
            method: 'PUT',
            headers: {
                'authorization': `${this._token}`,
            },
        }).then(onResponse);
    }

    deleteLike(postId) {
        return fetch(`${this._url}/likes/post?post_id=${postId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `${this._token}`,
            },
        }).then(onResponse);
    }

    getComments(postId) {
        return fetch(`${this._url}/comments/post?post_id=${postId}`, {
            headers: {
                'authorization': `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    addComment(postId, comment) {
        return fetch(`${this._url}/comments/post?post_id=${postId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        }).then(onResponse)
}

addComment(id, comment){
    return fetch(`${this._url}/posts/comments/${id}`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${this._token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        }).then(onResponse)
    }

    deleteComment(postId, commentId) {
        return fetch(`${this._url}/comments/post?post_id=${postId}&comment_id=${commentId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        }).then(onResponse)
}

addComment(id, comment){
    return fetch(`${this._url}/posts/comments/${id}`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${this._token}`,
            'Content-Type': 'application/json',
            },

        }).then(onResponse)

    }

    deleteComment(postId, commentId) {
        return fetch(`${this._url}/comments/post?post_id=${postId}&comment_id=${commentId}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json',
            },

       }).then(onResponse)

    }

    signUp(userData) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        }).then(onResponse)

    }
    signIn(userData) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        }).then(onResponse)
    }

}

export default Api