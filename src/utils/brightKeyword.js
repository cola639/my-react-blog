export default function brightKeyword(keyword, item) {
  //keyword输入框输入的内容
  //判断这个字段中是否包含keyword
  //如果包含的话，就把这个字段中的那一部分进行替换成html字符
  if (item.indexOf(keyword) !== -1)
    return item.replace(keyword, `<font color='#ea6f5a'>${keyword}</font>`);
  return item;
}
