let arr = [
  { id: 6, name: "部门5", pid: 4 },
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

function arrayToTree(arr) {
  let result = [];
  let map = {};
  arr.forEach((item) => {
    map[item.id] = {
      ...item,
      children: [],
    };
  });

  arr.forEach((item) => {
    let id = item.id;
    let pid = item.pid;
    const mapItem = map[id];
    if (pid === 0) {
      result.push(mapItem);
    } else {
      if (!map[pid]) {
        map[pid] = { children: [] };
      }
      map[pid].children.push(mapItem);
    }
  });
  return result;
}

console.log(JSON.stringify(arrayToTree(arr)));
