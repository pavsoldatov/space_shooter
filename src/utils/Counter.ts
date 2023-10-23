export class Counter {
    private count: number;
    constructor(initialValue: number = 0) {
      this.count = initialValue;
    }
  
    increment() {
      this.count++;
    }
  
    decrement() {
      this.count--;
    }
  
    getCount() {
      return this.count;
    }
  
    setCount(value: number) {
      this.count = value;
    }
  }