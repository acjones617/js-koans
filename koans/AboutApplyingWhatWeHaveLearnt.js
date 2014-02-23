var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = _(products).filter(function (pizza) {
          return ((!pizza.containsNuts) && !(_(pizza.ingredients).any(function (ingredient) {
            return ingredient === 'mushrooms';
          })));
        };

      /* solve using filter() & all() / any() */


      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _(_.range(1,1000)).reduce(function (memo, num) {
      if ((num % 3 === 0) || (num % 5 === 0)){
        return memo + num;
      } else {
        return memo;
      }
    }, 0)
    

    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {

    _(products).chain().map(function (pizza) {
      return pizza['ingredients']
    })
      .flatten()
      .reduce(function (ingredientCount, ingredient) {
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1
        return ingredientCount
      }, {})
      .value();

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });


  it("should find the largest prime factor of a composite number", function () {

    // Create list of factors in decreasing order of size
    var factors = function (num){
      var factorList = [num];
      for (var i = Math.round(num/2) + 1; i >= 1; i--){
        if (num % i === 0){
          factorList.push(i);
        }
      }
      return factorList;
    }

    // Test whether or not a given number is prime
    var isPrime = function (num){
      for (var i = 2; i <= Math.sqrt(num); i++){
        if (num % i === 0){
          return false;
        }
      }
      return true;
    }

    var largestPrime = function (num){
      var factorList = factors(num);
      for (var i = 0; i < factorList.length; i++){
        if (isPrime(factorList[i])){
          return factorList[i];
        }
      }
      return 'No prime factors'
    }
  
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var isPalindrome = function (num){
      var numString = num.toString();
      for (var i = 0; i < numString.length/2; i++){
        if (numString[i] !== numString[numString.length - i - 1]){
          return false;
        }
      }
      return true; 
    }

    var largestPalindrome = function (numDigits){
      var largestPal = 0;
      var smallNumString = '1';
      while (smallNumString.length < numDigits){
        smallNumString += '0';
      }
      var smallNum = parseInt(smallNumString);
      var largeNum = smallNum * 10
      for (var i = smallNum; i < largeNum; i++){
        for (var j = smallNum; j < largeNum; j++){
          var product = i * j;
          if (product > largestPal && isPalindrome(product)){
            largestPal = product;
          }
        }
      }
      if (largestPal > 0) {
        return largestPal;
      } else {
        return 'No Palindrome Products';
      }
    }

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var isNotDivisible = function (num, divisor){
      return (num % divisor !== 0);
    }

    var lcm = function (smallNum, largeNum){
      var attempt = 1;
      var isLCM = true;
      while (true){
        isLCM = true;
        for (var i = largeNum; i >= smallNum; i--){
          if (isNotDivisible(attempt, i)){
            attempt++;
            isLCM = false;
            break;
          }
        }
        if (isLCM){
          return attempt;
        }
      }
    }
    // Takes too long
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var forEach = function (list, action){
      for (var i = 0; i < nums.length; i++){
        action(list[i]);
      }
    }

    var sumSquares = function (nums){
      var total = 0;
      nums.forEach(function (num){
        total += Math.pow(num,2);
      });
      return total;
    }
    
    var squareOfSums = function (nums){
      var total = 0;
      nums.forEach(function (num){
        total += num;
      });
      return total;
    }

    var differenceSquares = function (nums){
      return squareOfSums(nums) - sumSquares(nums);
    }

  });

  it("should find the 10001st prime", function () {

    var isPrime = function (num){
      for (var i = 2; i <= Math.sqrt(num); i++){
        if (num % i === 0){
          return false;
        }
      }
      return true;
    }

    var primeNum = function (num){
      var primes = [];
      var i = 2;
      while (primes.length < num){
        if (isPrime(i)){
          primes.push(i);
        }
        i++;
      }
      return primes[primes.length-1];
    }

  });
  */
});
