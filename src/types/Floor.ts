// Ensure AssetComponent is imported or defined
import { AssetComponent } from './AssetComponent';
import { Camera } from './Camera';
import { Controller } from './Controller';
import { FireSprinkler } from './FireSprinkler';
import { Reader } from './Reader';
import { Zone } from './Zone';

export interface Floor extends AssetComponent {
    controllers : Controller[];
    zones : Zone[];
    cameras : Camera[];
    fireSprinklers : FireSprinkler[];
    readers: Reader[]
    zoomState: number;
}