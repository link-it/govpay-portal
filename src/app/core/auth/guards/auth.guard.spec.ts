/*
 * GovPay - Porta di Accesso al Nodo dei Pagamenti SPC
 * http://www.gov4j.it/govpay
 *
 * Copyright (c) 2014-2026 Link.it srl (http://www.link.it).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3, as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { signal } from '@angular/core';
import { authGuard } from './auth.guard';
import { PayService } from '@core/pay';

describe('authGuard', () => {
  let mockRouter: Partial<Router>;
  let mockUrlTree: UrlTree;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const createMockState = (url: string) => ({ url }) as RouterStateSnapshot;

  const createMockPayService = (isAuthenticated: boolean) => ({
    isAuthenticated: signal(isAuthenticated),
  });

  beforeEach(() => {
    mockUrlTree = { toString: () => '/pagamento-servizio?returnUrl=/riepilogo' } as UrlTree;

    mockRouter = {
      createUrlTree: vi.fn().mockReturnValue(mockUrlTree),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when user is authenticated', () => {
    TestBed.overrideProvider(PayService, { useValue: createMockPayService(true) });

    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, createMockState('/riepilogo'))
    );

    expect(result).toBe(true);
    expect(mockRouter.createUrlTree).not.toHaveBeenCalled();
  });

  it('should redirect to pagamento-servizio when not authenticated', () => {
    TestBed.overrideProvider(PayService, { useValue: createMockPayService(false) });

    const result = TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, createMockState('/riepilogo'))
    );

    expect(result).toBe(mockUrlTree);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(
      ['/pagamento-servizio'],
      { queryParams: { returnUrl: '/riepilogo' } }
    );
  });

  it('should pass the original URL as returnUrl parameter', () => {
    TestBed.overrideProvider(PayService, { useValue: createMockPayService(false) });

    TestBed.runInInjectionContext(() =>
      authGuard(mockRoute, createMockState('/archivio?page=2'))
    );

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(
      ['/pagamento-servizio'],
      { queryParams: { returnUrl: '/archivio?page=2' } }
    );
  });

  it('should protect different routes consistently', () => {
    TestBed.overrideProvider(PayService, { useValue: createMockPayService(false) });

    // Test multiple protected routes
    const protectedRoutes = ['/riepilogo', '/archivio', '/posizione-debitoria'];

    protectedRoutes.forEach(route => {
      TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, createMockState(route))
      );
    });

    expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(3);
  });
});
