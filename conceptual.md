### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
- --first is through callbacks ,promises, async wait , event listeners 

- What is a Promise?
- --a promise is a type of async code that is an alt to callbacks . promoises represent the eventual completion of a opration, use then and catch to handle successes and failures

- What are the differences between an async function and a regular function?
- -difference is regular functions arent waiting on something to occur while aynch functions are triggered .

- What is the difference between Node.js and Express.js?
--Node is just a Javascript environment with libraries to make it easy to write software,where Express extends Node specifically to make webservers easy to write.
- What is the error-first callback pattern?
- eror first callback is used in node js to handle errors in asynch functions, first arg is error if error occurs then it stops but otherwise goes past. 

- What is middleware?
- --middleware is a software design pattern , in node js can use request, response and next to impelement middleware 

- What does the `next` function do?
- passes on to the next function , so the following function can complete 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)\
- well so the first issue I see is that you need to wait for one to complete before it goes on to the next so it would take more time than doing it in parallel, users are also set and defined would be better if user can input, . Not really sure on the purpose of the diferent variables maybe something more descriptive. 

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
