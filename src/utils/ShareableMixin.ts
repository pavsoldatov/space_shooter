const InstanceStore = new Map<string, any>();

export function ShareableMixin<T extends { new (...args: any[]): {} }>(
  BaseClass: T,
  className: string
) {
  return class extends BaseClass {
    constructor(...args: any[]) {
      super(...args);

      if (InstanceStore.has(className)) {
        console.error(
          `An instance of ${className} already exists. Call ${className}.getSharedInstance() to retrieve it.`
        );
        return;
      }
      InstanceStore.set(className, this);
    }

    static getSharedInstance(): any {
      return InstanceStore.get(className);
    }
  };
}
