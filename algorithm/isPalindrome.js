/**
 * 
 * @param {ListNode} head
 * @return {boolean}
 * singly-linked list
 * function ListNode(val, next) {
 *  this.val = (val === undefined ? 0 : val)
 *  this.next = (next === undefined ? null : next)
 * } 
 */

var isPalindrome = function(head) {
  let a = '', b = ''
  while(head != null) {
    a = a + head.val
    b = head.val + b
    head = head.next
  }

  return a === b
}

/**
 * 心得：回文链表，通过这种方式确实可以比较完美得解决
 */