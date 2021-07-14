let arr = [
  { id: 6, name: "部门5", pid: 4 },
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

function arrayToTree(arr) {
  return arr.filter((item) => {
    item.children = arr.filter((item1) => {
      return item.id === item1.pid;
    });
    return item.pid === 0;
  });
}

console.log(JSON.stringify(arrayToTree(arr)));
