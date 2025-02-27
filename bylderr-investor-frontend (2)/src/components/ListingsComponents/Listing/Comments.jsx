import React, { useState, useEffect } from "react";
import {
    fetchComments,
    postComment,
    replyToComment,
    upvoteComment,
    downvoteComment,
} from "../../../api/commentsApi";
import { mockCommentsData } from "../../../mockData/mockCommentsData";
import CommentItem from "./CommentItem";

const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
};

export const updateNestedComments = (comments, targetId, updater) => {
    return comments.map((comment) => {
        if (comment.id === targetId) {
            return updater(comment);
        } else if (comment.replies && comment.replies.length > 0) {
            return {
                ...comment,
                replies: updateNestedComments(comment.replies, targetId, updater),
            };
        }
        return comment;
    });
};

/**
 * Main component to display and manage comments for a specific post.
 */
const Comments = ({ listingId }) => {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [showAllTopComments, setShowAllTopComments] = useState(false);
    const VISIBLE_COUNT = 2;

    //mock mode
    const isMockMode = import.meta.env.VITE_REACT_APP_AUTH_MODE === "mock";

    useEffect(() => {
        const loadComments = async () => {
            setIsLoading(true);
            setError(null);

            if (isMockMode) {
                const mockData = JSON.parse(JSON.stringify(mockCommentsData));
                setComments(mockData);
                setIsLoading(false);
            } else {
                try {
                    const data = await fetchComments(listingId);
                    setComments(data);
                } catch (err) {
                    console.error("Error fetching comments:", err);
                    setError(err || "Failed to fetch comments. Please refresh the page.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadComments();
    }, [listingId, isMockMode]);

    /**
     * Handles submitting a new top-level comment.
     */
    const handlePostComment = async () => {
        if (!newCommentText.trim()) return;
        setIsLoading(true);
        setError(null);

        if (isMockMode) {
            const newComment = {
                id: generateUniqueId(),
                listingId,
                authorName: "Messi (Investor)",
                text: newCommentText,
                timestamp: "Just now",
                upvotes: 0,
                downvotes: 0,
                replies: [],
            };
            setComments([newComment, ...comments]);
            setNewCommentText("");
            setShowAllTopComments(true);
            setIsLoading(false);
        } else {
            try {
                const newComment = await postComment(listingId, { text: newCommentText });
                setComments([newComment, ...comments]);
                setNewCommentText("");
                setShowAllTopComments(true);
            } catch (err) {
                console.error("Error posting comment:", err);
                setError(err || "Failed to post comment. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handles replying to a comment.
    const handleReply = async (commentId, replyText) => {
        setIsLoading(true);
        setError(null);

        if (isMockMode) {
            const newReply = {
                id: generateUniqueId(),
                authorName: "Messi (INVESTOR)",
                text: replyText,
                timestamp: "Just now",
                upvotes: 0,
                downvotes: 0,
                replies: [],
            };
            setComments((prevComments) =>
                updateNestedComments(prevComments, commentId, (comment) => ({
                    ...comment,
                    replies: [...comment.replies, newReply],
                }))
            );
            setIsLoading(false);
        } else {
            try {
                const newReply = await replyToComment(listingId, commentId, { text: replyText });
                setComments((prevComments) =>
                    updateNestedComments(prevComments, commentId, (comment) => ({
                        ...comment,
                        replies: [...comment.replies, newReply],
                    }))
                );
            } catch (err) {
                console.error("Error replying to comment:", err);
                setError(err || "Failed to reply to comment. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    //Handles upvoting a comment.
    const handleUpvote = async (commentId) => {
        setIsLoading(true);
        setError(null);

        if (isMockMode) {
            setComments((prevComments) =>
                updateNestedComments(prevComments, commentId, (comment) => ({
                    ...comment,
                    upvotes: comment.upvotes + 1,
                }))
            );
            setIsLoading(false);
        } else {
            try {
                await upvoteComment(listingId, commentId);
                setComments((prevComments) =>
                    updateNestedComments(prevComments, commentId, (comment) => ({
                        ...comment,
                        upvotes: comment.upvotes + 1,
                    }))
                );
            } catch (err) {
                console.error("Error upvoting comment:", err);
                setError(err || "Failed to upvote the comment. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handles downvoting a comment.
    const handleDownvote = async (commentId) => {
        setIsLoading(true);
        setError(null);

        if (isMockMode) {
            setComments((prevComments) =>
                updateNestedComments(prevComments, commentId, (comment) => ({
                    ...comment,
                    downvotes: comment.downvotes + 1,
                }))
            );
            setIsLoading(false);
        } else {
            try {
                await downvoteComment(listingId, commentId);
                setComments((prevComments) =>
                    updateNestedComments(prevComments, commentId, (comment) => ({
                        ...comment,
                        downvotes: comment.downvotes + 1,
                    }))
                );
            } catch (err) {
                console.error("Error downvoting comment:", err);
                setError(err || "Failed to downvote the comment. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const visibleComments = showAllTopComments
        ? comments
        : comments.slice(0, VISIBLE_COUNT);

    return (
        <div className="max-w-xl mx-auto mt-8  border-t border-gray-500">
            <h2 className="py-5 pl-5 font-bold text-gray-500 text-xl">Comments</h2>

            {/* Error */}
            {error && (
                <div className="bg-yellow-50 ml-5 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Loading */}
            {isLoading && <p className="mb-4">Loading...</p>}

            {/* New Comment Form */}
            <div className="mb-4 pl-5">
                <textarea
                    className="border rounded w-full p-2 text-sm"
                    placeholder="Write a comment..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                />
                <div className="mt-2">
                    <button
                        onClick={handlePostComment}
                        className="bg-midnight-blue text-white px-3 py-1 rounded text-sm"
                        disabled={isLoading}
                    >
                        Comment
                    </button>
                </div>
            </div>

            {/* Comments List */}
            {visibleComments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                    onUpvote={handleUpvote}
                    onDownvote={handleDownvote}
                />
            ))}

            {/* Show More / Show Less Button */}
            {comments.length > VISIBLE_COUNT && (
                <div className="my-5">
                    <button
                        onClick={() => setShowAllTopComments(!showAllTopComments)}
                        className="text-midnight-blue text-sm underline"
                    >
                        {showAllTopComments
                            ? "Show Less"
                            : `Show More (${comments.length - VISIBLE_COUNT} hidden)`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Comments;