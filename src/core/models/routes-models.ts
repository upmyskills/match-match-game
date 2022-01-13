import { WorkField } from '../../components';
import { BaseWorkArea } from '../../shared';

export interface IRoutes {
  path: string;
  page: () => void | Promise<BaseWorkArea> | WorkField;
}
