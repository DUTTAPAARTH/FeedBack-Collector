import React from 'react';
import './FeedbackItem.css';

function FeedbackItem({
  feedback,
  index,
  onDelete,
  onLike,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  isEditing,
  editText,
  setEditText,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: '#6b7280',
      bug: '#ef4444',
      feature: '#3b82f6',
      improvement: '#10b981',
      praise: '#f59e0b',
    };
    return colors[category] || colors.general;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      onDelete(feedback.id);
    }
  };

  return (
    <div className="feedback-item" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="feedback-header">
        <div className="feedback-meta">
          <span
            className="feedback-category"
            style={{ backgroundColor: getCategoryColor(feedback.category) }}
          >
            {feedback.category}
          </span>
          <span className="feedback-date">{formatDate(feedback.createdAt)}</span>
        </div>

        {feedback.updatedAt !== feedback.createdAt && (
          <span className="feedback-edited">(edited)</span>
        )}
      </div>

      {isEditing ? (
        <div className="edit-form">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-textarea"
            rows="4"
          />
          <div className="edit-actions">
            <button
              onClick={() => onSaveEdit(feedback.id)}
              className="edit-save-btn"
            >
              ✓ Save
            </button>
            <button onClick={onCancelEdit} className="edit-cancel-btn">
              ✕ Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="feedback-message">{feedback.message}</p>
      )}

      <div className="feedback-footer">
        <div className="feedback-actions">
          <button
            onClick={() => onLike(feedback.id)}
            className="action-button like-button"
            title="Like this feedback"
          >
            <span className="action-icon">❤️</span>
            <span className="action-text">{feedback.likes}</span>
          </button>

          <button
            onClick={() => onEdit(feedback.id, feedback.message)}
            className="action-button edit-button"
            title="Edit this feedback"
            disabled={isEditing}
          >
            <span className="action-icon">✏️</span>
            <span className="action-text">Edit</span>
          </button>

          <button
            onClick={handleDelete}
            className="action-button delete-button"
            title="Delete this feedback"
          >
            <span className="action-icon">🗑️</span>
            <span className="action-text">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackItem;
