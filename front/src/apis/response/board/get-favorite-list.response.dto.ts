import ResponseDto from "../response.dto";
import { FavoriteListItem } from "types/interface";

export default interface IncreaseViewCountResponseDto extends ResponseDto {
    favoriteList:FavoriteListItem[];
}