import {NgModule} from '@angular/core';
import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
    declarations: [
        FilterPipe
    ],
    exports: [
        FilterPipe
    ]
})
export class FilterModule {}