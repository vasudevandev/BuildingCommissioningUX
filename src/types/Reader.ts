// Ensure AssetComponent is imported or defined
import { AssetComponent } from './AssetComponent';

export interface Reader extends AssetComponent {
    entryZone: string;
    exitZone: string;
    controller: string;
}