import React from 'react';
import FeedbackItem from './FeedbackItem';
import './FeedbackList.css';

function FeedbackList({
  feedbacks,
  onDelete,
  onLike,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  editingId,
  editText,
  setEditText,
}) {
  return (
    <div className="feedback-list">
      {feedbacks.map((feedback, index) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          index={index}
          onDelete={onDelete}
          onLike={onLike}
          onEdit={onEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          isEditing={editingId === feedback.id}
          editText={editText}
          setEditText={setEditText}
        />
      ))}
    </div>
  );
}

export default FeedbackList;
