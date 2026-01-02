package com.ex.back.service;

import org.springframework.http.ResponseEntity;
import com.ex.back.dto.response.search.GetPopularListResponseDto;
import com.ex.back.dto.response.search.GetRelationListResponseDto;
public interface SearchService {

    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
    ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord);

}
