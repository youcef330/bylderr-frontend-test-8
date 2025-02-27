import React, { useState } from "react";

/**
 * Sub-component for each comment replies.
 * Highlight name, timestamp, AND the message text if 
 * authorName includes "Property Manager".
 */

const CommentItem = ({ comment, onReply, onUpvote, onDownvote }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [showReplies, setShowReplies] = useState(true);
    const [userVote, setUserVote] = useState(null);

    const isManager = comment.authorName.toLowerCase().includes("property manager");

    // Handle submitting a reply
    const handleReplySubmit = () => {
        if (!replyText.trim()) return;
        onReply(comment.id, replyText);
        setReplyText("");
        setShowReplyBox(false);
    };

    // Handle upvoting with vote restriction
    const handleUpvote = () => {
        if (userVote === "upvote") return;
        onUpvote(comment.id);
        setUserVote("upvote");
    };

    // Handle downvoting with vote restriction
    const handleDownvote = () => {
        if (userVote === "downvote") return; 
        onDownvote(comment.id);
        setUserVote("downvote");
    };

    return (
        <div className="border-b border-gray-200 mb-4 pb-4 ml-4">
            {/* Author and text container */}
            <div
                className={`mb-2 ${isManager ? "bg-green-50 border-l-4 border-green-300 pl-2" : ""
                    }`}
            >
                <div className="mb-1">
                    <span className="font-semibold">{comment.authorName}</span>{" "}
                    <span className="text-gray-500">• {comment.timestamp}</span>
                </div>
                <div>{comment.text}</div>
            </div>

            {/* Upvote downvote and reply buttons */}
            <div className="flex items-center space-x-4 mb-2">
                <button
                    onClick={handleUpvote}
                    className={`text-sm ${userVote === "upvote"
                            ? "text-blue-500"
                            : isManager
                                ? "text-green-700"
                                : "text-midnight-blue"
                        }`}
                    disabled={userVote === "upvote"}
                >
                    {comment.upvotes > 0 ? `Upvote (${comment.upvotes})` : "Upvote"}
                </button>
                <button
                    onClick={handleDownvote}
                    className={`text-sm ${userVote === "downvote"
                            ? "text-red-500"
                            : isManager
                                ? "text-green-700"
                                : "text-midnight-blue"
                        }`}
                    disabled={userVote === "downvote"}
                >
                    {comment.downvotes > 0
                        ? `Downvote (${comment.downvotes})`
                        : "Downvote"}
                </button>
                <button
                    onClick={() => setShowReplyBox(!showReplyBox)}
                    className={`${isManager ? "text-green-700" : "text-midnight-blue"
                        } text-sm`}
                >
                    {showReplyBox ? "Cancel" : "Reply"}
                </button>
            </div>

            {/* Reply box */}
            {showReplyBox && (
                <div className="mb-2">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="border rounded w-full p-2 text-sm"
                        placeholder="Write a reply..."
                    />
                    <div className="mt-2">
                        <button
                            onClick={handleReplySubmit}
                            className="bg-midnight-blue text-white px-3 py-1 rounded text-sm mr-2"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setShowReplyBox(false)}
                            className="text-sm text-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-2 mt-2">
                    <button
                        onClick={() => setShowReplies(!showReplies)}
                        className={`${isManager ? "text-green-700" : "text-midnight-blue"
                            } text-xs mb-2`}
                    >
                        {showReplies
                            ? "Hide replies"
                            : `Show ${comment.replies.length} repl${comment.replies.length > 1 ? "ies" : "y"
                            }`}
                    </button>

                    {showReplies && (
                        <div className="pl-4 mt-2 border-l border-gray-300">
                            {comment.replies.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    onReply={onReply}
                                    onUpvote={onUpvote}
                                    onDownvote={onDownvote}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentItem;