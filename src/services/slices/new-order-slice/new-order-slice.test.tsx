import { newOrderSlice, newOrder } from './new-order-slice';

const mockOrder = {
  _id: '6761ad36750864001d3720e6',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0941'
  ],
  status: 'done',
  name: 'Краторный био-марсианский бургер',
  createdAt: '2024-12-17T16:56:22.033Z',
  updatedAt: '2024-12-17T16:56:22.925Z',
  number: 64444
};

const initialState = {
  orderModalData: null,
  orderRequest: false,
  error: undefined
};

describe('Тестирование создания нового заказа', () => {
  it('должен установить orderRequest в true при ожидании', () => {
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.pending('pending', [])
    );
    expect(state.orderRequest).toBe(true);
  });

  it('должен установить данные заказа и очистить ошибки при успешном выполнении', () => {
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.fulfilled(
        { order: mockOrder, success: true, name: '' },
        'fulfilled',
        []
      )
    );
    expect(state.orderModalData).toBe(mockOrder);
    expect(state.error).toBe(undefined);
  });

  it('должен установить сообщение об ошибке при отклонении', () => {
    const errorMessage = 'ошибка';
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.rejected(new Error(errorMessage), 'rejected', [])
    );
    expect(state.error).toEqual(errorMessage);
  });
});
