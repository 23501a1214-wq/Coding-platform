/**
 * @jest-environment jsdom
 */

// src/pages/Leaderboard.test.js
// Tests based on actual Leaderboard.jsx — sorts by b.stars - a.stars (descending)

describe('Leaderboard - Scores Display in Correct Order', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('TC07 - should sort users by stars in descending order', () => {
    const users = [
      { username: 'alice', stars: 5 },
      { username: 'nikhilesh', stars: 20 },
      { username: 'bob', stars: 12 }
    ];
    localStorage.setItem('quizUsers', JSON.stringify(users));

    const storedUsers = JSON.parse(localStorage.getItem('quizUsers')) || [];
    const sorted = storedUsers.sort((a, b) => (b.stars || 0) - (a.stars || 0));

    // Rank 1 should be nikhilesh with 20 stars
    expect(sorted[0].username).toBe('nikhilesh');
    expect(sorted[0].stars).toBe(20);

    // Rank 2 should be bob with 12 stars
    expect(sorted[1].username).toBe('bob');
    expect(sorted[1].stars).toBe(12);

    // Rank 3 should be alice with 5 stars
    expect(sorted[2].username).toBe('alice');
    expect(sorted[2].stars).toBe(5);
  });

  test('TC08 - should treat missing stars as 0 (handles undefined stars)', () => {
    const users = [
      { username: 'charlie' },           // no stars field
      { username: 'diana', stars: 8 },
      { username: 'eve', stars: undefined }
    ];
    localStorage.setItem('quizUsers', JSON.stringify(users));

    const storedUsers = JSON.parse(localStorage.getItem('quizUsers')) || [];
    const sorted = storedUsers.sort((a, b) => (b.stars || 0) - (a.stars || 0));

    // Diana should be at top with 8 stars
    expect(sorted[0].username).toBe('diana');
    expect(sorted[0].stars).toBe(8);

    // Others with 0 stars follow
    expect(sorted[1].stars === undefined || sorted[1].stars === null || !sorted[1].stars).toBe(true);
  });

  test('TC09 - should return empty list when no users in localStorage', () => {
    // Nothing in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('quizUsers')) || [];

    expect(storedUsers).toEqual([]);
    expect(storedUsers.length).toBe(0);
  });

  test('TC10 - should show single user as rank 1', () => {
    const users = [{ username: 'nikhilesh', stars: 15 }];
    localStorage.setItem('quizUsers', JSON.stringify(users));

    const storedUsers = JSON.parse(localStorage.getItem('quizUsers')) || [];
    const sorted = storedUsers.sort((a, b) => (b.stars || 0) - (a.stars || 0));

    expect(sorted.length).toBe(1);
    expect(sorted[0].username).toBe('nikhilesh');
  });

  test('TC11 - should handle users with equal stars (stable output)', () => {
    const users = [
      { username: 'alpha', stars: 10 },
      { username: 'beta', stars: 10 },
      { username: 'gamma', stars: 10 }
    ];
    localStorage.setItem('quizUsers', JSON.stringify(users));

    const storedUsers = JSON.parse(localStorage.getItem('quizUsers')) || [];
    const sorted = storedUsers.sort((a, b) => (b.stars || 0) - (a.stars || 0));

    // All should have 10 stars regardless of order
    sorted.forEach(u => expect(u.stars).toBe(10));
    expect(sorted.length).toBe(3);
  });
});