import { getComponentRef } from '@/utils/useComponentRefs';

interface Node<T> {
  id: string,
  type: string,
  next?: {
    success: string,
    error: string
  },
  data?: T
}

interface Actions<T> {
  nodes: Node<T>[],
  edges: [],
}
/**
 *
 */
export function handleActionFlow(actions: Actions<any>, params: any) {
  const { nodes = [], edges = [] } = actions;
  const list = flowToLinkNode(nodes, edges);
  const { id } = list.find((node:Node<any>) => node.type === 'start');
  executeAction(list, id, params);
}

function flowToLinkNode(nodes: Node<any>[], edges: any)  {
  const copyNodes = JSON.parse(JSON.stringify(nodes));
  const startNode = copyNodes.find((node:Node<any>) => node.type === 'start');
  const { id } = startNode;
  let currentEdge = edges.find((edge:any) => edge.source === id);
  const { target } = currentEdge;

  copyNodes.forEach((node:any) => {
    if (node.id === id) {
      node.next = {
        success: target,
      }
    }
  });

  // 当前边的起始 为 上一个边目标
  currentEdge = edges.filter((edge:any) => edge.source === target);

  while(currentEdge.length > 0) {
    if (Array.isArray(currentEdge) && currentEdge.length > 1) {
      const { source, target } = currentEdge[0];
      const next = { success: '', error: ''};
      currentEdge.forEach(edge => {
        const { target, sourceHandle, source } = edge;
        if (sourceHandle === 'source-success') {
          next.success = target;
        } else {
          next.error = target;
        }
      });

      copyNodes.forEach((node:any) => {
        if (node.id === source) {
          node.next = next
        }
      });

      currentEdge = edges.filter((edge:any) => edge.source === target);
    } else {

      const { source, target } = currentEdge[0];

      const next = {
        success: target,
      }

      copyNodes.forEach((node:any) => {
        if (node.id === source) {
          node.next = next
        }
      });

      currentEdge = edges.filter((edge:any) => edge.source === target);
    }
  }
  return copyNodes;
}

function executeAction(list:Node<any>[], id:string, params:any) {
  const node= list.find((node:Node<any>) => node.id === id) || {};
  const { type, data, next } = node as any;
  console.log(type, next);
  if (type === 'start') {
    executeAction(list, next.success, params);
  } else if (type === 'open-modal') {
    const { target } = data;
    getComponentRef(target)?.open();
    next && executeAction(list, next.success, params);
  }
}