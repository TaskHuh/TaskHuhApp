// selectableOption.ts
import type { CommandDefinition, CommandArgument } from "./commands/Commands";

// Base type for selectable options
type OptionType = 'command' | 'argument' | 'option';

// Generic type for selectable options
export type SelectableOption<T extends OptionType, V> = {
  type: T;
  value: V;
};

// Specific types for each option
export type CommandOption = SelectableOption<'command', CommandDefinition>;
export type ArgumentOption = SelectableOption<'argument', CommandArgument>;
export type StringOption = SelectableOption<'option', string>;

// Union of all possible selectable options
export type AnySelectableOption = 
  | CommandOption
  | ArgumentOption
  | StringOption;

// this gives context to selectable options,
// allowing an argument to know what command it belongs to
export interface CommandContextOption {
    command: CommandOption;
    arguments: ArgumentOption[];
}

// Helper functions to create options, these are used for mapping commands and arguments to selectable options
export const createCommandOption = (value: CommandDefinition): CommandOption => 
  ({ type: 'command', value });

export const createArgumentOption = (value: CommandArgument): ArgumentOption => 
  ({ type: 'argument', value });

export const createStringOption = (value: string): StringOption => 
  ({ type: 'option', value });

// Type guard helpers
export const isCommandOption = (option: AnySelectableOption): option is CommandOption => 
  option.type === 'command';

export const isArgumentOption = (option: AnySelectableOption): option is ArgumentOption => 
  option.type === 'argument';

export const isStringOption = (option: AnySelectableOption): option is StringOption => 
  option.type === 'option';