package com.ex.back.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ex.back.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {
    
    private final FileService fileService;

    /**
     * 파일 업로드
     */
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        String url = fileService.upload(file);

        if (url == null) {
            return ResponseEntity.badRequest()
                    .body("{\"code\":\"FAIL\", \"message\":\"File upload failed.\"}");
        }

        return ResponseEntity.ok("{\"code\":\"OK\", \"url\":\"" + url + "\"}");
    }

    /**
     * 파일 다운로드 / 이미지 보기
     */
    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        Resource resource = fileService.getImage(fileName);
        if (resource == null || !resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        // 파일 확장자에 따라 Content-Type 설정
        String contentType = "application/octet-stream"; // 기본
        if (fileName.endsWith(".png")) contentType = "image/png";
        else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) contentType = "image/jpeg";
        else if (fileName.endsWith(".gif")) contentType = "image/gif";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}