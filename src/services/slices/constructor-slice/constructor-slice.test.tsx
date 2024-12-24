import {
  constructorSlice,
  moveIngredient
} from '../../slices/constructor-slice/constructor-slice';
import {
  addItem,
  deleteItem,
  clearAll
} from '../../slices/constructor-slice/constructor-slice';

const testSauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  id: '3'
};

const testBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  id: '1'
};

const testIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
  id: '2'
};

const initialState = {
  bun: null,
  ingredients: []
};

describe('Тестирование конструктора', () => {
  test('Начальное состояние', () => {
    const state = constructorSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(initialState);
  });

  test('Добавление булки', () => {
    const state = constructorSlice.reducer(initialState, addItem(testBun));
    expect(state.bun).toEqual(testBun);
  });

  test('Добавление ингредиента', () => {
    const state = constructorSlice.reducer(
      initialState,
      addItem(testIngredient)
    );
    expect(state.ingredients).toContainEqual(testIngredient);
  });

  test('Перемещение ингредиента', () => {
    const filledState = {
      bun: testBun,
      ingredients: [testIngredient, testSauce]
    };
    const state = constructorSlice.reducer(
      filledState,
      moveIngredient({ from: 1, to: 0 })
    );
    expect(state.ingredients).toEqual([testSauce, testIngredient]);
  });

  test('Удаление ингредиента', () => {
    const filledState = {
      bun: testBun,
      ingredients: [testIngredient, testSauce]
    };
    const state = constructorSlice.reducer(
      filledState,
      deleteItem(testIngredient)
    );
    expect(state.ingredients).not.toContainEqual(testIngredient);
    expect(state.ingredients).toHaveLength(1);
  });

  test('Очистка конструктора', () => {
    const filledState = {
      bun: testBun,
      ingredients: [testIngredient, testSauce]
    };
    const state = constructorSlice.reducer(filledState, clearAll());
    expect(state).toEqual(initialState);
  });
});
