export interface AuthResponse<T> {
  status: 'success' | 'error';
  msg: string;
  data: T | any;
}
