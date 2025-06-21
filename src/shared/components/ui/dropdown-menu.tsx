import * as React from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { combineClassNames } from '@utils';

/**
 * Componente DropdownMenu base (wrapper de Radix UI DropdownMenu)
 * 
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline">Opciones</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Editar</DropdownMenuItem>
 *     <DropdownMenuItem>Eliminar</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />;
}

/**
 * Portal para renderizar el dropdown fuera del flujo normal del DOM
 */
function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />;
}

/**
 * Trigger para abrir el dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuTrigger asChild>
 *   <Button>Abrir Menú</Button>
 * </DropdownMenuTrigger>
 * ```
 */
function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />;
}

/**
 * Contenido principal del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuContent className="w-56">
 *   <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>
 *     <User className="mr-2 h-4 w-4" />
 *     <span>Perfil</span>
 *   </DropdownMenuItem>
 *   <DropdownMenuItem>
 *     <Settings className="mr-2 h-4 w-4" />
 *     <span>Configuración</span>
 *   </DropdownMenuItem>
 * </DropdownMenuContent>
 * ```
 */
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        className={combineClassNames(
          `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
          data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height)
          min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden
          overflow-y-auto rounded-md border p-1 shadow-md`,
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * Grupo de elementos del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuGroup>
 *   <DropdownMenuItem>Opción 1</DropdownMenuItem>
 *   <DropdownMenuItem>Opción 2</DropdownMenuItem>
 * </DropdownMenuGroup>
 * ```
 */
function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />;
}

/**
 * Elemento individual del dropdown
 * 
 * @example
 * ```tsx
 * // Elemento básico
 * <DropdownMenuItem>Editar</DropdownMenuItem>
 * 
 * // Elemento con icono
 * <DropdownMenuItem>
 *   <Edit className="mr-2 h-4 w-4" />
 *   Editar
 * </DropdownMenuItem>
 * 
 * // Elemento destructivo
 * <DropdownMenuItem variant="destructive">
 *   <Trash className="mr-2 h-4 w-4" />
 *   Eliminar
 * </DropdownMenuItem>
 * 
 * // Elemento con atajo de teclado
 * <DropdownMenuItem>
 *   Copiar
 *   <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot='dropdown-menu-item'
      data-inset={inset}
      data-variant={variant}
      className={combineClassNames(
        `focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive
        data-[variant=destructive]:focus:bg-destructive/10
        dark:data-[variant=destructive]:focus:bg-destructive/20
        data-[variant=destructive]:focus:text-destructive
        data-[variant=destructive]:*:[svg]:!text-destructive
        [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2
        rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4`,
        className
      )}
      {...props}
    />
  );
}

/**
 * Elemento checkbox del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuCheckboxItem checked={showGrid}>
 *   Mostrar cuadrícula
 * </DropdownMenuCheckboxItem>
 * ```
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot='dropdown-menu-checkbox-item'
      className={combineClassNames(
        `focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2
        rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4`,
        className
      )}
      checked={checked}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/**
 * Grupo de radio buttons del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
 *   <DropdownMenuRadioItem value="light">Claro</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="dark">Oscuro</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="system">Sistema</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />;
}

/**
 * Elemento radio del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuRadioItem value="option1">
 *   Opción 1
 * </DropdownMenuRadioItem>
 * ```
 */
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot='dropdown-menu-radio-item'
      className={combineClassNames(
        `focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2
        rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4`,
        className
      )}
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/**
 * Etiqueta del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuLabel>Acciones</DropdownMenuLabel>
 * <DropdownMenuSeparator />
 * <DropdownMenuItem>Editar</DropdownMenuItem>
 * ```
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot='dropdown-menu-label'
      data-inset={inset}
      className={combineClassNames('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className)}
      {...props}
    />
  );
}

/**
 * Separador del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuItem>Editar</DropdownMenuItem>
 * <DropdownMenuSeparator />
 * <DropdownMenuItem variant="destructive">Eliminar</DropdownMenuItem>
 * ```
 */
function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot='dropdown-menu-separator'
      className={combineClassNames('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

/**
 * Atajo de teclado para elementos del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuItem>
 *   Copiar
 *   <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='dropdown-menu-shortcut'
      className={combineClassNames(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className
      )}
      {...props}
    />
  );
}

/**
 * Submenú del dropdown
 * 
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>
 *     Más opciones
 *     <ChevronRight className="ml-auto h-4 w-4" />
 *   </DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Opción 1</DropdownMenuItem>
 *     <DropdownMenuItem>Opción 2</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />;
}

/**
 * Trigger del submenú
 * 
 * @example
 * ```tsx
 * <DropdownMenuSubTrigger>
 *   Más opciones
 *   <ChevronRight className="ml-auto h-4 w-4" />
 * </DropdownMenuSubTrigger>
 * ```
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot='dropdown-menu-sub-trigger'
      data-inset={inset}
      className={combineClassNames(
        `focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent
        data-[state=open]:text-accent-foreground relative flex cursor-default items-center gap-2
        rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4`,
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto size-4' />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/**
 * Contenido del submenú
 * 
 * @example
 * ```tsx
 * <DropdownMenuSubContent>
 *   <DropdownMenuItem>Subopción 1</DropdownMenuItem>
 *   <DropdownMenuItem>Subopción 2</DropdownMenuItem>
 * </DropdownMenuSubContent>
 * ```
 */
function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot='dropdown-menu-sub-content'
      className={combineClassNames(
        `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
        data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
        data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin)
        overflow-hidden rounded-md border p-1 shadow-lg`,
        className
      )}
      {...props}
    />
  );
}

export {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
};

