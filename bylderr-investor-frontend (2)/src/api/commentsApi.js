import axiosInstance from "./axiosInstance";

/**
 * Fetches all comments for a specific post.
 */
export const fetchComments = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch comments.";
  }
};

/**
 * Posts a new top-level comment.
 */
export const postComment = async (postId, commentData) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to post comment.";
  }
};

/**
 * Replies to an existing comment.
 */
export const replyToComment = async (postId, commentId, replyData) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/comments/${commentId}/replies`, replyData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to reply to comment.";
  }
};

/**
 * Upvotes a comment.
 */
export const upvoteComment = async (postId, commentId) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/comments/${commentId}/upvote`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to upvote comment.";
  }
};

/**
 * Downvotes a comment.
 */
export const downvoteComment = async (postId, commentId) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/comments/${commentId}/downvote`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to downvote comment.";
  }
};