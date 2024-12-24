const fixturesArr = ['user', 'order', 'ingredients', 'feeds'];
const interceptsArr = [
  {
    method: 'GET',
    url: '/api/ingredients',
    fixture: 'ingredients',
    alias: 'ingredients'
  },
  {
    method: 'GET',
    url: '/api/auth/user',
    fixture: 'user',
    alias: 'user'
  },
  {
    method: 'GET',
    url: '/api/orders/all',
    fixture: 'user-orders',
    alias: 'user-orders'
  },
  {
    method: 'GET',
    url: '/api/feeds',
    fixture: 'feeds',
    alias: 'feeds'
  },
  {
    method: 'POST',
    url: '/api/orders',
    fixture: 'order',
    alias: 'order'
  }
];

describe('Тестирование конструктора бургеров', () => {
  beforeEach(() => {
    // Загружаем фикстуры и настраиваем перехват запросов
    fixturesArr.forEach((fixture) => cy.fixture(`${fixture}.json`));
    interceptsArr.forEach(({ method, url, fixture, alias }) =>
      cy.intercept({ method, url }, { fixture }).as(alias)
    );

    // Устанавливаем моковые токены
    cy.setCookie('accessToken', 'mockTokenLayvu');
    localStorage.setItem('refreshToken', 'mockTokenLayvu');

    cy.visit('/');
  });

  afterEach(() => {
    // Очищаем токены после каждого теста
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Загрузка страницы', () => {
    cy.visit('/');
  });

  it('Проверка работы API', () => {
    cy.wait(['@ingredients', '@user']);
  });

  describe('Модальное окно с информацией об ингредиенте', () => {
    beforeEach(() => {
      cy.get('[data-cy="ingredient"]').first().click();
    });

    it('Открытие модального окна', () => {
      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .should('contain.text', 'Детали ингредиента');
    });

    it('Закрытие по оверлею', () => {
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрытие кнопкой', () => {
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Работа с конструктором', () => {
    it('Добавление булки', () => {
      cy.get('[data-cy="ingredient"]').first().children().last().click();
      cy.get('[data-cy="constructor-bun-top"]').should('be.visible');
      cy.get('[data-cy="constructor-bun-bottom"]').should('be.visible');
    });

    it('Добавление начинки', () => {
      cy.get('[data-cy="ingredient"]').last().children().last().click();
      cy.get('[data-cy="constructor-ingredient"]').should('be.visible');
    });

    it('Сборка и заказ бургера', () => {
      // Добавляем булку
      cy.get('[data-cy="ingredient"]').first().children().last().click();
      cy.get('[data-cy="constructor-bun-top"]').should('be.visible');
      cy.get('[data-cy="constructor-bun-bottom"]').should('be.visible');

      // Добавляем начинку
      cy.get('[data-cy="ingredient"]').last().children().last().click();
      cy.get('[data-cy="constructor-ingredient"]').should('be.visible');

      // Оформляем заказ
      cy.get('[data-cy="constructor-order-button"]').click();

      // Проверяем модальное окно с номером заказа
      cy.wait('@order').then((res) => {
        const orderNumber = res.response?.body?.order?.number;

        cy.get('[data-cy="modal"]', { timeout: 15000 })
          .should('be.visible')
          .as('modal');

        // Затем отдельно проверяем номер заказа
        cy.get('[data-cy="order_number"]', { timeout: 15000 })
          .should('be.visible')
          .should('contain.text', orderNumber);

        // Закрываем модальное окно
        cy.get('[data-cy="modal"]').find('button').click();
        cy.get('[data-cy="modal"]').should('not.exist');

        // Проверяем очистку конструктора
        cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
        cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
        cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
      });
    });
  });
});
