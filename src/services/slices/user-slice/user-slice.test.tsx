import {
  login,
  logout,
  apiGetUser,
  userSlice,
  updateUser,
  register
} from './user-slice';

const initialState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

const token = {
  refreshToken: 'refresh-token',
  accessToken: 'access-token'
};

const userData = {
  email: 'test@mail.ru',
  name: 'Test User'
};

const loginData = {
  email: 'test@mail.ru',
  password: '1234pas'
};

const registerData = {
  email: 'test@mail.ru',
  name: 'Test User',
  password: '1234pas'
};

describe('Тестирование пользовательского слайса', () => {
  describe('регистрация', () => {
    it('должен очистить ошибки при ожидании', () => {
      const state = userSlice.reducer(
        initialState,
        register.pending('pending', registerData)
      );
      expect(state.error).toBe('');
    });

    it('должен установить состояние авторизации и данные пользователя при успешном выполнении', () => {
      const state = userSlice.reducer(
        initialState,
        register.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          registerData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    it('должен установить сообщение об ошибке при отклонении', () => {
      const errorMessage = 'Ошибка регистрации';
      const state = userSlice.reducer(
        initialState,
        register.rejected(new Error(errorMessage), 'rejected', registerData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });

  describe('вход', () => {
    it('должен очистить ошибку при ожидании', () => {
      const state = userSlice.reducer(
        initialState,
        login.pending('pending', loginData)
      );
      expect(state.error).toBe('');
    });
    it('должен установить состояние авторизации и данные пользователя при успешном выполнении', () => {
      const state = userSlice.reducer(
        initialState,
        login.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          loginData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });
    it('должен установить сообщение об ошибке при отклонении', () => {
      const errorMessage = 'Ошибка входа';
      const state = userSlice.reducer(
        initialState,
        login.rejected(new Error(errorMessage), 'rejected', loginData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });
  describe('выход', () => {
    it('должен сбросить состояние авторизации при успешном выходе', () => {
      const state = userSlice.reducer(initialState, {
        type: logout.fulfilled.type
      });
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toEqual(initialState.user);
    });
  });
  describe('apiGetUser', () => {
    it('должен установить состояние авторизации и данные пользователя при успешном выполнении', () => {
      const state = userSlice.reducer(
        initialState,
        apiGetUser.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled'
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });
    it('должен установить сообщение об ошибке при отклонении', () => {
      const errorMessage = 'Не удалось получить данные пользователя';
      const state = userSlice.reducer(
        initialState,
        apiGetUser.rejected(new Error(errorMessage), 'rejected')
      );
      expect(state.error).toEqual(errorMessage);
    });
  });
  describe('обновить пользователя', () => {
    it('должен очистить ошибку при ожидании', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.pending('pending', registerData)
      );
      expect(state.error).toBe('');
    });
    it('должен установить состояние авторизации и обновленные данные пользователя при успешном выполнении', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          registerData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });
    it('должен установить сообщение об ошибке при отклонении', () => {
      const errorMessage = 'Не удалось обновить пользователя';
      const state = userSlice.reducer(
        initialState,
        updateUser.rejected(new Error(errorMessage), 'rejected', registerData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });
});
