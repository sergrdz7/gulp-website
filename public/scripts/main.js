//ES2015 class
class Person {
  constructor(name) {
    this.name = name;
  }
  hello() {
    if (typeof this.name === 'string') {
      return 'Hello I am, ' + this.name + '!';
    } else {
      return 'Hello';
    }
  }
}

var person = new Person('Sergio Rodriguez')
// var name = 'Sergio Rodriguez';

document.write(person.hello());
