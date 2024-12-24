import store from './store';
import { ingredientsSlice } from './slices/ingredients-slice/ingredients-slice';
import { constructorSlice } from './slices/constructor-slice/constructor-slice';
import { newOrderSlice } from './slices/new-order-slice/new-order-slice';
import { userSlice } from './slices/user-slice/user-slice';
import { feedsSlice } from './slices/feeds-slice/feeds-slice';
import { userOrdersSlice } from './slices/user-all-orders-slice/user-all-orders-slice';

describe('Начальное состояние хранилища', () => {
  test('Проверка начального состояния хранилища', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      feeds: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: undefined
      },
      constructorIngredient: {
        bun: null,
        ingredients: []
      },
      newOrder: {
        orderRequest: false,
        orderModalData: null,
        error: undefined
      },
      user: {
        isAuthChecked: false,
        user: {
          email: '',
          name: ''
        },
        error: ''
      },
      orders: {
        orders: [],
        isLoading: true
      }
    });
  });

  test('Проверка начального состояния редьюсера ингредиентов', () => {
    const initialState = ingredientsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
  });

  test('Проверка начального состояния редьюсера ленты заказов', () => {
    const initialState = feedsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: undefined
    });
  });

  test('Проверка начального состояния редьюсера конструктора', () => {
    const initialState = constructorSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('Проверка начального состояния редьюсера нового заказа', () => {
    const initialState = newOrderSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      orderRequest: false,
      orderModalData: null,
      error: undefined
    });
  });

  test('Проверка начального состояния редьюсера пользователя', () => {
    const initialState = userSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: ''
    });
  });

  test('Проверка начального состояния редьюсера заказов пользователя', () => {
    const initialState = userOrdersSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual({
      orders: [],
      isLoading: true
    });
  });
});
