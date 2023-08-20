import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/ReviewsPage.module.css';
import Link from 'next/link';
import { decode } from 'jsonwebtoken';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    const router = useRouter();
    const { id, name } = router.query;

    useEffect(() => {
        fetch(`http://localhost:3001/getProductReviews?id=${id}`, {
            headers: {
                'Content-type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.reviews) {
                    setReviews(json.reviews);
                }
            }
            )
    }, [id])

    const startEditing = (reviewId, comment) => {
        setEditingReview(reviewId);
        setEditedComment(comment);
    };

    const saveEditing = (reviewId) => {
        // ... Existing save logic

        const newReviews = reviews.map(review => {
            if (review.id === reviewId) {
                return { ...review, comment: editedComment };
            }
            return review;
        });
        setReviews(newReviews);
        setEditingReview(null);

        fetch('http://localhost:3001/admin/updateReview', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id
            },
            body: JSON.stringify({
                id: reviewId,
                comment: editedComment
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    alert(json.error);
                }
            }
            )


    };

    const deleteReview = (id) => {
        // ... Existing delete function

        const newReviews = reviews.filter(review => review.id !== id);
        setReviews(newReviews);

        fetch ('http://localhost:3001/admin/deleteReview', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'user-id': decode(localStorage.getItem('token')).id
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    alert(json.error);
                }
            }
            )
            

    };

    return (
        <div className={styles.reviews_container}>
            <div className='d-flex justify-content-between'>
                <h1>{name} Reviews</h1>
                <Link className={styles.btn_add} href={'/admin/reviews/addreview'}>
                    Add Review <i className='bi bi-plus-square ml-2'></i>
                </Link>
            </div>
            <hr />
            <div className="row">
                {reviews.map(review => (
                    <div key={review.id} className="col-12 col-md-4 mb-4">
                        <div className={`card ${styles.review_card}`}>
                            <div className="card-body">
                                <h5 className="card-title">{review.title}</h5>
                                <p className="card-text"><strong>Reviewer:</strong> {review.reviewer_name}</p>
                                <p className="card-text"><strong>Rating:</strong> {review.rating} / 5</p>
                                {editingReview === review.id ? (
                                    <textarea
                                        type="text"
                                        value={editedComment}
                                        className={styles.commentInput}
                                        onChange={e => setEditedComment(e.target.value)}
                                    />
                                ) : (
                                    <p className="card-text"><strong>Comment:</strong> {review.comment}</p>
                                )}
                                <div className='d-flex justify-content-between'>
                                    {editingReview === review.id ? (
                                        <button className={styles.btn_save} onClick={() => saveEditing(review.id)}>Save <i className='bi bi-check ml-2'></i></button>
                                    ) : (
                                        <button className={styles.btn_edit} onClick={() => startEditing(review.id, review.comment)}>Edit <i className='bi bi-pencil-square ml-2'></i></button>
                                    )}
                                    <button className={styles.btn_delete} onClick={() => deleteReview(review.id)}>Delete <i className='bi bi-trash ml-2'></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
