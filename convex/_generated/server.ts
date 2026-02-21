import { mutationGeneric, queryGeneric, actionGeneric } from "convex/server";

// Re-export the generic functions as named exports for use in Convex functions
export const mutation = mutationGeneric;
export const query = queryGeneric;
export const action = actionGeneric;

// Export types for better TypeScript support
export type { 
  MutationBuilder, 
  QueryBuilder, 
  ActionBuilder,
  GenericMutationCtx,
  GenericQueryCtx,
  GenericActionCtx
} from "convex/server";