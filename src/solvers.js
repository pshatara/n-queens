/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];

  for (var i = 0; i < n; i++) {
    solution.push([]);
    for (var j = 0; j < n; j++) {
      if (i === j) {
        solution[i].push(1);
      } else {
        solution[i].push(0);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var position = 0;
  var testArr = [];

  for (var i = 0; i < n; i++) {
    testArr.push([]);
    for (var j = 0; j < n; j++) {
      testArr[i].push(0)
    }
  }

  var recurse = function() {
    for (var i = 0; i < n; i++) {

      // If not on the last row
      if (position !== n-1) {
        if (testArr[position][i - 1] === 1) {
          for (var j = position; j < n; j++) {
            if (testArr[j][i-1] === 1) {
              testArr[j][i-1] -= 1;
            } else {
              testArr[j][i-1] -=2;
            }
          }
        }
        // If the current node is open
        if (testArr[position][i] === 0) {
          testArr[position][i] = 1;
          position++;
          for (var j = position; j < n; j++) {
            testArr[j][i] += 2;
          }
          recurse();
        }

      } else if (testArr[position][i] === 0) {
        solutionCount++;
      }

    }

    if (position !== 0) {
      if (testArr[position][n-1] === 1) {
        for (var i = position; i < n; i++) {
          if (testArr[i][n-1] === 1) {
            testArr[i][n-1] -= 1;
          } else {
            testArr[i][n-1] -= 2;
          }
        }
      }
      position--;
    }
  };

  recurse();


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var position = 0;
  var testArr = [];

  for (var i = 0; i < n; i++) {
    testArr.push([]);
    for (var j = 0; j < n; j++) {
      testArr[i].push(0)
    }
  }

  var recurse = function() {
    for (var i = 0; i < n; i++) {

      // If not on the last row
      if (position !== n-1) {
        if (testArr[position][i - 1] === 1) {
          for (var j = position, diag = 0; j < n; j++) {
            if (testArr[j][i-1] === 1) {
              testArr[j][i-1] -= 1;
            } else {
              testArr[j][i-1] -=2;
              if (i-1-diag >= 0) {
                testArr[j][i-1-diag] -= 2;
              }
              if (i < n) {
                testArr[j][i-1+diag] -= 2;
              }
            }
            diag++;
          }
        }
        // If the current node is open
        if (testArr[position][i] === 0) {
          testArr[position][i] = 1;
          position++;
          for (var j = position, diag = 1; j < n; j++) {
            testArr[j][i] += 2;
            if (i-diag >= 0) {
              testArr[j][i-diag] += 2;
            }
            if (i+diag < n) {
              testArr[j][i+diag] += 2;
            }
            diag++;
          }
          recurse();
        }

      } else if (testArr[position][i] === 0) {
        solutionCount++;
      }

    }

    if (position !== 0) {
      if (testArr[position][n-1] === 1) {
        for (var i = position, diag = 0; i < n; i++) {
          if (testArr[i][n-1] === 1) {
            testArr[i][n-1] -= 1;
          } else {
            testArr[i][n-1] -= 2;
            if (n-1-diag >= 0) {
              testArr[i][n-1-diag] -= 2;
            }
          }
          diag++;
        }
      }
      position--;
    }
  };

  // Accounting for trivial solutions & running recursive function
  if (n === 0 || n === 1) {
    return 1;
  } else {
    recurse();
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
