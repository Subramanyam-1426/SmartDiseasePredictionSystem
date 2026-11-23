import React from 'react';
import Button from './Button';

export default function ErrorState({
  message = 'Unable to analyze the symptoms right now. Please try again.',
  onRetry
}) {
  return (
    <div className="error-banner" role="alert">
      <div>
        <p className="error-message">{message}</p>
      </div>
      {onRetry && (
        <div>
          <Button variant="danger-outline" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
