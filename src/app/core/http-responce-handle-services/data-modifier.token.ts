import { InjectionToken } from '@angular/core';
import { DataModifier } from './data-modifier.interface';

export const DATA_MODIFIERS = new InjectionToken<DataModifier>('dataModifiers');
