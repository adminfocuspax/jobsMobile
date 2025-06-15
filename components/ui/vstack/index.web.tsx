import React from 'react';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';

import { vstackStyle } from './styles';

type IVStackProps = React.ComponentProps<'div'> &
  VariantProps<typeof vstackStyle>;

const VStack = React.forwardRef<React.ComponentRef<'div'>, IVStackProps>(
  ({ className, space, reversed, ...props }, ref) => (
    <div
      className={vstackStyle({ space, reversed, class: className })}
      {...props}
      ref={ref}
    />
  )
);

VStack.displayName = 'VStack';

export { VStack };
