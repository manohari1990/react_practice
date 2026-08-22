// Reverse a string without using slicing.
const string = "Manohari";
let rev = "";
let i = string.length-1;
while(i>=0){
    rev += string[i]
    i--
}
console.log("String: ", string)
console.log("Reverse a string: ", rev)

// Find duplicate elements in an array.
const array = [4,3,6,2,4,2,1,7,4,2,1]
const mapArr = new Map()
let i = 0
while(i<array.length){
    if(!mapArr.has(array[i])){
        
    }
    i++
}

// Implement an LRU Cache
class LRUCache{
    constructor(key, value){
        this.key = key
        this.value = value
    }

    get(key){

    }

    put(key,value){

    }
}


