export interface OptionsRequest {
  page?:          number; //0
  size?:          number; //5 cantidad de registros por pagina
  sortBy?:        string; //fechaCreacion
  tipo?:          string; //fechaCreacion
  direction?:     'DESC' | 'ASC'; //DESC
}

export interface DataPaginationResponse {
  page:             number;
  size:             number;
  totalElements:    number;
  totalPages:       number;
  first:            boolean;
  last:             boolean;
  hasNext:          boolean;
  hasPrevious:      boolean;
  numberOfElements: number;
  empty:            boolean;
}

export interface SelectedOption {
  value:          string;
  label:          string;
}
