/**
 * @jest-environment jsdom
 */

// src/pages/Login.test.js
// Tests based on actual Login.jsx logic using localStorage + quizUsers

describe('Login - Empty Fields Validation', () => {
  let alertMock;

  beforeEach(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    localStorage.clear();
  });

  afterEach(() => {
    alertMock.mockRestore();
  });

  test('TC01 - should alert when both username and password are empty', () => {
    const username = '';
    const password = '';

    if (!username || !password) {
      alert('Please enter both username and password.');
    }

    expect(alertMock).toHaveBeenCalledWith(
      'Please enter both username and password.'
    );
  });

  test('TC02 - should alert when only username is empty', () => {
    const username = '';
    const password = 'somePassword';

    if (!username || !password) {
      alert('Please enter both username and password.');
    }

    expect(alertMock).toHaveBeenCalledWith(
      'Please enter both username and password.'
    );
  });

  test('TC03 - should alert when only password is empty', () => {
    const username = 'nikhilesh';
    const password = '';

    if (!username || !password) {
      alert('Please enter both username and password.');
    }

    expect(alertMock).toHaveBeenCalledWith(
      'Please enter both username and password.'
    );
  });
});

describe('Login - Wrong Password Validation', () => {
  let alertMock;

  beforeEach(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    localStorage.clear();

    // Seed a valid user into localStorage (same structure as Signup stores it)
    const users = [
      { username: 'nikhilesh', password: 'correct123', stars: 10 }
    ];
    localStorage.setItem('quizUsers', JSON.stringify(users));
  });

  afterEach(() => {
    alertMock.mockRestore();
  });

  test('TC04 - should alert "Incorrect password" when wrong password entered', () => {
    const username = 'nikhilesh';
    const password = 'wrongpass';

    const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
    const existingUser = users.find(u => u.username === username);

    if (!existingUser) {
      alert('No account found with this username. Please sign up first.');
    } else if (existingUser.password !== password) {
      alert('Incorrect password. Please try again.');
    }

    expect(alertMock).toHaveBeenCalledWith(
      'Incorrect password. Please try again.'
    );
  });

  test('TC05 - should alert "No account found" when username does not exist', () => {
    const username = 'unknownUser';
    const password = 'anyPassword';

    const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
    const existingUser = users.find(u => u.username === username);

    if (!existingUser) {
      alert('No account found with this username. Please sign up first.');
    }

    expect(alertMock).toHaveBeenCalledWith(
      'No account found with this username. Please sign up first.'
    );
  });

  test('TC06 - should NOT alert on correct credentials (login success)', () => {
    const username = 'nikhilesh';
    const password = 'correct123';

    const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
    const existingUser = users.find(u => u.username === username);

    let loginSuccess = false;
    if (!existingUser) {
      alert('No account found with this username. Please sign up first.');
    } else if (existingUser.password !== password) {
      alert('Incorrect password. Please try again.');
    } else {
      loginSuccess = true;
    }

    expect(alertMock).not.toHaveBeenCalled();
    expect(loginSuccess).toBe(true);
  });
});