import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { createMock } from '@golevelup/ts-jest';

describe('AuthGuard', () => {
  const authGaurd = new AuthGuard();
  it('should be defined', () => {
    expect(authGaurd).toBeDefined();
  });

  it('should return true for valid API key', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: (name: string) => (name === 'x-api-key' ? 'SECRET' : null),
          headers: {
            'x-api-key': 'SECRET',
          },
        }),
      }),
    });
    expect(authGaurd.canActivate(context)).toBe(true);
  });

  it('should return false for invalid API key', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: (name: string) => (name === 'x-api-key' ? 'INVALID' : null),
          headers: {
            'x-api-key': 'INVALID',
          },
        }),
      }),
    });
    expect(authGaurd.canActivate(context)).toBe(false);
  });

  it('should return false if API key is not provided', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: (name: string) => null,
          headers: {},
        }),
      }),
    });
    expect(authGaurd.canActivate(context)).toBe(false);
  });
});
