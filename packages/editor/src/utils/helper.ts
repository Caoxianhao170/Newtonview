/**
 * 生成组件ID
 * @param name 组件类型名称
 * @returns 新名称
 */
export const createId = (name: string, len: number = 10) => {
  return (
    name +
    '_' +
    Number(Math.random().toString().substring(2, 12) + Date.now())
      .toString(36)
      .slice(0, len)
  );
};


export function traverseTree(list:any, id:string):any[] {
  const newList:any[] = [];
  list.forEach((element:any) => {
    if (element.id !== id) {
      if (element.elements && element.elements.length > 0) {
        element.elements = traverseTree(element.elements, id);
      }
      newList.push(element);
    }
  });
  return newList;
}