import type { App } from 'vue';
import { Input, InputConfig } from '@/components/FormItem/Input';
import { Select, SelectConfig } from '@/components/FormItem/Select';
import { SearchForm, SearchFormConfig } from '@/components/SearchForm';
import { NewtonTable, NewtonTableConfig} from '@/components/Scene/NewtonTable';
import { Modal, ModalConfig } from '@/components/Functional/Modal';

interface BlockType {
  type: string;
  material: any;
  config: any;
}

const basicBlocks = [
  {
    type: 'Input',
    material: Input,
    config: InputConfig,
  },
  {
    type: 'Select',
    material: Select,
    config: SelectConfig,
  },
  {
    type: 'SearchForm',
    material: SearchForm,
    config: SearchFormConfig,
  },
  {
    type: 'Modal',
    material: Modal,
    config: ModalConfig,
  },
  {
    type: 'NewtonTable',
    material: NewtonTable,
    config: NewtonTableConfig,
  },
];
export class BlockSuite {
  private blocks = basicBlocks;
  getBlocksMap() {
    return Object.fromEntries(this.blocks.map(block => [block.type, block]));
  }
  addBlock(block: BlockType) {
    this.blocks.push(block);
  }
  deleteBlock(type: string) {
    this.blocks = this.blocks.filter(block => block.type !== type);
  }
  hasBlock(type: string) {
    return this.blocks.some(block => block.type === type);
  }
}

const blocksMap = new BlockSuite().getBlocksMap();
const blocksMapSymbol = Symbol('blocksMap');
export default function(app: App) {
  const ins = {
    install(app: App) {
      app.config.globalProperties.$blocksMap = blocksMap;
      app.provide('blocksMap', blocksMap);
    }
  };
  app.use(ins);
}

