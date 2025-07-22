import { JSXElement, Text, TooltipElement } from '@gazmiapp/snaps-sdk/jsx';
import { getJsxChildren } from '@gazmiapp/snaps-utils';
import { mapToTemplate } from '../utils';
import { UIComponentFactory } from './types';

export const tooltip: UIComponentFactory<TooltipElement> = ({
  element,
  ...params
}) => ({
  element: 'SnapUITooltip',
  children: getJsxChildren(element).map((children) =>
    mapToTemplate({ element: children as JSXElement, ...params }),
  ),
});
