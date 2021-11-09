declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';

declare type SubPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

declare type ViewMode = 'infinite' | 'page';
