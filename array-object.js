class MyArray {
    constructor() {
      this.length = 0;
      this.data = {}; // Xem như là một object
    }
    get(index) {
      return this.data[index];
    }
    push(item) { // Thêm vào sau cùng
      this.data[this.length] = item;
      this.length++;
      return this.data;
    }
    pop() { // Xoá sau cùng
      const lastItem = this.data[this.length - 1];
      delete this.data[this.length - 1];
      this.length--;
      return lastItem;
    }
    deleteAtIndex(index) {
      const item = this.data[index];
      this.shiftItems(index);
      return item;
    }
    shiftItems(index) { // Dời index lùi 1 đơn vị, tại vị trí cho trước
      for (let i = index; i < this.length - 1; i++) {
        this.data[i] = this.data[i + 1];
      }
      delete this.data[this.length - 1]; // Phải xoá phần tử cuối
      this.length--;
    }
    changeValueAtIndex(index) {
      // @Todo
    }
  }
  
  const myArray = new MyArray();
  myArray.push('hi');
  myArray.push('you');
  myArray.push('!');
  myArray.pop();
  myArray.deleteAtIndex(0);
  myArray.push('are');
  myArray.push('nice');
  myArray.shiftItems(0);
  console.log(myArray);
  
  