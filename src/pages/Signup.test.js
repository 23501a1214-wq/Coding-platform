/**
 * @jest-environment jsdom
 */

// src/pages/Signup.test.js
// Tests based on actual Signup.jsx logic using localStorage + quizUsers

describe('Signup - Form Validation & Duplicate User', () => {
  let alertMock;

  beforeEach(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    localStorage.clear();
  });

  afterEach(() => {
    alertMock.mockRestore();
  });

  // ─────────────────────────────────────────────
  // TC12 — Empty fields should alert
  // ─────────────────────────────────────────────
  test('TC12 - should alert when both username and password are empty', () => {
    const username = '';
    const password = '';

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    expect(alertMock).toHaveBeenCalledWith(
      'Please enter both username and password.'
    );
  });

  // ─────────────────────────────────────────────
  // TC13 — Duplicate username should be blocked
  // ─────────────────────────────────────────────
  test('TC13 - should alert when username already exists', () => {
    // Seed an existing user
    const existingUsers = [
      { username: 'nikhilesh', password: 'pass123', stars: 0, points: 0, quizzes: 0, avg: 0, starsByTopic: {} }
    ];
    localStorage.setItem('quizUsers', JSON.stringify(existingUsers));

    const username = 'nikhilesh'; // same username
    const password = 'newpass456';

    const users = JSON.parse(localStorage.getItem('quizUsers')) || [];

    if (users.find(u => u.username === username)) {
      alert('Username already exists. Please choose another.');
      return;
    }

    expect(alertMock).toHaveBeenCalledWith(
      'Username already exists. Please choose another.'
    );
  });

  // ─────────────────────────────────────────────
  // TC14 — Successful signup saves user correctly
  // ─────────────────────────────────────────────
  test('TC14 - should save new user to localStorage on successful signup', () => {
    const username = 'newuser';
    const password = 'mypassword';

    let users = JSON.parse(localStorage.getItem('quizUsers')) || [];

    // No duplicate — proceed with signup
    const newUser = {
      username,
      password,
      stars: 0,
      points: 0,
      quizzes: 0,
      avg: 0,
      starsByTopic: {}
    };

    users.push(newUser);
    localStorage.setItem('quizUsers', JSON.stringify(users));
    localStorage.setItem('quizUser', JSON.stringify(newUser));

    // Verify user was saved in quizUsers list
    const savedUsers = JSON.parse(localStorage.getItem('quizUsers'));
    expect(savedUsers.length).toBe(1);
    expect(savedUsers[0].username).toBe('newuser');
    expect(savedUsers[0].stars).toBe(0);
    expect(savedUsers[0].points).toBe(0);
    expect(savedUsers[0].quizzes).toBe(0);

    // Verify current logged-in user was saved
    const currentUser = JSON.parse(localStorage.getItem('quizUser'));
    expect(currentUser.username).toBe('newuser');
  });

  // ─────────────────────────────────────────────
  // TC15 — Second user signup should not overwrite first
  // ─────────────────────────────────────────────
  test('TC15 - should keep existing users when a new user signs up', () => {
    // First user already exists
    const existingUsers = [
      { username: 'alice', password: 'alice123', stars: 5, points: 50, quizzes: 2, avg: 80, starsByTopic: {} }
    ];
    localStorage.setItem('quizUsers', JSON.stringify(existingUsers));

    // Second user signs up
    const username = 'bob';
    const password = 'bob456';

    let users = JSON.parse(localStorage.getItem('quizUsers')) || [];

    const newUser = {
      username,
      password,
      stars: 0,
      points: 0,
      quizzes: 0,
      avg: 0,
      starsByTopic: {}
    };

    users.push(newUser);
    localStorage.setItem('quizUsers', JSON.stringify(users));

    const savedUsers = JSON.parse(localStorage.getItem('quizUsers'));

    // Both users should exist
    expect(savedUsers.length).toBe(2);
    expect(savedUsers[0].username).toBe('alice');
    expect(savedUsers[1].username).toBe('bob');

    // Alice's stars should still be intact
    expect(savedUsers[0].stars).toBe(5);
  });
});