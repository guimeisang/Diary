function divide_conquer(problem, param1, param2) {
  // recursion terminator
  if(!problem) {
    return 
  }

  // prepare data 
  var data = prepare_data(problem)
  subproblems = split_problem(problem, data)

  // conquer subproblems
  subresult1 = this.divide_conquer(subproblems[0], p1)
  subresult2 = this.divide_conquer(subproblems[1], p1)
  subresult3 = this.divide_conquer(subproblems[2], p1)

  // process and generate the final result
  result = process_result(subresult1, subresult2, subresult3)

  // revert the current level states
}