import React from 'react';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { hstackStyle } from './styles';

type IHStackProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof hstackStyle>;

const HStack = React.forwardRef<React.ComponentRef<'div'>, IHStackProps>(
  ({ className, space, reversed, ...props } = {}, ref) => (
    <div
      className={hstackStyle({ space, reversed, class: className })}
      {...props}
      ref={ref}
    />
  )
);

HStack.displayName = 'HStack';

export { HStack };
