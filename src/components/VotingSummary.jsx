import React from 'react';

export default function VotingSummary({
  finalPrediction = 'Unknown',
  winnerVotes = 3,
  totalVotes = 4,
  votes = {}
}) {
  // Sort entries so the winning prediction is first
  const voteEntries = Object.entries(votes).sort((a, b) => b[1] - a[1]);

  return (
    <div className="content-card">
      <h3 className="content-card-title">
        <span>Majority Voting</span>
        <span className="badge badge-teal">Hard Voting</span>
      </h3>

      <p className="voting-summary-desc">
        <strong>{finalPrediction}</strong> received <strong>{winnerVotes} of {totalVotes}</strong> model votes and was selected as the ensemble consensus.
      </p>

      <div className="voting-bars-list" aria-label="Vote Distribution">
        {voteEntries.map(([disease, count]) => {
          const percentage = Math.round((count / totalVotes) * 100);
          const isWinner = disease.toLowerCase().trim() === finalPrediction.toLowerCase().trim();

          return (
            <div key={disease} className="voting-bar-item">
              <div className="voting-bar-header">
                <span className="voting-disease-label" style={{ fontWeight: isWinner ? '600' : '500' }}>
                  {disease} {isWinner ? '(Consensus)' : ''}
                </span>
                <span className="voting-count-label">
                  {count} {count === 1 ? 'vote' : 'votes'} ({percentage}%)
                </span>
              </div>
              <div className="voting-bar-track">
                <div
                  className={`voting-bar-fill ${isWinner ? '' : 'secondary'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
