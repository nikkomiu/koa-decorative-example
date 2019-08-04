import * as controllers from '.';

describe('index', () => {
  it('exports controllers', () => {
    // Arrange
    const expectedControllers = [
      '__esModule',
      'resourceController',
      'testController',
    ];

    // Assert
    expect(Object.getOwnPropertyNames(controllers)).toEqual(expectedControllers);
  });
});
