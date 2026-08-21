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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { EnvironmentWatermarkComponent } from './environment-watermark';
import { ConfigService } from '../../config';
import { WatermarkConfig } from '../../config';

describe('EnvironmentWatermarkComponent', () => {
  let component: EnvironmentWatermarkComponent;
  let fixture: ComponentFixture<EnvironmentWatermarkComponent>;

  const watermark = signal<WatermarkConfig>({
    enabled: false,
    text: 'AMBIENTE DI TEST',
    opacity: 0.08,
    color: '#000000',
    fontSize: 80,
    rotation: -45,
  });

  const mockConfigService = { watermark };

  beforeEach(async () => {
    watermark.set({
      enabled: false,
      text: 'AMBIENTE DI TEST',
      opacity: 0.08,
      color: '#000000',
      fontSize: 80,
      rotation: -45,
    });

    await TestBed.configureTestingModule({
      imports: [EnvironmentWatermarkComponent],
      providers: [{ provide: ConfigService, useValue: mockConfigService }],
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentWatermarkComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not render when disabled', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.env-watermark')).toBeFalsy();
  });

  it('should not render when enabled but text is empty', () => {
    watermark.set({ enabled: true, text: '   ' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.env-watermark')).toBeFalsy();
  });

  it('should render when enabled with text', () => {
    watermark.set({ enabled: true, text: 'AMBIENTE DI TEST' });
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.env-watermark__text');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('AMBIENTE DI TEST');
  });

  it('should apply color, opacity, font size and diagonal rotation', () => {
    watermark.set({
      enabled: true,
      text: 'COLLAUDO',
      opacity: 0.2,
      color: '#ff0000',
      fontSize: 100,
      rotation: -30,
    });
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.env-watermark') as HTMLElement;
    const text = fixture.nativeElement.querySelector('.env-watermark__text') as HTMLElement;

    expect(overlay.style.opacity).toBe('0.2');
    expect(text.style.fontSize).toBe('100px');
    expect(text.style.transform).toBe('rotate(-30deg)');
  });

  it('should default rotation to -45deg when not configured', () => {
    watermark.set({ enabled: true, text: 'TEST' });
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.env-watermark__text') as HTMLElement;
    expect(text.style.transform).toBe('rotate(-45deg)');
  });

  it('should interpret numeric fontSize as px', () => {
    watermark.set({ enabled: true, text: 'TEST', fontSize: 120 });
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.env-watermark__text') as HTMLElement;
    expect(text.style.fontSize).toBe('120px');
  });

  it('should pass through a CSS unit string (e.g. vw)', () => {
    watermark.set({ enabled: true, text: 'TEST', fontSize: '18vw' });
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.env-watermark__text') as HTMLElement;
    expect(text.style.fontSize).toBe('18vw');
  });

  it('should convert a percentage to vmin so it scales with the smaller viewport side', () => {
    watermark.set({ enabled: true, text: 'TEST', fontSize: '20%' });
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.env-watermark__text') as HTMLElement;
    expect(text.style.fontSize).toBe('20vmin');
  });

  it('should default to 80px when fontSize is not configured', () => {
    watermark.set({ enabled: true, text: 'TEST' });
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.env-watermark__text') as HTMLElement;
    expect(text.style.fontSize).toBe('80px');
  });
});
