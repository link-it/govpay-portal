import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { bootstrapFileEarmarkText, bootstrapFolder } from '@ng-icons/bootstrap-icons';
import { signal } from '@angular/core';
import { ServiceCardComponent } from './service-card';
import { ConfigService } from '@core/config';
import { ServiceItem } from '@shared/models/service-item.model';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;

  const mockColors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6'];

  const mockConfigService = {
    cardColors: signal(mockColors)
  };

  const mockService: ServiceItem = {
    id: 'test-service-1',
    code: 'SRV001',
    name: 'Test Service',
    title: 'SRV001 - Test Service',
    group: 'Group A',
    subgroup: 'Subgroup 1',
    groupRank: 1,
    category: 'Category 1',
    metadata: 'This is a test service description',
    searchTerms: 'test service search',
    source: {} as any
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardComponent],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        provideIcons({ bootstrapFileEarmarkText, bootstrapFolder }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;
    // Set required input
    fixture.componentRef.setInput('service', mockService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should have default icon', () => {
      expect(component.icon).toBe('bootstrapFileEarmarkText');
    });

    it('should not be selected by default', () => {
      expect(component.selected).toBe(false);
    });

    it('should not show group by default', () => {
      expect(component.showGroup).toBe(false);
    });

    it('should show metadata by default', () => {
      expect(component.showMetadata).toBe(true);
    });

    it('should not show category by default', () => {
      expect(component.showCategory).toBe(false);
    });

    it('should have colorIndex 0 by default', () => {
      expect(component.colorIndex).toBe(0);
    });
  });

  describe('service rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display service name', () => {
      const nameElement = fixture.nativeElement.querySelector('h3');
      expect(nameElement?.textContent).toContain('Test Service');
    });

    it('should display service code', () => {
      const codeElement = fixture.nativeElement.querySelector('.text-xs.font-semibold');
      expect(codeElement?.textContent).toContain('SRV001');
    });

    it('should set title attribute for tooltip', () => {
      const nameElement = fixture.nativeElement.querySelector('h3');
      expect(nameElement?.getAttribute('title')).toBe('Test Service');
    });

    it('should display metadata when showMetadata is true', () => {
      const metadataElement = fixture.nativeElement.querySelector('p.text-sm');
      expect(metadataElement?.textContent).toContain('This is a test service description');
    });

    it('should not display metadata when showMetadata is false', () => {
      fixture.componentRef.setInput('showMetadata', false);
      fixture.detectChanges();

      const metadataElement = fixture.nativeElement.querySelector('p.text-sm');
      expect(metadataElement).toBeFalsy();
    });
  });

  describe('group badge', () => {
    it('should not show group badge when showGroup is false', () => {
      fixture.componentRef.setInput('showGroup', false);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.absolute.top-2.right-2');
      expect(badge).toBeFalsy();
    });

    it('should show group badge when showGroup is true and group is not default', () => {
      fixture.componentRef.setInput('showGroup', true);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.absolute.top-2.right-2');
      expect(badge?.textContent).toContain('Group A');
    });

    it('should not show group badge when group is default', () => {
      const serviceWithDefaultGroup = { ...mockService, group: 'default' };
      fixture.componentRef.setInput('service', serviceWithDefaultGroup);
      fixture.componentRef.setInput('showGroup', true);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.absolute.top-2.right-2');
      expect(badge).toBeFalsy();
    });
  });

  describe('category display', () => {
    it('should not show category when showCategory is false', () => {
      fixture.componentRef.setInput('showCategory', false);
      fixture.detectChanges();

      const categoryElement = fixture.nativeElement.querySelector('.bg-white\\/20.text-white.text-xs');
      expect(categoryElement).toBeFalsy();
    });

    it('should show category when showCategory is true', () => {
      fixture.componentRef.setInput('showCategory', true);
      fixture.detectChanges();

      const categoryElement = fixture.nativeElement.querySelector('span.bg-white\\/20');
      expect(categoryElement?.textContent).toContain('Category 1');
    });
  });

  describe('cardColor', () => {
    it('should return first color when colorIndex is 0', () => {
      fixture.componentRef.setInput('colorIndex', 0);
      expect(component.cardColor).toBe('#3b82f6');
    });

    it('should return second color when colorIndex is 1', () => {
      fixture.componentRef.setInput('colorIndex', 1);
      expect(component.cardColor).toBe('#ef4444');
    });

    it('should cycle through colors using modulo', () => {
      fixture.componentRef.setInput('colorIndex', 5);
      expect(component.cardColor).toBe('#3b82f6'); // 5 % 5 = 0

      fixture.componentRef.setInput('colorIndex', 7);
      expect(component.cardColor).toBe('#22c55e'); // 7 % 5 = 2
    });

    it('should return default color if colors array is empty', () => {
      mockConfigService.cardColors.set([]);
      expect(component.cardColor).toBe('#0066cc');
    });
  });

  describe('selection', () => {
    it('should emit select event on click', () => {
      const spy = vi.fn();
      component.selectService.subscribe(spy);
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.group');
      card.click();

      expect(spy).toHaveBeenCalledWith(mockService);
    });

    it('should have ring classes when selected', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.group');
      expect(card.classList.contains('ring-2')).toBe(true);
      expect(card.classList.contains('ring-primary-500')).toBe(true);
    });

    it('should not have ring classes when not selected', () => {
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.group');
      expect(card.classList.contains('ring-2')).toBe(false);
    });
  });

  describe('icon', () => {
    it('should render icon element', () => {
      fixture.detectChanges();

      const iconElement = fixture.nativeElement.querySelector('ng-icon');
      expect(iconElement).toBeTruthy();
    });

    it('should accept custom icon', () => {
      fixture.componentRef.setInput('icon', 'bootstrapFolder');
      expect(component.icon).toBe('bootstrapFolder');
    });
  });

  describe('service without code', () => {
    it('should not display code span when code is empty', () => {
      const serviceWithoutCode = { ...mockService, code: '' };
      fixture.componentRef.setInput('service', serviceWithoutCode);
      fixture.detectChanges();

      const codeElement = fixture.nativeElement.querySelector('.text-xs.font-semibold.uppercase');
      expect(codeElement).toBeFalsy();
    });
  });

  describe('service without metadata', () => {
    it('should not display metadata when service.metadata is empty', () => {
      const serviceWithoutMetadata = { ...mockService, metadata: '' };
      fixture.componentRef.setInput('service', serviceWithoutMetadata);
      fixture.componentRef.setInput('showMetadata', true);
      fixture.detectChanges();

      const metadataElement = fixture.nativeElement.querySelector('p.text-sm');
      expect(metadataElement).toBeFalsy();
    });
  });

  describe('styling', () => {
    it('should have cursor-pointer class', () => {
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.cursor-pointer');
      expect(card).toBeTruthy();
    });

    it('should have hover transition classes', () => {
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.transition-all');
      expect(card).toBeTruthy();
    });

    it('should have rounded-xl class', () => {
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.rounded-xl');
      expect(card).toBeTruthy();
    });
  });
});
