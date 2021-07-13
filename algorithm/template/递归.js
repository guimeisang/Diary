function recur(level, param) {
  // terminator
  if(level > MAX_LEVEL) {
    // process result
    return;
  }

  // process current logic
  process(level, param)

  // drill down
  recur(level +=1, newParam)

  // restore current status
}