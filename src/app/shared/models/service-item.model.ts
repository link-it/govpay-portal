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

/**
 * Modello per la visualizzazione dei servizi nella griglia
 */

import { TipoPendenza } from '@core/pay';

/**
 * Servizio mappato per la visualizzazione
 */
export interface ServiceItem {
  id: string;
  code: string;
  name: string;
  title: string;
  group: string;
  subgroup: string;
  groupRank: number;
  category: string;
  metadata: string;
  searchTerms: string;
  source: TipoPendenza;
}

/**
 * Gruppo di servizi
 */
export interface ServiceGroup {
  id: string;
  name: string;
  image: string;
  rank: number;
  items: ServiceItem[];
}

/**
 * Servizi raggruppati per lingua
 */
export interface ServicesByLanguage {
  totalCount: number;
  groupCount: number;
  flat: ServiceItem[];
  groups: ServiceGroup[];
  dictionary: Record<string, ServiceItem[]>;
}

/**
 * Tipo di visualizzazione dei servizi
 */
export type ServiceViewMode = 'grid' | 'list' | 'grouped';

/**
 * Helper per mappare TipoPendenza a ServiceItem
 */
export function mapTipoPendenzaToServiceItem(
  tipoPendenza: TipoPendenza,
  langCode: string = 'ita'
): ServiceItem | null {
  if (!tipoPendenza.detail || !tipoPendenza.jsfDef) {
    return null;
  }

  const detail = tipoPendenza.detail[langCode] || tipoPendenza.detail['ita'];
  if (!detail) {
    return null;
  }

  return {
    id: tipoPendenza.idTipoPendenza,
    code: detail.code || '',
    name: detail.name || tipoPendenza.descrizione || '',
    title: detail.code ? `${detail.code} - ${detail.name}` : detail.name,
    group: tipoPendenza.detail.taxonomy1 || 'default',
    subgroup: tipoPendenza.detail.taxonomy2 || 'default',
    groupRank: detail.group_rank || Number.MAX_VALUE,
    category: detail.category || '',
    metadata: detail.short_description || detail.metadata || '',
    searchTerms: detail.search_terms || '',
    source: tipoPendenza
  };
}

/**
 * Filtra i servizi per testo di ricerca
 */
export function filterServices(
  services: ServiceItem[],
  searchText: string,
  filterFields: string[] = ['title', 'metadata', 'searchTerms']
): ServiceItem[] {
  if (!searchText || !searchText.trim()) {
    return services;
  }

  const normalizedSearch = searchText.toLowerCase().trim();

  return services.filter(service => {
    return filterFields.some(field => {
      const value = (service as any)[field];
      return value && value.toLowerCase().includes(normalizedSearch);
    });
  });
}

/**
 * Ordina i servizi
 */
export function sortServices(
  services: ServiceItem[],
  properties: string[] = ['name'],
  ascending: boolean = true
): ServiceItem[] {
  return [...services].sort((a, b) => {
    for (const prop of properties) {
      const aVal = (a as any)[prop];
      const bVal = (b as any)[prop];

      if (aVal < bVal) return ascending ? -1 : 1;
      if (aVal > bVal) return ascending ? 1 : -1;
    }
    return 0;
  });
}
