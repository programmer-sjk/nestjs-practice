
export function CacheDecorator({ key: string, ttl: number }) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const methodRef = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const now = Date.now();
      const result = await methodRef.call(this, ...args);

      return result;
    };
  };
}
