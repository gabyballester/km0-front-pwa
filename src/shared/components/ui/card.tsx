import * as React from 'react';

import { combineClassNames } from '@utils';

/**
 * Componente Card para mostrar contenido en contenedores con estilo de tarjeta
 * 
 * @example
 * ```tsx
 * // Card básico
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Título de la tarjeta</CardTitle>
 *     <CardDescription>Descripción de la tarjeta</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Contenido de la tarjeta</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Acción</Button>
 *   </CardFooter>
 * </Card>
 * 
 * // Card con acción en el header
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Configuración</CardTitle>
 *     <CardDescription>Gestiona tu configuración</CardDescription>
 *     <CardAction>
 *       <Button variant="outline" size="sm">Editar</Button>
 *     </CardAction>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Contenido de configuración</p>
 *   </CardContent>
 * </Card>
 * 
 * // Card con contenido personalizado
 * <Card className="max-w-md">
 *   <CardHeader>
 *     <CardTitle>Estadísticas</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <div className="grid grid-cols-2 gap-4">
 *       <div>
 *         <p className="text-2xl font-bold">1,234</p>
 *         <p className="text-sm text-muted-foreground">Vistas</p>
 *       </div>
 *       <div>
 *         <p className="text-2xl font-bold">567</p>
 *         <p className="text-sm text-muted-foreground">Likes</p>
 *       </div>
 *     </div>
 *   </CardContent>
 * </Card>
 * ```
 */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={combineClassNames(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className
      )}
      {...props}
    />
  );
}

/**
 * Header de la tarjeta que contiene título, descripción y acciones
 * 
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Título</CardTitle>
 *   <CardDescription>Descripción</CardDescription>
 *   <CardAction>
 *     <Button>Acción</Button>
 *   </CardAction>
 * </CardHeader>
 * ```
 */
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={combineClassNames(
        `@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6
        has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6`,
        className
      )}
      {...props}
    />
  );
}

/**
 * Título de la tarjeta
 * 
 * @example
 * ```tsx
 * <CardTitle>Título de la tarjeta</CardTitle>
 * ```
 */
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={combineClassNames('leading-none font-semibold', className)}
      {...props}
    />
  );
}

/**
 * Descripción de la tarjeta
 * 
 * @example
 * ```tsx
 * <CardDescription>Descripción detallada de la tarjeta</CardDescription>
 * ```
 */
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={combineClassNames('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

/**
 * Acción en el header de la tarjeta (botones, enlaces, etc.)
 * 
 * @example
 * ```tsx
 * <CardAction>
 *   <Button variant="outline" size="sm">Editar</Button>
 * </CardAction>
 * ```
 */
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={combineClassNames(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
}

/**
 * Contenido principal de la tarjeta
 * 
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Contenido principal de la tarjeta</p>
 *   <div className="grid grid-cols-2 gap-4">
 *     <div>Elemento 1</div>
 *     <div>Elemento 2</div>
 *   </div>
 * </CardContent>
 * ```
 */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={combineClassNames('px-6', className)} {...props} />;
}

/**
 * Footer de la tarjeta para acciones secundarias
 * 
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button variant="outline">Cancelar</Button>
 *   <Button>Guardar</Button>
 * </CardFooter>
 * ```
 */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={combineClassNames('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

