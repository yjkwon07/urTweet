declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare type SubPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
