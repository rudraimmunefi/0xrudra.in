> Create a tuple array of multiple data types using statment like `dimesions: (u32 , u32)` or refer to /enumLearn/main.rs line 31

> Whenever passing an argument to a function if you don't want to take the ownership use reference (&someVar) instead.

> You can add methods to your custom datatypes such as struct using impl keywords it's similar to OOP in python and you can refer example of such methods in `enumlearn/main.rs` line 13.

```
impl areastruct {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
```

> Methods gets passed &self keyword whereas associate function are defined without self keyword.

```
impl associateimpl {
    fn squre(size : u32) {
        Rectangle {
            width: size,
            height: size
        }
    }
}
```

> Enums are namespace under `::` for example `let ipv4 = ipAddrKind::V4;`

> `Option` enum is a very powerful enum provided by rust which allows us to define `none` values since its not there by default. 

```
enum Option<T> {
    Some(T), // This defines that there can be some value of generic type T
    None, // It defines a null value
}
```

> `_` is a special type of operator in `match` operation which means match any other pattern which hasn't been matched yet.

> Packages are our project and they store crates. They are generally of two types binary and library. We can create a new library crate by using `cargo new --lib something`

> A library crate contains modules defined by `mod` and functions `fn`. A library crate can have multiple modules and a module can have a modufle within itself.

> A public function can call a function within a module by either relative path or absolute path. Absolute path starts with `crate` so example would be `crate::front_of_house::hosting::some_function()` and relative would be `front_of_house::hosting::some_function()`.

> Privacy rules within crates: A parent module does not have access to private function but private functions have access to parent module.

> Super keyword defines parent so if a child calls `super::someFunction()` it basically means it's calling parent for `someFunction`.

> We can use the `use` keyword to bring some functions within a module in scope for a function to use like for example: `use crate::front_of_house::hosting` and in the function we can now just call `hosting::someFunction()` [https://youtu.be/5RPXgDQrjio?si=Nh5JCcgmHpP7CdDx&t=860]

> We can move modules in different files by making a new file with the name of the module and using statments like `mod someModule;` which will look for files named under someModule and use the code from there.

> External code does not have access to functions within a library crate so we can mark them as public like `pub use crate::front_of_house::hosting` so now any third party code could use functions within hosting within their code.

> We can initialize a vector by either using the vector initializer like `let x : i32 = Vec::new()` or init with values by using `let x = vec![12,3,4]`

> Safer way to access a element in a vector is using `.get` method with `match` statement.

> In strings if we want to get the index value for a utf-8 set we could use `.bytes()` method to get the bytes representation, for scalar values we use `.chars()` method while for grapheme clusters we use another crate named `unicode-segmentation::UnicodeSegmentation`.

> We can insert values to hashmap by using `insert` method on hashmap object like `scores.insert(key, value)`.

> We can fetch the value from a key in a hashmap by using `.get()` method like `scores.get(&key)`

> We can iterate on a hashmap to dump all the keys and values by using a similar snippet:

```
for (key, value) in &hashmap_object {
    println!("{}{}",key,value);
}
```

>