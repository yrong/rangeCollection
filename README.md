# range-collections
> Implement a 'Range Collection' class.  
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.  
// A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)


## Install

```bash
npm install --save range-collections
```

## Test

```bash
npm test
```

## Usage

```javascript
const RangeCollection= require('range-collections');
let rc = new RangeCollection();

rc.add([1, 3]);
rc.print();
//=> [1, 3) 

rc.add([2, 7]);
rc.print();
//=> [1, 7)

rc.remove([3,5])
rc.print();
//=> [1, 3) [5, 7)
```


## License

[MIT](https://github.com/yrong/rangeCollection/blob/master/LICENSE) &copy;
