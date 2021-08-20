//取出父节点,为树状化准备
function insertNode(data, node) {
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === node.comment_parent) {
      //初始化
      if (!data[i].children) {
        // 提供容器数组,此处无return继续判断
        data[i].children = [];
      }
      data[i].children.push(node);
      //返回新data

      return data;
    }
    // 子节点容器存在,对data[i].child数据递归
    if (data[i].children) {
      data[i].children = insertNode(data[i].children, node);
    }
  }
  //for执行完再执行下面return data语句
  return data;
}

//树状化评论
export function translateTree(data) {
  //获得评论
  let parent = [];
  let children = [];

  //取出首条评论根节点
  data.map((item) => {
    if (item.comment_parent == 0) {
      return parent.push(item);
    } else {
      return children.push(item);
    }
  });

  //返回一个树状数组
  children.map((item) => {
    return (parent = insertNode(parent, item));
  });

  return parent;
}

//将二级后所有数组扁平化
function treeToList(tree) {
  let queen = [];
  let out = [];
  queen = queen.concat(tree);
  while (queen.length) {
    let first = queen.shift();
    if (first.children) {
      queen = queen.concat(first.children);
      delete first["children"];
    }

    out.push(first);
  }
  return out;
}

//树状化后的评论数据变为只有二级数组评论数据
export function secondTree(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i]["children"]) {
      data[i]["children"] = treeToList(data[i]["children"]);
    }
  }
  return data;
}

export function transformTree(data) {
  let list = [];
  list = secondTree(translateTree(data));
  return list;
}
